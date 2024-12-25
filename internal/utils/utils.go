package utils

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/weebNeedWeed/meowracle/internal/env"
)

func GetAWSConfig() aws.Config {
	profile := env.GetString("AWS_PROFILE", "default")

	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithSharedConfigProfile(profile))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	return cfg
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

func WriteError(err error, statusCode int) events.APIGatewayProxyResponse {
	b, _ := json.Marshal(map[string]string{"error": err.Error()})
	return WriteJson(string(b), statusCode, nil)
}
