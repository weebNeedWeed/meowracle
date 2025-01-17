package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

func newBadgeCategoriesResource(scope constructs.Construct, id string, props *ResourceProps) {
	this := constructs.NewConstruct(scope, &id)

	badgeCats := props.Rest.Root().AddResource(jsii.String("badge-categories"), &awsapigateway.ResourceOptions{})

	addGetAllBadgeCategories(this, badgeCats, props)
}

func addGetAllBadgeCategories(this constructs.Construct, badgeCats awsapigateway.Resource, props *ResourceProps) {
	getAllBadgeCats := newFunctionHandler(this, "get-all-badge-categories-handler", &FunctionHandlerProps{
		Entry: "functions/get-all-badge-categories",
	})

	props.Table.GrantReadData(getAllBadgeCats.Handler())

	integration := awsapigateway.NewLambdaIntegration(getAllBadgeCats.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})

	badgeCats.AddMethod(jsii.String("GET"), integration, &awsapigateway.MethodOptions{})
}
