package main

import (
	"fmt"

	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/weebNeedWeed/meowracle/internal/services/templates"
	"github.com/weebNeedWeed/meowracle/internal/utils"
)

func main() {
	cfg, _ := utils.GetAWSConfigForLambda()
	client := dynamodb.NewFromConfig(cfg)
	s := templates.NewStore(client)
	fmt.Println(s.GetAllTemplates(20, "hellow", "aaa", nil, nil))
}
