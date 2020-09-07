const {
    ServiceBroker
} = require('moleculer');

//create node
const nodeOne = new ServiceBroker({
    nodeID: "IBM-Greeter-Server"
});

//service : 
nodeOne.createService({
    name: 'GreeterService',
    actions: {
          async hello(ctx) {
            const message  =  await ctx.call('HelloService.sayHello');
            return message;
          },
          helloBrother:{
              params :{
                name: "string"
              },
              handler(ctx){
              let name = ctx.params.name;
              return `Hello ${name}`;
              }
          }
    }
});
//Register this serviceRegistry

nodeOne.createService({
    name:'HelloService',
    actions:{
        sayHello(){
            return `HelloService is working`;
        }
    }
})
const service = nodeOne.start();
//calling service on promise
service.then(res => nodeOne.call('GreeterService.hello')).then(result => console.log(result));
nodeOne.repl();


// const {
//     ServiceBroker
// } = require('moleculer');

// //create node
// const nodeOne = new ServiceBroker({
//     nodeID: "IBM-Greeter-Server"
// });

// //service : 
// nodeOne.createService({
//     name: 'GreeterService',
//     actions: {
//           async hello(ctx) {
//                 const message = await ctx.call('HelloService.sayHello');
//                 return message;
//           }
//     }
// });

// nodeOne.createService({
//     name: 'HelloService',
//     actions: {
//           sayHello() {
//                 return 'Hello';
//           }
//     }
// });


// nodeOne.start();

// nodeOne.repl();