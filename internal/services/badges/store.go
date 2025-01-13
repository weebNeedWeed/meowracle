package badges

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

type GetAllBadgesResult struct {
	Badges []definition.DynamoDBBadge
	Cursor definition.Cursor
}

type Store struct {
	client *dynamodb.Client
}

func NewStore(client *dynamodb.Client) *Store {
	return &Store{
		client: client,
	}
}

func (s *Store) CountNumberOfBadges(keyword string, categoryId string) (int, error) {
	exprBuilder := expression.NewBuilder()

	if keyword != "" {
		expr := expression.Contains(expression.Name("name"), keyword)
		exprBuilder = exprBuilder.WithFilter(expr)
	}

	var indexName *string
	var keyEx expression.KeyConditionBuilder
	if categoryId == "" {
		keyEx = expression.Key("gsi1pk").Equal(expression.Value("BADGE"))
		indexName = aws.String("gsi1")
	} else {
		keyEx = expression.Key("pk").Equal(expression.Value("BADGECAT#" + categoryId)).And(expression.Key("sk").BeginsWith("BADGE#"))
	}
	exprBuilder = exprBuilder.WithKeyCondition(keyEx)

	expr, _ := exprBuilder.Build()

	res, err := s.client.Query(context.TODO(), &dynamodb.QueryInput{
		TableName:                 aws.String(utils.TableName),
		IndexName:                 indexName,
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		KeyConditionExpression:    expr.KeyCondition(),
		FilterExpression:          expr.Filter(),
		Select:                    types.SelectCount,
	})
	if err != nil {
		return 0, err
	}

	return int(res.Count), nil
}

func (s *Store) GetAllBadges(limit int, keyword string, categoryId string, cursor definition.Cursor) (*GetAllBadgesResult, error) {
	var keyEx expression.KeyConditionBuilder
	var indexName *string

	// no category specified
	if categoryId == "" {
		keyEx = expression.Key("gsi1pk").Equal(expression.Value("BADGE"))
		indexName = aws.String("gsi1")
	} else {
		keyEx = expression.Key("pk").Equal(expression.Value("BADGECAT#" + categoryId)).And(expression.Key("sk").BeginsWith("BADGE#"))
	}

	exprBuilder := expression.NewBuilder().WithKeyCondition(keyEx)
	if keyword != "" {
		filter := expression.Contains(expression.Name("name"), keyword)
		exprBuilder = exprBuilder.WithFilter(filter)
	}

	var lastEvalKey map[string]types.AttributeValue
	if cursor != nil {
		lastEvalKey, _ = attributevalue.MarshalMap(cursor)
	}

	expr, _ := exprBuilder.Build()

	res, err := s.client.Query(context.TODO(), &dynamodb.QueryInput{
		TableName:                 aws.String(utils.TableName),
		IndexName:                 indexName,
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		KeyConditionExpression:    expr.KeyCondition(),
		FilterExpression:          expr.Filter(),
		ExclusiveStartKey:         lastEvalKey,
		Limit:                     aws.Int32(int32(limit)),
	})
	if err != nil {
		return nil, err
	}

	var ddbBadges []definition.DynamoDBBadge
	attributevalue.UnmarshalListOfMaps(res.Items, &ddbBadges)

	var nextCursor definition.Cursor = nil
	if res.LastEvaluatedKey != nil {
		nextCursor = make(definition.Cursor)
		attributevalue.UnmarshalMap(res.LastEvaluatedKey, &nextCursor)
	}

	return &GetAllBadgesResult{
		Badges: ddbBadges,
		Cursor: nextCursor,
	}, nil
}
