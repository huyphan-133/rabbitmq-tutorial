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
        var queue = 'task_queue';

        // This makes sure the queue is declared before attempting to consume from it
        channel.assertQueue(queue, {
            durable: true
        })

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C.", queue);
        channel.consume(
            queue,
            function (msg) {
                var secs = msg.content.toString().split('.').length - 1;


                console.log(" [x] Received %s", msg.content.toString());
                setTimeout(function () {
                    console.log(" [x] Done");
                }, secs * 1000);
            },
            {
                noAck: false
            });
    })
});