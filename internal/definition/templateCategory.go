package definition

import "strings"

type TemplateCategory struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type DynamoDBTemplateCategory struct {
	Pk     string `dynamodbav:"pk"`
	Sk     string `dynamodbav:"sk"`
	Name   string `dynamodbav:"name"`
	Gsi1pk string `dynamodbav:"gsi1pk"`
	Gsi1sk string `dynamodbav:"gsi1sk"`
}

func (b *DynamoDBTemplateCategory) ToTemplateCategory() TemplateCategory {
	id := strings.Split(b.Pk, "#")[1]

	return TemplateCategory{
		Id:   id,
		Name: b.Name,
	}
}
