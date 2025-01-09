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

	delProtection := jsii.Bool(false)
	rmPolicy := awscdk.RemovalPolicy_DESTROY

	if env.IsProduction() {
		delProtection = jsii.Bool(true)
		rmPolicy = awscdk.RemovalPolicy_RETAIN
	}

	table := awsdynamodb.NewTable(this, jsii.String("table"), &awsdynamodb.TableProps{
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("pk"),
			Type: awsdynamodb.AttributeType_STRING,
		},
		SortKey: &awsdynamodb.Attribute{
			Name: jsii.String("sk"),
			Type: awsdynamodb.AttributeType_STRING,
		},
		BillingMode:        awsdynamodb.BillingMode_PROVISIONED,
		ReadCapacity:       jsii.Number(3),
		WriteCapacity:      jsii.Number(1),
		TableName:          jsii.String(TableName),
		DeletionProtection: delProtection,
		RemovalPolicy:      rmPolicy,
	})

	table.AddGlobalSecondaryIndex(&awsdynamodb.GlobalSecondaryIndexProps{
		IndexName:      jsii.String("gsi1"),
		ProjectionType: awsdynamodb.ProjectionType_ALL,
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("gsi1pk"),
			Type: awsdynamodb.AttributeType_STRING,
		},
		SortKey: &awsdynamodb.Attribute{
			Name: jsii.String("gsi1sk"),
			Type: awsdynamodb.AttributeType_STRING,
		},
		ReadCapacity:  jsii.Number(2),
		WriteCapacity: jsii.Number(1),
	})

	return &meowracleTable{this, table}
}

func (m *meowracleTable) Table() awsdynamodb.Table {
	return m.table
}
