package main

import (
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/google/uuid"
	"github.com/weebNeedWeed/meowracle/internal/definition"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var dynamodbClient *dynamodb.Client

func init() {
	cfg := utils.GetAWSConfig()
	dynamodbClient = dynamodb.NewFromConfig(cfg)
}

func main() {
	seedTemplateCategory("Test")
}

func seedTemplateCategory(name string) string {
	id := uuid.NewString()
	c := definition.DynamoDBTemplateCategory{
		Pk:     "TEMPCAT#" + id,
		Sk:     "METADATA#" + id,
		Name:   name,
		Gsi1pk: "TEMPCAT",
		Gsi1sk: "TEMPCAT",
	}

	m, _ := attributevalue.MarshalMap(c)

	_, err := dynamodbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String(utils.TableName),
		Item:      m,
	})
	if err != nil {
		log.Fatalf("error when seeding template category, %v", err)
	}

	return id
}

func seed() {
}
