package utils

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/weebNeedWeed/meowracle/internal/definition"
)

type LambdaHandlerConfig struct {
	DynamodbClient *dynamodb.Client
}

func NewLambdaHandlerConfig() *LambdaHandlerConfig {
	cfg, _ := GetAWSConfigForLambda()
	dynamodbClient := dynamodb.NewFromConfig(cfg)

	return &LambdaHandlerConfig{dynamodbClient}
}

func LogError(err error, ctx string, code definition.ErrorCode, severity definition.AppErrorSeverity) *definition.AppError {
	e := &definition.AppError{
		Err:      err,
		Message:  fmt.Sprintf("%s: %s", ctx, err),
		Code:     code,
		Severity: severity,
	}
	log.Printf("[%s] %s - %v", severity, code, e.Message)
	return e
}

func GetAWSConfigForLambda() (aws.Config, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return aws.Config{}, err
	}

	return cfg, nil
}

func WriteJson(body string, statusCode int, headers map[string]string) events.APIGatewayProxyResponse {
	h := map[string]string{
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
		"Access-Control-Allow-Methods": "GET",
		"Content-Type":                 "application/json",
	}

	if headers != nil {
		for k, v := range headers {
			h[k] = v
		}
	}

	return events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Headers:    h,
		Body:       body,
	}
}

func WriteError(err definition.APIError) events.APIGatewayProxyResponse {
	b, _ := json.Marshal(err)
	return WriteJson(string(b), err.Status, nil)
}
