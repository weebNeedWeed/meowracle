package main

import (
	"context"
	"fmt"
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
	id := seedTemplateCategory("Test")
	seedTemplate(id)
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

func seedTemplate(tempCatId string) {
	id := uuid.NewString()
	t := definition.DynamoDBTemplate{
		Pk:               "TEMPCAT#" + tempCatId,
		Sk:               "TEMP#" + id,
		Name:             "Test template 1",
		Gsi1pk:           "TEMP",
		Gsi1sk:           "TEMP",
		MaxNumberOfSlots: 1,
		PreviewPath:      "/templates/example-template.png",
	}

	m, _ := attributevalue.MarshalMap(t)

	_, err := dynamodbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String(utils.TableName),
		Item:      m,
	})
	if err != nil {
		log.Fatalf("error when seeding template, %v", err)
	}

	p := definition.DynamoDBTemplatePath{
		Pk:   fmt.Sprintf("TEMP#%s#PATH#%v", id, 1),
		Sk:   "PATH#1",
		Path: "/templates/example-template.png",
	}

	m, _ = attributevalue.MarshalMap(p)

	_, err = dynamodbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String(utils.TableName),
		Item:      m,
	})
	if err != nil {
		log.Fatalf("error when seeding template, %v", err)
	}

	s := definition.DynamoDBSlot{
		Pk:     fmt.Sprintf("TEMP#%sPATH%v", id, 1),
		Sk:     "SLOT#1",
		X:      1460,
		Y:      58,
		Width:  82,
		Height: 94,
	}

	m, _ = attributevalue.MarshalMap(s)

	_, err = dynamodbClient.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String(utils.TableName),
		Item:      m,
	})
	if err != nil {
		log.Fatalf("error when seeding template, %v", err)
	}
}
