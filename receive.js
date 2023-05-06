#!/usr/bin/env node


var ampq = require('amqplib/callback_api');
ampq.connect('amqp://rabbitmq:5672', function (err, connection) {
    if (err) {
        throw err;
    }
    connection.createChannel(function (err1, channel) {
        if (err1) {
            throw err1;
        }
        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        })

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C.", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: false
        });
    })
});