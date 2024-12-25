package main

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
	constructs2 "github.com/weebNeedWeed/meowracle/cmd/cdk/constructs"
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

	table := constructs2.NewMeowracleTable(stack, "MeowracleTable", &constructs2.DynamoDBProps{})

	constructs2.NewApi(stack, "MeowracleAPI", &constructs2.ApiProps{
		Table: table.Table(),
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
