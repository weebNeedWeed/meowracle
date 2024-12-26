package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
	"github.com/weebNeedWeed/meowracle/internal/env"
)

var TableName = "meowracle-table"

type DynamoDBProps struct {
}

type meowracleTable struct {
	constructs.Construct
	table awsdynamodb.Table
}

type MeowracleTable interface {
	constructs.Construct
	Table() awsdynamodb.Table
}

func NewMeowracleTable(scope constructs.Construct, id string, props *DynamoDBProps) MeowracleTable {
	this := constructs.NewConstruct(scope, &id)

	environment := env.GetString("ENVIRONMENT", "development")
	delProtection := jsii.Bool(false)
	rmPolicy := awscdk.RemovalPolicy_DESTROY

	if environment == "production" {
		delProtection = jsii.Bool(true)
		rmPolicy = awscdk.RemovalPolicy_RETAIN
	}

	table := awsdynamodb.NewTable(this, jsii.String(id), &awsdynamodb.TableProps{
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("pk"),
			Type: awsdynamodb.AttributeType_STRING,
		},
		SortKey: &awsdynamodb.Attribute{
			Name: jsii.String("sk"),
			Type: awsdynamodb.AttributeType_STRING,
		},
		BillingMode:        awsdynamodb.BillingMode_PROVISIONED,
		ReadCapacity:       jsii.Number(5),
		WriteCapacity:      jsii.Number(2),
		TableName:          jsii.String(TableName),
		DeletionProtection: delProtection,
		RemovalPolicy:      rmPolicy,
	})

	return &meowracleTable{this, table}
}

func (m *meowracleTable) Table() awsdynamodb.Table {
	return m.table
}
