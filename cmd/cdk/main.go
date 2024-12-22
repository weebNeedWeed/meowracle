package main

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type MeowracleStackProps struct {
	awscdk.StackProps
}

func NewMeowracleStack(scope constructs.Construct, id string, props *MeowracleStackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	// awscdklambdagoalpha.NewGoFunction(stack, jsii.String("handler"), &awscdklambdagoalpha.GoFunctionProps{
	// 	Entry: jsii.String("functions/hello-world"),
	// })

	awsdynamodb.NewTable(stack, jsii.String("BackendTable"), &awsdynamodb.TableProps{
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("pk"),
			Type: awsdynamodb.AttributeType_STRING,
		},
		SortKey: &awsdynamodb.Attribute{
			Name: jsii.String("sk"),
			Type: awsdynamodb.AttributeType_STRING,
		},
		BillingMode:   awsdynamodb.BillingMode_PROVISIONED,
		ReadCapacity:  jsii.Number(5),
		WriteCapacity: jsii.Number(2),
		// DeletionProtection:   jsii.Bool(false),
		// RemovalPolicy:        awscdk.RemovalPolicy_DESTROY,
	})

	return stack
}

func main() {
	defer jsii.Close()

	app := awscdk.NewApp(nil)

	NewMeowracleStack(app, "MeowracleStack", &MeowracleStackProps{
		awscdk.StackProps{
			Env: env(),
		},
	})

	app.Synth(nil)
}

func env() *awscdk.Environment {
	return &awscdk.Environment{
		Region: jsii.String("ap-southeast-1"),
	}
}
