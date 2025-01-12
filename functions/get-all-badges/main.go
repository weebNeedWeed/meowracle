package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/go-playground/validator/v10"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/services/badges"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var tableName string
var dynamodbClient *dynamodb.Client
var store *badges.Store

func init() {
	cfg, _ := utils.GetAWSConfigForLambda()
	dynamodbClient = dynamodb.NewFromConfig(cfg)
	store = badges.NewStore(dynamodbClient)
}

func newCursorFromQueryString(query string) definition.Cursor {
	if query == "" {
		return nil
	}

	c := definition.Cursor{}
	err := json.Unmarshal([]byte(query), &c)
	if err != nil {
		return nil
	}

	return c
}

type params struct {
	Limit      int               `validate:"required,gte=1,lte=40"`
	Keyword    string            `validate:"omitempty,alphanum"`
	CategoryId string            `validate:"omitempty,ascii"`
	Cursor     definition.Cursor `validate:"omitnil"`
}

func parseAndValidateParams(paramsMap map[string]string) (*params, error) {
	limit, err := strconv.ParseInt(paramsMap["limit"], 10, 64)
	if err != nil {
		return nil, err
	}

	p := params{
		Limit:      int(limit),
		Keyword:    paramsMap["keyword"],
		CategoryId: paramsMap["categoryId"],
		Cursor:     newCursorFromQueryString(paramsMap["cursor"]),
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

	getAllBadgesRes, err := store.GetAllBadges(p.Limit, p.Keyword, p.CategoryId, p.Cursor)
	if err != nil {
		appErr := utils.LogError(err, "Get all badges", definition.ErrInternalServer, definition.AppError_Error_Severity)
		apiErr := definition.NewAPIError(appErr.Code, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(apiErr), nil
	}

	badges := []definition.Badge{}
	for _, b := range getAllBadgesRes.Badges {
		badges = append(badges, b.ToBadge())
	}

	totalRows, err := store.CountNumberOfBadges(p.Keyword, p.CategoryId)
	if err != nil {
		utils.LogError(err, "Get number of rows", definition.ErrInternalServer, definition.AppError_Error_Severity)
		apiErr := definition.NewAPIError(definition.ErrInternalServer, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(apiErr), nil
	}

	response := definition.NewResponse[[]definition.Badge](badges, http.StatusOK)
	response.WithPagination(getAllBadgesRes.Cursor, getAllBadgesRes.Cursor != nil, totalRows)

	j, _ := json.Marshal(response)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
