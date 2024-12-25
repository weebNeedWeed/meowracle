package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/aws-cdk-go/awscdklambdagoalpha/v2"
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

	rest := awsapigateway.NewRestApi(this, jsii.String("RestApi"), &awsapigateway.RestApiProps{
		EndpointTypes: &[]awsapigateway.EndpointType{
			awsapigateway.EndpointType_EDGE,
		},
	})

	// badge resource
	badges := rest.Root().AddResource(jsii.String("badges"), &awsapigateway.ResourceOptions{})

	getAllBadges := awscdklambdagoalpha.NewGoFunction(this, jsii.String("get-all-badges"), &awscdklambdagoalpha.GoFunctionProps{
		Entry: jsii.String("functions/get-all-badges"),
		Bundling: &awscdklambdagoalpha.BundlingOptions{
			GoBuildFlags: &[]*string{
				jsii.String(`-ldflags "-s -w"`),
			},
		},
		Environment: &map[string]*string{
			"TABLE_NAME": jsii.String(TableName),
		},
	})
	props.Table.GrantReadData(getAllBadges)
	getAllBadgesIntegration := awsapigateway.NewLambdaIntegration(getAllBadges, &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	badges.AddMethod(jsii.String("GET"), getAllBadgesIntegration, &awsapigateway.MethodOptions{})

	// template resource
	templates := rest.Root().AddResource(jsii.String("templates"), &awsapigateway.ResourceOptions{})

	getAllTemplates := awscdklambdagoalpha.NewGoFunction(this, jsii.String("get-all-templates"), &awscdklambdagoalpha.GoFunctionProps{
		Entry: jsii.String("functions/get-all-templates"),
		Bundling: &awscdklambdagoalpha.BundlingOptions{
			GoBuildFlags: &[]*string{
				jsii.String(`-ldflags "-s -w"`),
			},
		},
		Environment: &map[string]*string{
			"TABLE_NAME": jsii.String(TableName),
		},
	})
	props.Table.GrantReadData(getAllTemplates)
	getAllTemplatesIntegration := awsapigateway.NewLambdaIntegration(getAllTemplates, &awsapigateway.LambdaIntegrationOptions{
		Proxy: jsii.Bool(true),
	})
	templates.AddMethod(jsii.String("GET"), getAllTemplatesIntegration, &awsapigateway.MethodOptions{})

	return api{this}
}
