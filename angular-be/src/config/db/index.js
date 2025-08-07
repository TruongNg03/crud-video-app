const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/angular-be');
    console.log('Success to connect db!');
  } catch (e) {
    console.log('Failure to connect db!');
  }
}

module.exports = { connect };
