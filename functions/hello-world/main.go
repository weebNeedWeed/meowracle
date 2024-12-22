package main

import (
	"context"
	"encoding/json"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleRequest(ctx context.Context, event json.RawMessage) (string, error) {
	return "hello", nil
}

func main() {
	lambda.Start(handleRequest)
}
