package definition

import (
	"strings"

	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type Badge struct {
	Id    string `json:"id"`
	Name  string `json:"name"`
	Path  string `json:"path"`
	Level int    `json:"level"`
}

type DynamoDBBadge struct {
	Pk     string `dynamodbav:"pk"`
	Sk     string `dynamodbav:"sk"`
	Name   string `dynamodbav:"name"`
	Path   string `dynamodbav:"path"`
	Level  int    `dynamodbav:"level"`
	Gsi1pk string `dynamodbav:"gsi1pk"`
	Gsi1sk string `dynamodbav:"gsi1sk"`
}

func (b *DynamoDBBadge) ToBadge() Badge {
	id := strings.Split(b.Sk, "#")[1]

	return Badge{
		Id:    id,
		Name:  b.Name,
		Path:  b.Path,
		Level: b.Level,
	}
}

func (d *DynamoDBBadge) GetKey() (map[string]types.AttributeValue, error) {
	pk, err := attributevalue.Marshal(d.Pk)
	if err != nil {
		return nil, err
	}

	sk, err := attributevalue.Marshal(d.Sk)
	if err != nil {
		return nil, err
	}

	return map[string]types.AttributeValue{"pk": pk, "sk": sk}, nil
}
