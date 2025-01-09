package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"path/filepath"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/weebNeedWeed/meowracle/cmd/cdk/constructs"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

var S3Client *s3.Client

func init() {
	cfg := utils.GetAWSConfig()
	S3Client = s3.NewFromConfig(cfg)
}

func main() {
	seedCertificationProgamBadges()
	seedKnowledgeBadges()
}

func seedCertificationProgamBadges() {
	c := utils.GetCertificationProgramBadges()
	seedBadges(c, "certification-program/")
}

func seedKnowledgeBadges() {
	c := utils.GetKnowledgeBadges()
	seedBadges(c, "knowledge/")
}

// prefix is the folder into which we put badges image
// E.g: prefix: knowledge/
func seedBadges(c *badgeCollection, prefix string) {
	for i, badge := range c.Data {
		response, err := http.Get(badge.ImageUrl)
		if err != nil {
			log.Fatalf("failed to download image, %v", err)
		}
		defer response.Body.Close()

		// get extension of the image (png, jpeg, etc)
		ext := filepath.Ext(badge.ImageUrl)

		_, err = S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
			Bucket: aws.String(constructs.GetBucketName()),
			Key:    aws.String(prefix + badge.VanitySlug + ext),
			Body:   response.Body,

			// must define it, because putobject requires
			ContentLength: aws.Int64(response.ContentLength),
		})
		if err != nil {
			log.Fatalf("failed to put object, %v", err)
		}

		fmt.Printf("%d. seeded %v\n", i+1, badge.Name)
	}
}
