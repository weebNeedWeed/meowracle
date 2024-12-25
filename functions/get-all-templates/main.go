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
	// TODO: implement pagination

	fExpr := expression.Name("pk").BeginsWith("TEMPLATE").And(expression.Name("sk").BeginsWith("METADATA"))
	expr, err := expression.NewBuilder().WithFilter(fExpr).Build()
	if err != nil {
		log.Println("error occurred when building expression", err)
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	res, err := dynamodbClient.Scan(ctx, &dynamodb.ScanInput{
		TableName:                 aws.String(tableName),
		FilterExpression:          expr.Filter(),
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
	})
	if err != nil {
		log.Println("error occurred when scanning table", err)
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	ts := []definition.DynamoDBTemplate{}
	err = attributevalue.UnmarshalListOfMaps(res.Items, &ts)
	if err != nil {
		log.Println("error occurred when unmarshalling items", err)
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	templates := []definition.Template{}
	for _, t := range ts {
		templates = append(templates, t.ToTemplate())
	}

	j, _ := json.Marshal(templates)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
