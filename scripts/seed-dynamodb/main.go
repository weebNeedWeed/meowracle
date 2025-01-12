package main

import (
	"context"
	"fmt"
	"log"
	"path"

	meowracleDb "github.com/weebNeedWeed/meowracle/cmd/cdk/constructs"
	"github.com/weebNeedWeed/meowracle/internal/utils"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/weebNeedWeed/meowracle/internal/definition"
)

const batchSize = 25

func main() {
	cfg := utils.GetAWSConfig()
	dynamodbClient := dynamodb.NewFromConfig(cfg)

	badgeCat1Id := seedBadgeCategories(dynamodbClient, "AWS Certification Program")
	seedBadges(dynamodbClient, utils.GetCertificationProgramBadges(), badgeCat1Id, "certification-program/")
}

// return: Category's ID
func seedBadgeCategories(client *dynamodb.Client, badgeName string) string {
	ids := getUUIDs(1)

	t1 := definition.DynamoDBBadgeCategory{
		Pk:     "BADGECAT#" + ids[0],
		Sk:     "METADATA#" + ids[0],
		Name:   badgeName,
		Gsi1pk: "BADGECAT",
		Gsi1sk: "BADGECAT",
	}

	m, err := attributevalue.MarshalMap(t1)
	if err != nil {
		log.Fatalf("error when seeding badge categories, %v", err)
	}

	_, err = client.PutItem(context.TODO(), &dynamodb.PutItemInput{
		TableName: aws.String(meowracleDb.TableName),
		Item:      m,
	})
	if err != nil {
		log.Fatalf("error when performing PutItem %v", err)
	}

	return ids[0]
}

func seedBadges(client *dynamodb.Client, c *utils.BadgeCollection, badgeCategoryId string, prefix string) {
	ids := getUUIDs(len(c.Data))

	// Convert BadgeCollection into DDBBadge
	ddbBadges := make([]definition.DynamoDBBadge, 0)
	for index, d := range c.Data {
		path := prefix + d.VanitySlug + path.Ext(d.ImageUrl)
		ddbBadge := definition.DynamoDBBadge{
			Pk:     "BADGECAT#" + badgeCategoryId,
			Sk:     "BADGE#" + ids[index],
			Name:   d.Name,
			Path:   path,
			Level:  getBadgeLevelByName(d.Name),
			Gsi1pk: "BADGE",
			Gsi1sk: "BADGE",
		}
		ddbBadges = append(ddbBadges, ddbBadge)
	}

	// insert them to ddb
	start, end := 0, batchSize

	for start < len(ddbBadges) {
		if end > len(ddbBadges) {
			end = len(ddbBadges)
		}

		reqs := []types.WriteRequest{}
		for _, b := range ddbBadges[start:end] {
			m, err := attributevalue.MarshalMap(b)
			if err != nil {
				log.Fatalf("error when marshalling ddb badge, %v", err)
			}

			req := types.WriteRequest{
				PutRequest: &types.PutRequest{
					Item: m,
				},
			}

			reqs = append(reqs, req)

			fmt.Printf("inserted %s", b.Name)
		}

		_, err := client.BatchWriteItem(context.TODO(), &dynamodb.BatchWriteItemInput{
			RequestItems: map[string][]types.WriteRequest{
				utils.TableName: reqs,
			},
		})

		if err != nil {
			log.Fatalf("error when batch write request, %v", err)
		}

		start = end
		end = start + batchSize
	}
}

// func seedTemplatesAndSlots(client *dynamodb.Client, templates []definition.DynamoDBTemplate, slots []definition.DynamoDBSlot) {
// 	start, end := 0, batchSize
//
// 	reqs := []types.WriteRequest{}
//
// 	for start < len(templates) {
// 		if end > len(templates) {
// 			end = len(templates)
// 		}
//
// 		for _, t := range templates[start:end] {
// 			item, err := attributevalue.MarshalMap(t)
// 			if err != nil {
// 				log.Fatalf("failed to marshal template with title %v, %v", t.Title, err)
// 			}
//
// 			req := types.WriteRequest{
// 				PutRequest: &types.PutRequest{
// 					Item: item,
// 				},
// 			}
// 			reqs = append(reqs, req)
// 		}
//
// 		_, err := client.BatchWriteItem(context.TODO(), &dynamodb.BatchWriteItemInput{
// 			RequestItems: map[string][]types.WriteRequest{
// 				meowracleDb.TableName: reqs,
// 			},
// 		})
//
// 		if err != nil {
// 			log.Fatalf("error occured when doing batch write item request: %v", err)
// 		}
//
// 		start = end
// 		end = start + batchSize
// 	}
//
// 	start, end = 0, batchSize
// 	reqs = []types.WriteRequest{}
// 	for start < len(slots) {
// 		if end > len(slots) {
// 			end = len(slots)
// 		}
//
// 		for _, s := range slots[start:end] {
// 			item, err := attributevalue.MarshalMap(s)
// 			if err != nil {
// 				log.Fatalf("failed to marshal slot with templateId %v, %v", s.Pk, err)
// 			}
//
// 			req := types.WriteRequest{
// 				PutRequest: &types.PutRequest{
// 					Item: item,
// 				},
// 			}
// 			reqs = append(reqs, req)
// 		}
//
// 		_, err := client.BatchWriteItem(context.TODO(), &dynamodb.BatchWriteItemInput{
// 			RequestItems: map[string][]types.WriteRequest{
// 				meowracleDb.TableName: reqs,
// 			},
// 		})
// 		if err != nil {
// 			log.Fatalf("error occured when doing batch write item request: %v", err)
// 		}
//
// 		start = end
// 		end = start + batchSize
// 	}
// }
