package main

import (
	"context"
	"encoding/json"
	"errors"
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

type params struct {
	limit      int    `validate:"required,gte=1,lte=40"`
	keyword    string `validate:"alphanumeric"`
	categoryId string `validate:"ascii"`
}

func (p *params) validate() error {
	err := utils.Validate.Struct(p)
	return err
}

func handleRequest(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println("event:", event)

	limit, err := strconv.ParseInt(event.QueryStringParameters["limit"], 10, 64)
	if err != nil {
		return utils.WriteError(errors.New("invalid limitation"), http.StatusBadRequest), nil
	}

	p := params{
		limit:      int(limit),
		keyword:    event.QueryStringParameters["keyword"],
		categoryId: event.QueryStringParameters["categoryId"],
	}
	err = p.validate()
	if err != nil {
		return utils.WriteError(fmt.Errorf("invalid request's params, %v", err), http.StatusBadRequest), nil
	}

	var keyEx expression.KeyConditionBuilder
	var indexName *string

	// no category specified
	if p.categoryId == "" {
		keyEx = expression.Key("gsi1pk").Equal(expression.Value("BADGE"))
		indexName = aws.String("gsi1")
	} else {
		keyEx = expression.Key("pk").Equal(expression.Value("BADGECAT#" + p.categoryId))
	}

	expr, err := expression.NewBuilder().WithKeyCondition(keyEx).Build()
	if err != nil {
		log.Println("error occurred when building expression", err)
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	if p.limit == 0 {
		p.limit = 20
	}

	res, err := dynamodbClient.Query(ctx, &dynamodb.QueryInput{
		TableName:                 aws.String(tableName),
		IndexName:                 indexName,
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		KeyConditionExpression:    expr.KeyCondition(),
		Limit:                     aws.Int32(int32(p.limit)),
	})
	if err != nil {
		log.Println("error occurred when querying table", err)
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	var ddbBadges []definition.DynamoDBBadge
	err = attributevalue.UnmarshalListOfMaps(res.Items, &ddbBadges)
	if err != nil {
		log.Println("error occurred when unmarshalling query results", err)
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	badges := []definition.Badge{}
	for _, b := range ddbBadges {
		badges = append(badges, b.ToBadge())
	}

	j, _ := json.Marshal(badges)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
