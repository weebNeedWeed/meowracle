package badgeCategories

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

type Store struct {
	client *dynamodb.Client
}

func NewStore(c *dynamodb.Client) *Store {
	return &Store{c}
}

func (s *Store) GetAllBadgeCategories() ([]definition.DynamoDBBadgeCategory, error) {
	keyExpr := expression.Key("gsi1pk").Equal(expression.Value("BADGECAT"))
	expr, _ := expression.NewBuilder().WithKeyCondition(keyExpr).Build()

	res, err := s.client.Query(context.TODO(), &dynamodb.QueryInput{
		TableName:                 aws.String(utils.TableName),
		IndexName:                 aws.String("gsi1"),
		KeyConditionExpression:    expr.KeyCondition(),
		ExpressionAttributeValues: expr.Values(),
		ExpressionAttributeNames:  expr.Names(),
	})
	if err != nil {
		return nil, err
	}

	var result []definition.DynamoDBBadgeCategory
	err = attributevalue.UnmarshalListOfMaps(res.Items, &result)
	if err != nil {
		return nil, err
	}

	return result, nil
}
