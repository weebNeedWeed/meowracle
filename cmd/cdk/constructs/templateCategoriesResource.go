package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

func newTemplateCategoriesResource(scope constructs.Construct, id string, props *ResourceProps) {
	this := constructs.NewConstruct(scope, &id)

	templateCategories := props.Rest.Root().AddResource(jsii.String("template-categories"), &awsapigateway.ResourceOptions{})

	addGetAllTemplateCategories(this, templateCategories, props)
}

func addGetAllTemplateCategories(this constructs.Construct, tempCats awsapigateway.Resource, props *ResourceProps) {
	handler := newFunctionHandler(this, "get-all-template-categories-handler", &FunctionHandlerProps{
		Entry: "functions/get-all-template-categories",
	})

	props.Table.GrantReadData(handler.Handler())

	integration := awsapigateway.NewLambdaIntegration(handler.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})

	tempCats.AddMethod(jsii.String("GET"), integration, &awsapigateway.MethodOptions{})
}
