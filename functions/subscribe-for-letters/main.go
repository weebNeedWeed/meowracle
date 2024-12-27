package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var tableName string
var dynamodbClient *dynamodb.Client

func init() {
	tableName = os.Getenv("TABLE_NAME")
	cfg, _ := utils.GetAWSConfigForLambda()
	dynamodbClient = dynamodb.NewFromConfig(cfg)
}

type Body struct {
	Email string `json:"email"`
}

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	buf := bytes.NewBuffer([]byte(event.Body))

	b := new(Body)
	err := json.NewDecoder(buf).Decode(&b)
	if err != nil {
		return utils.WriteError(fmt.Errorf("invalid body format"), 400), nil
	}

	email := b.Email
	if email == "" {
		return utils.WriteError(fmt.Errorf("email is required"), 400), nil
	}

	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	matched, err := regexp.MatchString(emailRegex, email)
	if err != nil || !matched {
		return utils.WriteError(fmt.Errorf("invalid email format"), 400), nil
	}

	pk, _ := attributevalue.Marshal("SUBSCRIPTION")
	sk, _ := attributevalue.Marshal("EMAIL#" + email)

	_, err = dynamodbClient.PutItem(ctx, &dynamodb.PutItemInput{
		TableName: aws.String(tableName),
		Item: map[string]types.AttributeValue{
			"pk": pk,
			"sk": sk,
		},
	})
	if err != nil {
		return utils.WriteError(err, http.StatusInternalServerError), nil
	}

	return utils.WriteJson("", http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handler)
}
