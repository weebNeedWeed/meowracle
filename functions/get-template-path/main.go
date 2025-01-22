package main

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/go-playground/validator/v10"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/services/templates"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var store *templates.Store
var imageBaseUrl string

func init() {
	imageBaseUrl = os.Getenv("IMAGE_BASE_URL")
	if strings.Contains(imageBaseUrl, "cloudfront") {
		imageBaseUrl = "https://" + imageBaseUrl + "/"
	}
	cfg := utils.NewLambdaHandlerConfig()
	store = templates.NewStore(cfg.DynamodbClient)
}

type params struct {
	TemplateId    string `validate:"required,ascii"`
	NumberOfSlots int    `validate:"required,gte=0,lte=12"`
}

func parseAndValidateParams(paramsMap map[string]string) (*params, error) {
	slots := paramsMap["numberOfSlots"]
	slotsAsInt, err := strconv.Atoi(slots)
	if err != nil {
		return nil, err
	}

	p := params{
		TemplateId:    paramsMap["templateId"],
		NumberOfSlots: slotsAsInt,
	}

	err = utils.Validate.Struct(p)
	if err != nil {
		return nil, err
	}

	return &p, err
}

func handleRequest(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	p, err := parseAndValidateParams(event.PathParameters)
	if err != nil {
		if vErrs, ok := err.(validator.ValidationErrors); ok {
			apiErr := definition.NewAPIErrorFromValidationErrors(vErrs)
			return utils.WriteError(apiErr), nil
		} else {
			apiErr := definition.NewAPIError(definition.ErrBadRequest, "invalid request parameters", http.StatusBadRequest)
			return utils.WriteError(apiErr), nil
		}
	}

	res, err := templates.GetTemplatePath(p.TemplateId, p.NumberOfSlots, store, imageBaseUrl)
	if err != nil {
		if errors.Is(err, templates.NoTemplatePathError) {
			apiErr := definition.NewAPIError(definition.ErrBadRequest, "no path found with given request parameters", http.StatusBadRequest)
			return utils.WriteError(apiErr), nil
		}

		apiErr := definition.NewAPIError(definition.ErrInternalServer, "internal server error", http.StatusInternalServerError)
		return utils.WriteError(apiErr), nil
	}

	j, _ := json.Marshal(res)

	return utils.WriteJson(string(j), http.StatusOK, nil), nil
}

func main() {
	lambda.Start(handleRequest)
}
