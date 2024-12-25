package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

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

func handleRequest(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println("ApiGateway event:", event)

	keyEx := expression.Key("pk").Equal(expression.Value("BADGE"))
	expr, err := expression.NewBuilder().WithKeyCondition(keyEx).Build()
	if err != nil {
		log.Println("error occurred when building expression", err)
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	res, err := dynamodbClient.Query(ctx, &dynamodb.QueryInput{
		TableName:                 aws.String(tableName),
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		KeyConditionExpression:    expr.KeyCondition(),
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
