package utils

import (
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/go-playground/validator/v10"
	"github.com/weebNeedWeed/meowracle/internal/env"
)

var Validate = validator.New(validator.WithRequiredStructEnabled())

func GetAWSConfig() aws.Config {
	profile := env.GetString("AWS_PROFILE", "default")

	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithSharedConfigProfile(profile))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	return cfg
}
