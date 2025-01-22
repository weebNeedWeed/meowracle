package constructs

import (
	"strings"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awscloudfront"
	"github.com/aws/aws-cdk-go/awscdk/v2/awscloudfrontorigins"
	"github.com/aws/aws-cdk-go/awscdk/v2/awss3"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
	"github.com/weebNeedWeed/meowracle/internal/env"
)

var bucketName = "meowracle-" + "b4922fdf-57d1"

func GetBucketName() string {
	bucketName = strings.ToLower(env.GetString("AWS_PROFILE", "default")) + "-" + bucketName
	if env.IsProduction() {
		return "prod-" + bucketName
	} else {
		return bucketName
	}
}

type BucketDistributionProps struct {
}

type bucketDistribution struct {
	constructs.Construct
	imageBaseUrl *string
}

type BucketDistribution interface {
	constructs.Construct
	ImageBaseUrl() *string
}

func NewBucketDistribution(scope constructs.Construct, id string, props *BucketDistributionProps) BucketDistribution {
	this := constructs.NewConstruct(scope, &id)

	removalPol := awscdk.RemovalPolicy_DESTROY
	if env.IsProduction() {
		removalPol = awscdk.RemovalPolicy_RETAIN
	}

	b := awss3.NewBucket(this, jsii.String("bucket"), &awss3.BucketProps{
		BucketName:       jsii.String(GetBucketName()),
		Encryption:       awss3.BucketEncryption_S3_MANAGED,
		RemovalPolicy:    removalPol,
		PublicReadAccess: jsii.Bool(true),
		BlockPublicAccess: awss3.NewBlockPublicAccess(&awss3.BlockPublicAccessOptions{
			BlockPublicAcls:       jsii.Bool(false),
			BlockPublicPolicy:     jsii.Bool(false),
			IgnorePublicAcls:      jsii.Bool(false),
			RestrictPublicBuckets: jsii.Bool(false),
		}),
	})

	b.AddCorsRule(&awss3.CorsRule{
		AllowedMethods: &[]awss3.HttpMethods{
			awss3.HttpMethods_GET,
		},
		AllowedOrigins: &[]*string{
			jsii.String("*"),
		},
	})

	baseUrl := b.UrlForObject(jsii.String(""))

	if env.IsProduction() {
		cachePolicy := awscloudfront.NewCachePolicy(this, jsii.String("dist-cachepolicy-allow-cors"), &awscloudfront.CachePolicyProps{
			HeaderBehavior: awscloudfront.CacheHeaderBehavior_AllowList(
				jsii.String("Access-Control-Request-Method"),
				jsii.String("Access-Control-Request-Headers"),
			),
			EnableAcceptEncodingBrotli: jsii.Bool(true),
			EnableAcceptEncodingGzip:   jsii.Bool(true),
		})

		dist := awscloudfront.NewDistribution(this, jsii.String("dist"), &awscloudfront.DistributionProps{
			DefaultBehavior: &awscloudfront.BehaviorOptions{
				Origin:                awscloudfrontorigins.S3BucketOrigin_WithOriginAccessControl(b, &awscloudfrontorigins.S3BucketOriginWithOACProps{}),
				CachePolicy:           cachePolicy,
				OriginRequestPolicy:   awscloudfront.OriginRequestPolicy_CORS_S3_ORIGIN(),
				ResponseHeadersPolicy: awscloudfront.ResponseHeadersPolicy_CORS_ALLOW_ALL_ORIGINS(),
			},
		})

		baseUrl = dist.DistributionDomainName()
	}

	return &bucketDistribution{this, baseUrl}
}

func (b *bucketDistribution) ImageBaseUrl() *string {
	return b.imageBaseUrl
}
