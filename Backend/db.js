const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://admin:admin@cluster0.de8kiy2.mongodb.net/?retryWrites=true&w=majority'
const connectToDB = async () => {
    try {
      await mongoose.connect(mongoURI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
      console.log('📦 connected to mongoDB');
    } catch (err) {
      console.error('❌ error connecting to mongoDB:', err.message);
    }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
}

module.exports = {
    connectToDB, isConnected
}