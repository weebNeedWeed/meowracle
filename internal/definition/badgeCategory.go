package definition

import "strings"

type BadgeCategory struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type DynamoDBBadgeCategory struct {
	Pk     string `dynamodbav:"pk"`
	Sk     string `dynamodbav:"sk"`
	Name   string `dynamodbav:"name"`
	Gsi1pk string `dynamodbav:"gsi1pk"`
	Gsi1sk string `dynamodbav:"gsi1sk"`
}

func (b *DynamoDBBadgeCategory) ToBadgeCategory() BadgeCategory {
	id := strings.Split(b.Pk, "#")[1]

	return BadgeCategory{
		Id:   id,
		Name: b.Name,
	}
}
