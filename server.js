var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.Client("zk-dev.transin.in:2181"),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'some message to broker'),
    payloads = [
        { topic: 'topic_name', messages: ['hello', 'world', km] }
    ];
producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});
 
producer.on('error', function (err) {})
console.log("HI");
