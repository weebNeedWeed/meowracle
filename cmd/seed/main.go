package main

import (
	"context"
	"log"

	meowracleDb "github.com/weebNeedWeed/meowracle/cmd/cdk/constructs"
	"github.com/weebNeedWeed/meowracle/internal/utils"

	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/weebNeedWeed/meowracle/internal/definition"
)

const batchSize = 25

func main() {
	cfg := utils.GetAWSConfig()
	dynamodbClient := dynamodb.NewFromConfig(cfg)

	seedBadges(dynamodbClient, getBagdes())

	template, slots := getTemplatesAndSlots()
	seedTemplatesAndSlots(dynamodbClient, template, slots)
}

func seedBadges(client *dynamodb.Client, badges []definition.DynamoDBBadge) {
	start, end := 0, batchSize
	for start < len(badges) {
		reqs := []types.WriteRequest{}

		if end > len(badges) {
			end = len(badges)
		}

		for _, badge := range badges[start:end] {
			item, err := attributevalue.MarshalMap(badge)
			if err != nil {
				log.Fatalf("failed to marshal badge with title %v, %v", badge.Title, err)
			}

			req := types.WriteRequest{
				PutRequest: &types.PutRequest{
					Item: item,
				},
			}
			reqs = append(reqs, req)
		}

		_, err := client.BatchWriteItem(context.TODO(), &dynamodb.BatchWriteItemInput{
			RequestItems: map[string][]types.WriteRequest{
				meowracleDb.TableName: reqs,
			},
		})
		if err != nil {
			log.Fatalf("error occured when doing batch write item request: %v", err)
		}

		start = end
		end = start + batchSize
	}
}

func seedTemplatesAndSlots(client *dynamodb.Client, templates []definition.DynamoDBTemplate, slots []definition.DynamoDBSlot) {
	start, end := 0, batchSize

	reqs := []types.WriteRequest{}

	for start < len(templates) {
		if end > len(templates) {
			end = len(templates)
		}

		for _, t := range templates[start:end] {
			item, err := attributevalue.MarshalMap(t)
			if err != nil {
				log.Fatalf("failed to marshal template with title %v, %v", t.Title, err)
			}

			req := types.WriteRequest{
				PutRequest: &types.PutRequest{
					Item: item,
				},
			}
			reqs = append(reqs, req)
		}

		_, err := client.BatchWriteItem(context.TODO(), &dynamodb.BatchWriteItemInput{
			RequestItems: map[string][]types.WriteRequest{
				meowracleDb.TableName: reqs,
			},
		})

		if err != nil {
			log.Fatalf("error occured when doing batch write item request: %v", err)
		}

		start = end
		end = start + batchSize
	}

	start, end = 0, batchSize
	reqs = []types.WriteRequest{}
	for start < len(slots) {
		if end > len(slots) {
			end = len(slots)
		}

		for _, s := range slots[start:end] {
			item, err := attributevalue.MarshalMap(s)
			if err != nil {
				log.Fatalf("failed to marshal slot with templateId %v, %v", s.Pk, err)
			}

			req := types.WriteRequest{
				PutRequest: &types.PutRequest{
					Item: item,
				},
			}
			reqs = append(reqs, req)
		}

		_, err := client.BatchWriteItem(context.TODO(), &dynamodb.BatchWriteItemInput{
			RequestItems: map[string][]types.WriteRequest{
				meowracleDb.TableName: reqs,
			},
		})
		if err != nil {
			log.Fatalf("error occured when doing batch write item request: %v", err)
		}

		start = end
		end = start + batchSize
	}
}
