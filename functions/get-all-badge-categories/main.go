package main

import (
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/services/badgeCategories"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var config *utils.LambdaHandlerConfig
var store *badgeCategories.Store

func init() {
	config = utils.NewLambdaHandlerConfig()
	store = badgeCategories.NewStore(config.DynamodbClient)
}

func handleRequest() (events.APIGatewayProxyResponse, error) {
	response, err := badgeCategories.GetAllBadgeCategories(store)
	if err != nil {
		appErr := definition.NewAPIError(definition.ErrInternalServer, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(appErr), nil
	}

	j, _ := json.Marshal(response)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
