package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/go-playground/validator/v10"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/services/badges"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var config *utils.LambdaHandlerConfig
var store *badges.Store
var imageBaseUrl string

func init() {
	imageBaseUrl = os.Getenv("IMAGE_BASE_URL")
	if strings.Contains(imageBaseUrl, "cloudfront") {
		imageBaseUrl = "https://" + imageBaseUrl + "/"
	}
	config = utils.NewLambdaHandlerConfig()
	store = badges.NewStore(config.DynamodbClient)
}

func parseAndValidateParams(paramsMap map[string]string) (*badges.GetAllBadgesRequest, error) {
	limit, err := strconv.ParseInt(paramsMap["limit"], 10, 64)
	if err != nil {
		return nil, err
	}

	p := badges.GetAllBadgesRequest{
		Limit:      int(limit),
		Keyword:    paramsMap["keyword"],
		CategoryId: paramsMap["categoryId"],
		Cursor:     definition.NewCursorFromQueryString(paramsMap["cursor"]),
	}

	err = utils.Validate.Struct(p)
	if err != nil {
		return nil, err
	}

	return &p, nil
}

func handleRequest(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Println("event:", event)

	p, err := parseAndValidateParams(event.QueryStringParameters)
	if err != nil {
		if vErr, ok := err.(validator.ValidationErrors); ok {
			return utils.WriteError(definition.NewAPIErrorFromValidationErrors(vErr)), nil
		} else {
			apiErr := definition.NewAPIError(definition.ErrBadRequest, "invalid request parameters", http.StatusBadRequest)
			return utils.WriteError(apiErr), nil
		}
	}

	response, err := badges.GetAllBadges(p, store, imageBaseUrl)
	if err != nil {
		apiErr := definition.NewAPIError(definition.ErrBadRequest, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(apiErr), nil
	}

	j, _ := json.Marshal(response)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
