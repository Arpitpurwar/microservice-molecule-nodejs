const {
    ServiceBroker
} = require("moleculer");

// Create broker
const broker = new ServiceBroker({
    cacher: "Redis"
});

broker.createService({
    name: "users",
    actions: {
          list: {
                // Enable caching to this action
                cache: true,
                handler(ctx) {
                      this.logger.info("Handler called!");
                      return [{
                                  id: 1,
                                  name: "John"
                            },
                            {
                                  id: 2,
                                  name: "Jane"
                            }
                      ]
                }
          }
    }
});

broker.start()
    .then(() => {
          // Will be called the handler, because the cache is empty
          return broker.call("users.list").then(res => broker.logger.info("Users count:", res.length));
    })
    .then(() => {
          // Return from cache, handler won't be called
          return broker.call("users.list").then(res => broker.logger.info("Users count from cache:", res.length));
    });
broker.repl();