package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type ResourceProps struct {
	Rest         awsapigateway.RestApi
	Table        awsdynamodb.Table
	ImageBaseUrl *string
}

func newBadgesResource(scope constructs.Construct, id string, props *ResourceProps) {
	this := constructs.NewConstruct(scope, &id)

	badges := props.Rest.Root().AddResource(jsii.String("badges"), &awsapigateway.ResourceOptions{})

	// badgesCrawl := badges.AddResource(jsii.String("crawl"), &awsapigateway.ResourceOptions{
	// 	DefaultCorsPreflightOptions: &awsapigateway.CorsOptions{
	// 		AllowOrigins: awsapigateway.Cors_ALL_ORIGINS(),
	// 		AllowHeaders: awsapigateway.Cors_DEFAULT_HEADERS(),
	// 		AllowMethods: awsapigateway.Cors_ALL_METHODS(),
	// 	},
	// })

	addGetAllBadgesHandler(this, badges, props)
	// crawlBadgesCredly(this, badgesCrawl, props)
}

func addGetAllBadgesHandler(this constructs.Construct, badges awsapigateway.Resource, props *ResourceProps) {
	getAllBadges := newFunctionHandler(this, "get-all-badges-handler", &FunctionHandlerProps{
		Entry: "functions/get-all-badges",
		Environment: &map[string]*string{
			"IMAGE_BASE_URL": props.ImageBaseUrl,
		},
	})
	props.Table.GrantReadData(getAllBadges.Handler())

	getAllBadgesIntegration := awsapigateway.NewLambdaIntegration(getAllBadges.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	badges.AddMethod(jsii.String("GET"), getAllBadgesIntegration, &awsapigateway.MethodOptions{})
}

func crawlBadgesCredly(this constructs.Construct, badgesCrawl awsapigateway.Resource, props *ResourceProps) {
	crawlBadgesCredly := newFunctionHandler(this, "crawl-badges-credly-handler", &FunctionHandlerProps{
		Entry:            "functions/crawl-badges-credly",
		TimeoutAsSeconds: 10,
	})

	crawlBadgesCredlyIntegration := awsapigateway.NewLambdaIntegration(crawlBadgesCredly.Handler(), &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})

	badgesCrawl.AddMethod(jsii.String("POST"), crawlBadgesCredlyIntegration, &awsapigateway.MethodOptions{})
}
