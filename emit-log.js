#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq', function (err, conn) {
    if (err) {
        throw err;
    }
    conn.createChannel(function (err1, ch) {
        if (err1) {
            throw err1;
        }
        var exchange = 'logs';
        var msg = process.argv.slice(2).join(' ') || 'Hello World';

        ch.assertExchange(exchange, 'fanout', {
            durable: false
        });
        //Test here chi dinh ten
        ch.publish(exchange, '123', Buffer.from(msg));
        console.log(' [x] Sent %s', msg);
    });

    setTimeout(function () {
        conn.close();
        process.exit(0);
    }, 500);
});