const { metricScope, Unit } = require('aws-embedded-metrics');
const { Client } = require('pg');

const myFunc = metricScope(metrics =>
  async (event) => {
    console.log("Hello pnpm 2")
    // Put Embedded Metric
    // const embeddedMetricFunc = metricScope(metrics =>
    //   async () => {
    //     metrics.setNamespace("frank_liu");
    //     metrics.putDimensions({ OrgId: message.org_id });
    //     metrics.putMetric("Count", 1, Unit.Count);
    //   });
    
    // await embeddedMetricFunc()
  });

exports.handler = myFunc;