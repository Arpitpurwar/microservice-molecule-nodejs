const {
    ServiceBroker
} = require('moleculer');

//create node
const nodeOne = new ServiceBroker({
    // nodeID: "IBM-Hello-Server",
    // logLevel:'debug',
    transporter: "redis://localhost:6379"
});

//service : 
nodeOne.createService({
    name: 'HelloService',
    actions: {
          hello() {
                return 'Hello'+nodeOne.nodeID;
                      }
    }
});
//Register this serviceRegistry

const service = nodeOne.start();
//calling service on promise
service.then(res => nodeOne.call('HelloService.hello')).then(result => console.log(result));
nodeOne.repl();




// const {
//     ServiceBroker
// } = require('moleculer');

// //create node
// const greeterNode = new ServiceBroker({
//     nodeID: "IBM-Greeter-Server",
//     logLevel: 'info',
//     transporter: "nats://localhost:4222",
//     // retryPolicy: {
//     //       enabled: true,
//     //       retries: 3,
//     //       delay: 1000,
//     //       maxDelay: 2000,
//     //       factor: 2,
//     //       check: err => "Unable to Reach Service"
//     // },
//     circuitBreaker: {
//           enabled: true,
//           threshold: 0.5,
//           check: err => {
//                 console.log('Circuit Breaker is enabled');
//                 return err && err.code >= 500
//           }

//     }
// });
// //service : 
// greeterNode.createService({
//     name: 'GreeterService',
//     actions: {

//           hello: {
//                 fallback: (ctx, err) => "Hello I am from Cache",
//                 async handler(ctx) {
//                       const message = await ctx.call('HelloService.sayHello');
//                       return message;


//                 }
//           }
//     }

// });

// greeterNode.start();
// greeterNode.repl();


// const {
//     ServiceBroker
// } = require('moleculer');

// //create node
// const helloNode = new ServiceBroker({
//     //  nodeID: "IBM-Hello-Server",
//     logLevel: 'info',
//     // registry: {
//     //    strategy :'RoundRobin'    
//     // },
//     transporter: "nats://localhost:4222"

// });

// helloNode.createService({
//     name: 'HelloService',
//     actions: {
//           sayHello() {
//                 return `Hello is coming from ${this.broker.nodeID}`;
//           }
//     }
// });

// helloNode.start()
// helloNode.repl();
