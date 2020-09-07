const {
    ServiceBroker
} = require('moleculer');

//create node
const nodeOne = new ServiceBroker({
    //  nodeID: "IBM-Greeter-Server",
    logLevel:'info',
    // registry:{
    //     strategy:"Random"
    // },
    transporter: "redis://localhost:4222"
});

//service : 
nodeOne.createService({
    name: 'GreeterService',
    actions: {
          greet() {
                return 'Greeter';
          }
    }
});
//Register this serviceRegistry

const service = nodeOne.start();
//calling service on promise
service.then(res => nodeOne.call('GreeterService.greet')).then(result => console.log(result));
nodeOne.repl();
