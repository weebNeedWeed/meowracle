package definition

import (
	"strconv"
	"strings"

	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type Template struct {
	Id               string `json:"id"`
	Name             string `json:"name"`
	MaxNumberOfSlots int    `json:"maxNumberOfSlots"`
	PreviewPath      string `json:"previewPath"`
}

type TemplatePath struct {
	Path string `json:"path"`
}

type Slot struct {
	Index  int     `json:"index"`
	X      float64 `json:"x"`
	Y      float64 `json:"y"`
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
}

type Text struct {
	Index  int     `json:"index"`
	X      float64 `json:"x"`
	Y      float64 `json:"y"`
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
}

type DynamoDBTemplate struct {
	Pk               string `dynamodbav:"pk"`
	Sk               string `dynamodbav:"sk"`
	Name             string `dynamodbav:"name"`
	MaxNumberOfSlots int    `dynamodbav:"maxNumberOfSlots"`
	PreviewPath      string `dynamodbav:"previewPath"`
	Gsi1pk           string `dynamodbav:"gsi1pk"`
	Gsi1sk           string `dynamodbav:"gsi1sk"`
}

type DynamoDBTemplatePath struct {
	Pk   string `dynamodbav:"pk"`
	Sk   string `dynamodbav:"sk"`
	Path string `dynamodbav:"path"`
}

type DynamoDBSlot struct {
	Pk     string  `dynamodbav:"pk"`
	Sk     string  `dynamodbav:"sk"`
	X      float64 `dynamodbav:"x"`
	Y      float64 `dynamodbav:"y"`
	Width  float64 `dynamodbav:"width"`
	Height float64 `dynamodbav:"height"`
}

type DynamoDBText struct {
	Pk     string  `dynamodbav:"pk"`
	Sk     string  `dynamodbav:"sk"`
	X      float64 `dynamodbav:"x"`
	Y      float64 `dynamodbav:"y"`
	Width  float64 `dynamodbav:"width"`
	Height float64 `dynamodbav:"height"`
}

func (d *DynamoDBTemplate) ToTemplate() Template {
	id := strings.Split(d.Sk, "#")[1]

	return Template{
		Id:               id,
		Name:             d.Name,
		MaxNumberOfSlots: d.MaxNumberOfSlots,
		PreviewPath:      d.PreviewPath,
	}
}

func (d *DynamoDBTemplate) GetKey() (map[string]types.AttributeValue, error) {
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

func (d *DynamoDBSlot) ToSlot() Slot {
	index := strings.Split(d.Sk, "#")[1]
	indexAsInt, _ := strconv.Atoi(index)

	return Slot{
		Index:  indexAsInt,
		X:      d.X,
		Y:      d.Y,
		Width:  d.Width,
		Height: d.Height,
	}
}

func (d *DynamoDBText) ToText() Text {
	index := strings.Split(d.Sk, "#")[1]
	indexAsInt, _ := strconv.Atoi(index)

	return Text{
		Index:  indexAsInt,
		X:      d.X,
		Y:      d.Y,
		Width:  d.Width,
		Height: d.Height,
	}
}

func (p *DynamoDBTemplatePath) ToTemplatePath() TemplatePath {
	return TemplatePath{
		Path: p.Path,
	}
}
