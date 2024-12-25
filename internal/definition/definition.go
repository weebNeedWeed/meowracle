package definition

import (
	"strconv"
	"strings"

	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type Badge struct {
	Id    string `json:"id"`
	Title string `json:"title"`
	Path  string `json:"path"`
	Level int    `json:"level"`
}

type Template struct {
	Id    string `json:"id"`
	Title string `json:"title"`
	Path  string `json:"path"`
	Slots []Slot `json:"slots"`
}

type Slot struct {
	TemplateId string `json:"templateId"`
	Index      int    `json:"index"`
	X          int    `json:"x"`
	Y          int    `json:"y"`
	Width      int    `json:"width"`
	Height     int    `json:"height"`
}

type DynamoDBBadge struct {
	Pk    string `dynamodbav:"pk"`
	Sk    string `dynamodbav:"sk"`
	Title string `dynamodbav:"title"`
	Path  string `dynamodbav:"path"`
	Level int    `dynamodbav:"level"`
}

type DynamoDBTemplate struct {
	Pk    string `dynamodbav:"pk"`
	Sk    string `dynamodbav:"sk"`
	Title string `dynamodbav:"title"`
	Path  string `dynamodbav:"path"`
}

type DynamoDBSlot struct {
	Pk     string `dynamodbav:"pk"`
	Sk     string `dynamodbav:"sk"`
	X      int    `dynamodbav:"x"`
	Y      int    `dynamodbav:"y"`
	Width  int    `dynamodbav:"width"`
	Height int    `dynamodbav:"height"`
}

func (b *DynamoDBBadge) ToBadge() Badge {
	id := strings.Split(b.Sk, "#")[1]

	return Badge{
		Id:    id,
		Title: b.Title,
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

func (d *DynamoDBTemplate) ToTemplate() Template {
	id := strings.Split(d.Pk, "#")[1]

	return Template{
		Id:    id,
		Title: d.Title,
		Path:  d.Path,
	}
}

func (d *DynamoDBSlot) ToSlot() Slot {
	templateId := strings.Split(d.Pk, "#")[1]

	index := strings.Split(d.Sk, "#")[1]
	indexAsInt, _ := strconv.Atoi(index)

	return Slot{
		TemplateId: templateId,
		Index:      indexAsInt,
		X:          d.X,
		Y:          d.Y,
		Width:      d.Width,
		Height:     d.Height,
	}
}
