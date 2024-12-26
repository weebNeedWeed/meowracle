package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type ResourceProps struct {
	Rest  awsapigateway.RestApi
	Table awsdynamodb.Table
}

func newBadgesResource(scope constructs.Construct, id string, props *ResourceProps) {
	this := constructs.NewConstruct(scope, &id)

	badges := props.Rest.Root().AddResource(jsii.String("badges"), &awsapigateway.ResourceOptions{})

	addGetAllBadgesHandler(this, badges, props)
}

func addGetAllBadgesHandler(this constructs.Construct, badges awsapigateway.Resource, props *ResourceProps) {
	getAllBadges := newFunctionHandler(this, "get-all-badges-handler", &FunctionHandlerProps{
		Entry: "functions/get-all-badges",
	})
	props.Table.GrantReadData(getAllBadges.Handler())

	getAllBadgesIntegration := awsapigateway.NewLambdaIntegration(getAllBadges.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	badges.AddMethod(jsii.String("GET"), getAllBadgesIntegration, &awsapigateway.MethodOptions{})
}
