package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type ApiProps struct {
	Table        awsdynamodb.Table
	ImageBaseUrl *string
}

type api struct {
	constructs.Construct
}

type Api interface {
	constructs.Construct
}

func NewApi(scope constructs.Construct, id string, props *ApiProps) Api {
	this := constructs.NewConstruct(scope, &id)

	rest := awsapigateway.NewRestApi(this, jsii.String("rest-api"), &awsapigateway.RestApiProps{
		EndpointTypes: &[]awsapigateway.EndpointType{
			awsapigateway.EndpointType_EDGE,
		},
		DefaultCorsPreflightOptions: &awsapigateway.CorsOptions{
			AllowOrigins: awsapigateway.Cors_ALL_ORIGINS(),
			AllowMethods: awsapigateway.Cors_ALL_METHODS(),
			AllowHeaders: awsapigateway.Cors_DEFAULT_HEADERS(),
		},
	})

	rp := &ResourceProps{
		Rest:         rest,
		Table:        props.Table,
		ImageBaseUrl: props.ImageBaseUrl,
	}

	// badge
	newBadgesResource(this, "badges-resource", rp)

	// template
	newTemplatesResource(this, "templates-resource", rp)

	// subscription
	newSubscriptionsResource(this, "subscriptions-resource", rp)

	// badge categories
	newBadgeCategoriesResource(this, "badge-categories-resource", rp)

	// template categories
	newTemplateCategoriesResource(this, "template-categories-resource", rp)

	return api{this}
}
