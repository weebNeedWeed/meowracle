package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

func newSubscriptionsResource(scope constructs.Construct, id string, props *ResourceProps) {
	// this := constructs.NewConstruct(scope, &id)

	// subs := props.Rest.Root().AddResource(jsii.String("subscriptions"), &awsapigateway.ResourceOptions{
	// 	DefaultCorsPreflightOptions: &awsapigateway.CorsOptions{
	// 		AllowOrigins: awsapigateway.Cors_ALL_ORIGINS(),
	// 		AllowMethods: awsapigateway.Cors_ALL_METHODS(),
	// 		AllowHeaders: awsapigateway.Cors_DEFAULT_HEADERS(),
	// 	},
	// })

	// addSubscribeForLettersHandler(this, subs, props)
}

func addSubscribeForLettersHandler(this constructs.Construct, subs awsapigateway.Resource, props *ResourceProps) {
	subscribeForLetters := newFunctionHandler(this, "subscribe-for-letters-handler", &FunctionHandlerProps{
		Entry: "functions/subscribe-for-letters",
	})
	props.Table.GrantReadWriteData(subscribeForLetters.Handler())

	subscribeForLettersIntegration := awsapigateway.NewLambdaIntegration(subscribeForLetters.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	subs.AddMethod(jsii.String("POST"), subscribeForLettersIntegration, &awsapigateway.MethodOptions{})
}
