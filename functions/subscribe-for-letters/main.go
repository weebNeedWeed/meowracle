package main

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var dynamodbClient *dynamodb.Client

func init() {
	cfg := utils.NewLambdaHandlerConfig()
	dynamodbClient = cfg.DynamodbClient
}

type Body struct {
	Email string `json:"email"`
}

func handler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	buf := bytes.NewBuffer([]byte(event.Body))

	b := new(Body)
	err := json.NewDecoder(buf).Decode(b)
	if err != nil {
		apiErr := definition.NewAPIError(definition.ErrBadRequest, "invalid body format", http.StatusBadRequest)
		return utils.WriteError(apiErr), nil
	}

	email := b.Email
	if email == "" {
		apiErr := definition.NewAPIError(definition.ErrBadRequest, "email is required", http.StatusBadRequest)
		return utils.WriteError(apiErr), nil
	}

	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	matched, err := regexp.MatchString(emailRegex, email)
	if err != nil || !matched {
		apiErr := definition.NewAPIError(definition.ErrBadRequest, "invalid email format", http.StatusBadRequest)
		return utils.WriteError(apiErr), nil
	}

	pk, _ := attributevalue.Marshal("SUBSCRIPTION")
	sk, _ := attributevalue.Marshal("EMAIL#" + email)

	_, err = dynamodbClient.PutItem(ctx, &dynamodb.PutItemInput{
		TableName: aws.String(utils.TableName),
		Item: map[string]types.AttributeValue{
			"pk": pk,
			"sk": sk,
		},
	})
	if err != nil {
		utils.LogError(err, "put item into database", definition.ErrDatabaseOperation, definition.AppError_Error_Severity)
		apiErr := definition.NewAPIError(definition.ErrInternalServer, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(apiErr), nil
	}

	return utils.WriteJson("", http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handler)
}
