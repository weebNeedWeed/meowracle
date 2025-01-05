package constructs

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdklambdagoalpha/v2"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type FunctionHandlerProps struct {
	Entry            string
	TimeoutAsSeconds float64
}

type functionHandler struct {
	constructs.Construct
	handler awscdklambdagoalpha.GoFunction
}

type FunctionHandler interface {
	constructs.Construct
	Handler() awscdklambdagoalpha.GoFunction
}

func newFunctionHandler(scope constructs.Construct, id string, props *FunctionHandlerProps) FunctionHandler {
	this := constructs.NewConstruct(scope, &id)

	var timeout float64 = 3
	if props.TimeoutAsSeconds > timeout {
		timeout = props.TimeoutAsSeconds
	}

	handler := awscdklambdagoalpha.NewGoFunction(this, jsii.String("handler"), &awscdklambdagoalpha.GoFunctionProps{
		Entry: jsii.String(props.Entry),
		Bundling: &awscdklambdagoalpha.BundlingOptions{
			GoBuildFlags: &[]*string{
				jsii.String(`-ldflags "-s -w"`),
			},
		},
		Environment: &map[string]*string{
			"TABLE_NAME": jsii.String(TableName),
		},
		Timeout: awscdk.Duration_Seconds(jsii.Number(timeout)),
	})

	return &functionHandler{
		this,
		handler,
	}
}

func (f *functionHandler) Handler() awscdklambdagoalpha.GoFunction {
	return f.handler
}
