package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

func newTemplatesResource(scope constructs.Construct, id string, props *ResourceProps) {
	this := constructs.NewConstruct(scope, &id)

	templates := props.Rest.Root().AddResource(jsii.String("templates"), &awsapigateway.ResourceOptions{})
	paths := templates.AddResource(jsii.String("{templateId}"), &awsapigateway.ResourceOptions{}).AddResource(jsii.String("paths"), &awsapigateway.ResourceOptions{}).AddResource(jsii.String("{numberOfSlots}"), &awsapigateway.ResourceOptions{})

	addGetAllTemplatesHandler(this, templates, props)
	addGetTemplatePathHandler(this, paths, props)
}

func addGetAllTemplatesHandler(this constructs.Construct, templates awsapigateway.Resource, props *ResourceProps) {
	getAllTemplates := newFunctionHandler(this, "get-all-templates-handler", &FunctionHandlerProps{
		Entry: "functions/get-all-templates",
		Environment: &map[string]*string{
			"IMAGE_BASE_URL": props.ImageBaseUrl,
		},
	})
	props.Table.GrantReadData(getAllTemplates.Handler())

	getAllBadgesIntegration := awsapigateway.NewLambdaIntegration(getAllTemplates.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	templates.AddMethod(jsii.String("GET"), getAllBadgesIntegration, &awsapigateway.MethodOptions{})
}

func addGetTemplatePathHandler(this constructs.Construct, paths awsapigateway.Resource, props *ResourceProps) {
	getPath := newFunctionHandler(this, "get-template-path-handler", &FunctionHandlerProps{
		Entry: "functions/get-template-path",
		Environment: &map[string]*string{
			"IMAGE_BASE_URL": props.ImageBaseUrl,
		},
	})
	props.Table.GrantReadData(getPath.Handler())

	getPathIntegration := awsapigateway.NewLambdaIntegration(getPath.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	paths.AddMethod(jsii.String("GET"), getPathIntegration, &awsapigateway.MethodOptions{})
}
