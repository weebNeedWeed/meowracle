package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/expression"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var tableName string
var dynamodbClient *dynamodb.Client

func init() {
	tableName = os.Getenv("TABLE_NAME")
	cfg, _ := utils.GetAWSConfigForLambda()
	dynamodbClient = dynamodb.NewFromConfig(cfg)
}

type cursor struct {
	Pk     string `dynamodbav:"pk" json:"pk" validate:"required_with=Sk"`
	Sk     string `dynamodbav:"sk" json:"sk" validate:"required_with=Pk"`
	Gsi1pk string `dynamodbav:"gsi1pk" json:"gsi1pk" validate:"required_with=Gsi1pk"`
	Gsi1sk string `dynamodbav:"gsi1sk" json:"gsi1sk" validate:"required_with=Gsi1sk"`
}

func newCursorFromQueryString(query string) *cursor {
	if query == "" {
		return nil
	}

	c := cursor{}
	err := json.Unmarshal([]byte(query), &c)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	return &c
}

type params struct {
	Limit      int     `validate:"required,gte=1,lte=40"`
	Keyword    string  `validate:"omitempty,alphanum"`
	CategoryId string  `validate:"omitempty,ascii"`
	Cursor     *cursor `validate:"omitnil"`
}

func (p *params) validate() error {
	err := utils.Validate.Struct(p)
	return err
}

func handleRequest(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println("event:", event)

	limit, err := strconv.ParseInt(event.QueryStringParameters["limit"], 10, 64)
	if err != nil {
		apiErr := definition.NewAPIError(definition.ErrBadRequest, "invalid limitation", http.StatusBadRequest)
		return utils.WriteError(apiErr), nil
	}

	p := params{
		Limit:      int(limit),
		Keyword:    event.QueryStringParameters["keyword"],
		CategoryId: event.QueryStringParameters["categoryId"],
		Cursor:     newCursorFromQueryString(event.QueryStringParameters["cursor"]),
	}

	err = p.validate()
	if err != nil {
		returnErr := definition.NewAPIError(definition.ErrBadRequest, "invalid request parameters", http.StatusBadRequest)
		return utils.WriteError(returnErr), nil
	}

	var keyEx expression.KeyConditionBuilder
	var indexName *string

	// no category specified
	if p.CategoryId == "" {
		keyEx = expression.Key("gsi1pk").Equal(expression.Value("BADGE"))
		indexName = aws.String("gsi1")
	} else {
		keyEx = expression.Key("pk").Equal(expression.Value("BADGECAT#" + p.CategoryId))
	}

	exprBuilder := expression.NewBuilder().WithKeyCondition(keyEx)
	if p.Keyword != "" {
		filter := expression.Contains(expression.Name("name"), p.Keyword)
		exprBuilder = exprBuilder.WithFilter(filter)
	}

	var lastEvalKey map[string]types.AttributeValue
	if p.Cursor != nil {
		lastEvalKey, _ = attributevalue.MarshalMap(p.Cursor)
	}

	expr, _ := exprBuilder.Build()

	res, err := dynamodbClient.Query(ctx, &dynamodb.QueryInput{
		TableName:                 aws.String(tableName),
		IndexName:                 indexName,
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		KeyConditionExpression:    expr.KeyCondition(),
		FilterExpression:          expr.Filter(),
		ExclusiveStartKey:         lastEvalKey,
		Limit:                     aws.Int32(int32(p.Limit)),
	})
	if err != nil {
		appErr := utils.LogError(err, "Querying table", definition.ErrInternalServer, definition.AppError_Error_Severity)
		apiErr := definition.NewAPIError(appErr.Code, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(apiErr), nil
	}

	var ddbBadges []definition.DynamoDBBadge
	attributevalue.UnmarshalListOfMaps(res.Items, &ddbBadges)

	var nextCursor *cursor = nil
	if res.LastEvaluatedKey != nil {
		nextCursor = new(cursor)
		attributevalue.UnmarshalMap(res.LastEvaluatedKey, nextCursor)
	}

	badges := []definition.Badge{}
	for _, b := range ddbBadges {
		badges = append(badges, b.ToBadge())
	}

	j, _ := json.Marshal(map[string]any{
		"badges": badges,
		"cursor": nextCursor,
	})

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
