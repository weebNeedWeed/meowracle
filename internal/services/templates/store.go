package templates

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

type Store struct {
	client *dynamodb.Client
}

type GetAllTemplatesResult struct {
	Templates []definition.DynamoDBTemplate
	Cursor    definition.Cursor
}

func NewStore(c *dynamodb.Client) *Store {
	return &Store{c}
}

func (s *Store) CountAllTemplates(keyword, categoryId string, slots *int) (int, error) {
	exprBuilder := expression.NewBuilder()

	var filterExpr expression.ConditionBuilder
	if keyword != "" {
		filterExpr = expression.Contains(expression.Name("name"), keyword)
	}

	keyExpr := expression.Key("gsi1pk").Equal(expression.Value("TEMPCAT"))
	indexName := aws.String("gsi1")
	if categoryId != "" {
		indexName = nil
		keyExpr = expression.Key("pk").Equal(expression.Value("TEMPCAT#" + categoryId)).And(expression.Key("sk").BeginsWith("TEMP"))
	}
	exprBuilder = exprBuilder.WithKeyCondition(keyExpr)

	if slots != nil {
		expr := expression.Name("maxNumberOfSlots").Equal(expression.Value(*slots))
		filterExpr = filterExpr.And(expr)
	}

	finalExpr, _ := exprBuilder.Build()
	res, err := s.client.Query(context.TODO(), &dynamodb.QueryInput{
		TableName:                 aws.String(utils.TableName),
		IndexName:                 indexName,
		KeyConditionExpression:    finalExpr.KeyCondition(),
		ExpressionAttributeValues: finalExpr.Values(),
		ExpressionAttributeNames:  finalExpr.Names(),
		FilterExpression:          finalExpr.Filter(),
		Select:                    types.SelectCount,
	})
	if err != nil {
		return 0, err
	}

	return int(res.Count), nil
}

func (s *Store) GetAllTemplates(limit int, keyword, categoryId string, slots *int, cursor definition.Cursor) (*GetAllTemplatesResult, error) {
	exprBuilder := expression.NewBuilder()

	var filterExpr expression.ConditionBuilder
	if keyword != "" {
		filterExpr = expression.Contains(expression.Name("name"), keyword)
	}

	keyExpr := expression.Key("gsi1pk").Equal(expression.Value("TEMPCAT"))
	indexName := aws.String("gsi1")
	if categoryId != "" {
		indexName = nil
		keyExpr = expression.Key("pk").Equal(expression.Value("TEMPCAT#" + categoryId)).And(expression.Key("sk").BeginsWith("TEMP"))
	}
	exprBuilder = exprBuilder.WithKeyCondition(keyExpr)

	if slots != nil {
		expr := expression.Name("maxNumberOfSlots").Equal(expression.Value(*slots))
		filterExpr = filterExpr.And(expr)
	}

	var lastEvalKey map[string]types.AttributeValue
	if cursor != nil {
		var err error
		lastEvalKey, err = attributevalue.MarshalMap(cursor)
		if err != nil {
			return nil, err
		}
	}

	finalExpr, _ := exprBuilder.Build()
	res, err := s.client.Query(context.TODO(), &dynamodb.QueryInput{
		TableName:                 aws.String(utils.TableName),
		IndexName:                 indexName,
		KeyConditionExpression:    finalExpr.KeyCondition(),
		ExpressionAttributeValues: finalExpr.Values(),
		ExpressionAttributeNames:  finalExpr.Names(),
		FilterExpression:          finalExpr.Filter(),
		ExclusiveStartKey:         lastEvalKey,
		Limit:                     aws.Int32(int32(limit)),
	})
	if err != nil {
		return nil, err
	}

	templates := []definition.DynamoDBTemplate{}
	_ = attributevalue.UnmarshalListOfMaps(res.Items, &templates)

	var nextCursor definition.Cursor = nil
	if res.LastEvaluatedKey != nil {
		nextCursor = make(definition.Cursor)
		attributevalue.UnmarshalMap(res.LastEvaluatedKey, &nextCursor)
	}

	result := GetAllTemplatesResult{
		Templates: templates,
		Cursor:    nextCursor,
	}

	return &result, nil
}
