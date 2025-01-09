package definition

type BadgeCategory struct {
	Name string
}

type DynamoDBBadgeCategory struct {
	Pk     string `dynamodbav:"pk"`
	Sk     string `dynamodbav:"sk"`
	Name   string `dynamodbav:"name"`
	Gsi1pk string `dynamodbav:"gsi1pk"`
	Gsi1sk string `dynamodbav:"gsi1sk"`
}
