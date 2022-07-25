import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as Path from 'path'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkLayerPnpmExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkLayerExampleQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const externalModules = [
      'aws-sdk',
      'aws-embedded-metrics',
      'pg',
    ]

    const awsPnpmLayer = new lambda.LayerVersion(this, 'aws-pnpm-layer', {
      code: lambda.Code.fromAsset(Path.join(__dirname, 'layers/aws-layer')),
    });

    const frankLambda = new NodejsFunction(this, 'frank-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
      entry: Path.join(__dirname, `/../lambda/index.js`),
      bundling: {
        minify: false,
        // 👇 don't bundle `aws-layer` layer
        // layers are already available in the lambda env
        externalModules: externalModules,
      },
      layers: [awsPnpmLayer],
    });

  }
}
