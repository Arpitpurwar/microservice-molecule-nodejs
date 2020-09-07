// Metrics : Distributed Tracing: via zipkin,OpenTrace tools
// .........................................................

// Moleculer has a built-in metrics feature. It can be enabled within the broker options with metrics: true option.

// Implementations: Using zipkin Distributed Tracing options

// Steps:

// 1.Create Service "promotions.service.js"

// 2.Add metrics true at broker level

// 3.configure zipkin with Service level.

//  >npm install moleculer-zipkin

 

const {
      ServiceBroker
} = require('moleculer');
const ZipkinService = require("moleculer-zipkin");


const broker = new ServiceBroker({
      metrics: true,
      cacher: "Redis",

})

broker.createService({
      name: "promotions",
      mixins: [ZipkinService],
      settings: {
            baseURL: "http://localhost:9411",
            version: "v2",
            batchTime: 1000,
            payloadOptions: {
                  debug: false,
                  shared: false
            }
      },
      actions: {
            import: {
                  cache: true,
                  metrics: {
                        //  add `ctx.params` to metrics payload. Default: false
                        params: true,
                        // Add `ctx.meta` to metrics payload. Default: true
                        meta: true
                  },
                  handler(ctx) {
                        return 'Promotions';
                  }
            }
      }
})

broker.start();
broker.repl();


// 4.download zipkin server


// 5.start zipkin server
//  >java -jar zipkin-server-2.12.9-exec.jar

// 6.Test zipkin server in browser
// localhost:9411/zipkin

// 7.start service ,call actions

// 8.watch zipkin dashboard in browser