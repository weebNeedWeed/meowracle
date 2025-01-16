package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/go-playground/validator/v10"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/services/templates"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var store *templates.Store

func init() {
	config := utils.NewLambdaHandlerConfig()
	store = templates.NewStore(config.DynamodbClient)
}

func parseAndValidateParams(queryParamsMap map[string]string) (*templates.GetAllTemplatesRequest, error) {
	res := new(templates.GetAllTemplatesRequest)

	if limit, ok := queryParamsMap["limit"]; !ok {
		return nil, fmt.Errorf("limit is required")
	} else {
		lAsInt, err := strconv.Atoi(limit)
		if err != nil {
			return nil, fmt.Errorf("limit must be int, limit=%v", limit)
		}
		res.Limit = lAsInt
	}

	if slots, ok := queryParamsMap["slots"]; ok {
		sAsInt, err := strconv.Atoi(slots)
		if err != nil {
			return nil, fmt.Errorf("slot must be int, slots=%v", slots)
		}
		res.Slots = &sAsInt
	}

	res.CategoryId = queryParamsMap["categoryId"]
	res.Cursor = definition.NewCursorFromQueryString(queryParamsMap["cursor"])
	res.Keyword = queryParamsMap["keyword"]

	err := utils.Validate.Struct(res)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func handleRequest(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	req, err := parseAndValidateParams(event.QueryStringParameters)
	if err != nil {
		utils.LogError(err, "parse and validate query params", definition.ErrBadRequest, definition.AppError_Debug_Severity)
		if vErrs, ok := err.(validator.ValidationErrors); ok {
			apiErr := definition.NewAPIErrorFromValidationErrors(vErrs)
			return utils.WriteError(apiErr), nil
		} else {
			apiErr := definition.NewAPIError(definition.ErrBadRequest, "invalid request parameters", http.StatusBadRequest)
			return utils.WriteError(apiErr), nil
		}
	}

	res, err := templates.GetAllTemplates(req, store)
	if err != nil {
		apiErr := definition.NewAPIError(definition.ErrInternalServer, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(apiErr), nil
	}

	j, _ := json.Marshal(res)
	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
