require('dotenv').config();
const amqp = require('amqplib');
const NotesService = require('./NotesService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const notesService = new NotesService();
  const mailSender = new MailSender();
  const listener = new Listener(notesService, mailSender);

  try {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    console.log(connection, '<====')
  
    // await channel.assertQueue('export:notes', {
    //   durable: true,
    // });
  
    // channel.consume('export:notes', listener.listen, { noAck: true });
    
  } catch (error) {
    console.log(error)
  }

};
init();