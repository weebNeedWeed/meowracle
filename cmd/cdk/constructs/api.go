package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type ApiProps struct {
	Table awsdynamodb.Table
}

type api struct {
	constructs.Construct
}

type Api interface {
	constructs.Construct
}

func NewApi(scope constructs.Construct, id string, props *ApiProps) Api {
	this := constructs.NewConstruct(scope, &id)

	rest := awsapigateway.NewRestApi(this, jsii.String(id), &awsapigateway.RestApiProps{
		EndpointTypes: &[]awsapigateway.EndpointType{
			awsapigateway.EndpointType_EDGE,
		},
		DefaultCorsPreflightOptions: &awsapigateway.CorsOptions{
			AllowOrigins: awsapigateway.Cors_ALL_ORIGINS(),
			AllowMethods: awsapigateway.Cors_ALL_METHODS(),
			AllowHeaders: awsapigateway.Cors_DEFAULT_HEADERS(),
		},
	})

	// badge
	newBadgesResource(this, "badges-resource", &ResourceProps{
		Rest:  rest,
		Table: props.Table,
	})

	// template
	newTemplatesResource(this, "templates-resource", &ResourceProps{
		Rest:  rest,
		Table: props.Table,
	})

	// subscription
	newSubscriptionsResource(this, "subscriptions-resource", &ResourceProps{
		Rest:  rest,
		Table: props.Table,
	})

	return api{this}
}
