// const {ServiceBroker}  = require('moleculer');


// // Create Node
// const nodeOne = new ServiceBroker({
//     nodeID : "Greeter-Server"
// });

// // Serive 

// nodeOne.createService({
//     name: 'GreeterService',
//     actions: {
//         sayHello(){
//             return 'hello Greeter Service';
//         }
//     }
// });


// const service = nodeOne.start();
// service.then(res => nodeOne.call('GreeterService.sayHello').then(result => console.log(result)))
// ;nodeOne.repl();


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
          hello() {
                return 'Hello';
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

const service = nodeOne.start();
//calling service on promise
service.then(res => nodeOne.call('GreeterService.helloBrother', {name:"Arpit"})).then(result => console.log(result));
nodeOne.repl();
