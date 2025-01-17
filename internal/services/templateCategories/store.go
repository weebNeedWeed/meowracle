package templateCategories

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

func (s *Store) GetAllTemplateCategories() ([]definition.DynamoDBTemplateCategory, error) {
	keyExpr := expression.Key("gsi1pk").Equal(expression.Value("TEMPCAT"))
	expr, _ := expression.NewBuilder().WithKeyCondition(keyExpr).Build()

	res, err := s.client.Query(context.TODO(), &dynamodb.QueryInput{
		TableName:                 aws.String(utils.TableName),
		IndexName:                 aws.String("gsi1"),
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		KeyConditionExpression:    expr.KeyCondition(),
	})

	if err != nil {
		return nil, err
	}

	ddbTempCats := []definition.DynamoDBTemplateCategory{}
	err = attributevalue.UnmarshalListOfMaps(res.Items, &ddbTempCats)
	if err != nil {
		return nil, err
	}

	return ddbTempCats, nil
}
