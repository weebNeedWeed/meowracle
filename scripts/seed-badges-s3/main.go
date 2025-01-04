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

type badgeCollection struct {
	Data []badge `json:"data"`
}

type badge struct {
	Name       string `json:"name"`
	ImageUrl   string `json:"image_url"`
	VanitySlug string `json:"vanity_slug"`
}

var S3Client *s3.Client

func init() {
	cfg := utils.GetAWSConfig()
	S3Client = s3.NewFromConfig(cfg)
}

func main() {
	c := getCertificationProgramBadges()
	seedCertificationProgamBadges(c)
}

func seedCertificationProgamBadges(c *badgeCollection) {
	for _, badge := range c.Data {
		response, err := http.Get(badge.ImageUrl)
		if err != nil {
			log.Fatalf("failed to download image, %v", err)
		}
		defer response.Body.Close()

		ext := filepath.Ext(badge.ImageUrl)

		_, err = S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
			Bucket:        aws.String(constructs.GetBucketName()),
			Key:           aws.String("certification-program/" + badge.VanitySlug + ext),
			Body:          response.Body,
			ContentLength: aws.Int64(response.ContentLength),
		})
		if err != nil {
			log.Fatalf("failed to put object, %v", err)
		}

		fmt.Printf("seeded %v\n", badge.Name)
	}
}
