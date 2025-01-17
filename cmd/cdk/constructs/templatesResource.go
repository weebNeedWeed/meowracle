package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

func newTemplatesResource(scope constructs.Construct, id string, props *ResourceProps) {
	this := constructs.NewConstruct(scope, &id)

	templates := props.Rest.Root().AddResource(jsii.String("templates"), &awsapigateway.ResourceOptions{})
	// templatesWithId := templates.AddResource(jsii.String("{templateId}"), &awsapigateway.ResourceOptions{})

	addGetAllTemplatesHandler(this, templates, props)
	// addGetTemplateByIdHandler(this, templatesWithId, props)
}

func addGetAllTemplatesHandler(this constructs.Construct, templates awsapigateway.Resource, props *ResourceProps) {
	getAllTemplates := newFunctionHandler(this, "get-all-templates-handler", &FunctionHandlerProps{
		Entry: "functions/get-all-templates",
	})
	props.Table.GrantReadData(getAllTemplates.Handler())

	getAllBadgesIntegration := awsapigateway.NewLambdaIntegration(getAllTemplates.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	templates.AddMethod(jsii.String("GET"), getAllBadgesIntegration, &awsapigateway.MethodOptions{})
}

func addGetTemplateByIdHandler(this constructs.Construct, templatesWithId awsapigateway.Resource, props *ResourceProps) {
	getTemplateById := newFunctionHandler(this, "get-template-by-id-handler", &FunctionHandlerProps{
		Entry: "functions/get-template-by-id",
	})
	props.Table.GrantReadData(getTemplateById.Handler())

	getTemplateByIdIntegration := awsapigateway.NewLambdaIntegration(getTemplateById.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	templatesWithId.AddMethod(jsii.String("GET"), getTemplateByIdIntegration, &awsapigateway.MethodOptions{})
}
