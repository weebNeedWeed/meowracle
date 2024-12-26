package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

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
	log.Println("event", event)
	tId, ok := event.PathParameters["templateId"]
	if !ok {
		return utils.WriteError(fmt.Errorf("templateId is required"), http.StatusBadRequest), nil
	}

	kExpr := expression.Key("pk").Equal(expression.Value("TEMPLATE#" + tId))
	expr, err := expression.NewBuilder().WithKeyCondition(kExpr).Build()
	if err != nil {
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	res, err := dynamodbClient.Query(ctx, &dynamodb.QueryInput{
		TableName:                 aws.String(tableName),
		KeyConditionExpression:    expr.KeyCondition(),
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
	})
	if err != nil {
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	items := []map[string]any{}
	err = attributevalue.UnmarshalListOfMaps(res.Items, &items)
	if err != nil {
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	log.Println("items", items)

	if len(items) == 0 {
		return utils.WriteError(fmt.Errorf("template with id %v does not exist", tId), http.StatusNotFound), nil
	}

	var t definition.DynamoDBTemplate
	var s []definition.DynamoDBSlot
	for _, item := range items {
		if strings.Contains(item["sk"].(string), "METADATA") {
			t = definition.DynamoDBTemplate{
				Pk:    item["pk"].(string),
				Sk:    item["sk"].(string),
				Title: item["title"].(string),
				Path:  item["path"].(string),
			}
		} else {
			s = append(s, definition.DynamoDBSlot{
				Pk:     item["pk"].(string),
				Sk:     item["sk"].(string),
				X:      item["x"].(float64),
				Y:      item["y"].(float64),
				Width:  item["width"].(float64),
				Height: item["height"].(float64),
			})
		}
	}

	template := t.ToTemplate()
	for _, dSlot := range s {
		slot := dSlot.ToSlot()
		template.Slots = append(template.Slots, slot)
	}

	j, _ := json.Marshal(template)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
