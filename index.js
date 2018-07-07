exports.handler = async (event) => {
var kafka = require('kafka-node'),
 AWS = require('aws-sdk'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.Client(process.env.KAFKA_HOST),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'some message to broker');
    
   


let promise = new Promise((resolve, reject) => {
    let dataa=[];
    event.Records.forEach((record) => {
        console.log('Stream record: ', JSON.stringify(record, null, 2));
        
        if (record.eventName == 'INSERT') {
            var unmarshalled = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
            dataa.push(JSON.stringify(unmarshalled));
        }
    });
     let payloads = [
        { topic: process.env.TOPIC_NAME, messages: [dataa] }
    ];
    producer.on('ready', function () {
    console.log('ready');
    producer.send(payloads, function (err, data) {
         resolve("done!");
        console.log(data,err);
            
    });
});
  });

  await promise;
 
producer.on('error', function (err) {console.log(err)})
console.log("HI");
    
    console.log('event-',event,'-event')
    // TODO implement
return 'Hello from Lambda!';
};


