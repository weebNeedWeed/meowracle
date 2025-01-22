package templates

import (
	"context"
	"errors"
	"fmt"
	"strings"

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

	keyExpr := expression.Key("gsi1pk").Equal(expression.Value("TEMP"))
	indexName := aws.String("gsi1")
	if categoryId != "" {
		indexName = nil
		keyExpr = expression.Key("pk").Equal(expression.Value("TEMPCAT#" + categoryId)).And(expression.Key("sk").BeginsWith("TEMP"))
	}
	exprBuilder = exprBuilder.WithKeyCondition(keyExpr)

	var filterExpr expression.ConditionBuilder
	if keyword != "" {
		filterExpr = expression.Contains(expression.Name("name"), keyword)
	}

	if slots != nil {
		expr := expression.Name("maxNumberOfSlots").Equal(expression.Value(*slots))
		if filterExpr.IsSet() {
			filterExpr = filterExpr.And(expr)
		} else {
			filterExpr = expr
		}
	}

	if filterExpr.IsSet() {
		exprBuilder = exprBuilder.WithFilter(filterExpr)
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

	keyExpr := expression.Key("gsi1pk").Equal(expression.Value("TEMP"))
	indexName := aws.String("gsi1")
	if categoryId != "" {
		indexName = nil
		keyExpr = expression.Key("pk").Equal(expression.Value("TEMPCAT#" + categoryId)).And(expression.Key("sk").BeginsWith("TEMP#"))
	}

	exprBuilder = exprBuilder.WithKeyCondition(keyExpr)
	var filterExpr expression.ConditionBuilder
	if keyword != "" {
		filterExpr = expression.Contains(expression.Name("name"), keyword)
	}

	if slots != nil {
		expr := expression.Name("maxNumberOfSlots").Equal(expression.Value(*slots))
		if filterExpr.IsSet() {
			filterExpr = filterExpr.And(expr)
		} else {
			filterExpr = expr
		}
	}

	if filterExpr.IsSet() {
		exprBuilder = exprBuilder.WithFilter(filterExpr)
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

type GetTemplatePathResult struct {
	Path  definition.DynamoDBTemplatePath
	Slots []definition.DynamoDBSlot
	Texts []definition.DynamoDBText
}

var NoTemplatePathError = errors.New("invalid template id or number of slots")

func (s *Store) getTemplatePath(tempId string, numberOfSlots int) (*GetTemplatePathResult, error) {
	builder := expression.NewBuilder()

	keyExpr := expression.Key("pk").Equal(expression.Value(fmt.Sprintf("TEMP#%v#PATH#%v", tempId, numberOfSlots)))
	builder = builder.WithKeyCondition(keyExpr)

	expr, err := builder.Build()

	res, err := s.client.Query(context.TODO(), &dynamodb.QueryInput{
		TableName:                 aws.String(utils.TableName),
		KeyConditionExpression:    expr.KeyCondition(),
		ExpressionAttributeValues: expr.Values(),
		ExpressionAttributeNames:  expr.Names(),
	})
	if err != nil {
		return nil, NoTemplatePathError
	}

	rawData := []map[string]any{}
	err = attributevalue.UnmarshalListOfMaps(res.Items, &rawData)
	if err != nil {
		utils.LogError(err, "unmarshalling list of maps", definition.ErrInternalServer, definition.AppError_Debug_Severity)
		return nil, err
	}

	if len(res.Items) == 0 {
		return nil, nil
	}

	result := new(GetTemplatePathResult)

	for index, d := range rawData {
		sk, _ := d["sk"].(string)
		if strings.Contains(sk, "PATH") {
			p := definition.DynamoDBTemplatePath{}
			attributevalue.UnmarshalMap(res.Items[index], &p)
			result.Path = p
		}

		if strings.Contains(sk, "SLOT") {
			s := definition.DynamoDBSlot{}
			attributevalue.UnmarshalMap(res.Items[index], &s)
			result.Slots = append(result.Slots, s)
		}

		if strings.Contains(sk, "TEXT") {
			t := definition.DynamoDBText{}
			attributevalue.UnmarshalMap(res.Items[index], &t)
			result.Texts = append(result.Texts, t)
		}
	}

	return result, nil
}
