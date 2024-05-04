const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0/contact_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connection to db'));

db.once('open', function (){
    console.log('Successfully connected to the database');
});
