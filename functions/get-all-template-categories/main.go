package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/services/templateCategories"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var store *templateCategories.Store

func init() {
	cfg := utils.NewLambdaHandlerConfig()
	store = templateCategories.NewStore(cfg.DynamodbClient)
}

func requestHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	res, err := templateCategories.GetAllTemplateCategories(store)
	if err != nil {
		apiErr := definition.NewAPIError(definition.ErrInternalServer, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(apiErr), nil
	}

	j, _ := json.Marshal(res)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(requestHandler)
}
