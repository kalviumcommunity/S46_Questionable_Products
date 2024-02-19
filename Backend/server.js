const express = require('express');
const {connectToDB, isConnected } = require('./db');
const routes = require('./routes')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/',routes);



app.get('/status', (req, res) => {
  res.json({
    message: 'This my asap project on Questionable Products ',
    database: isConnected() ? 'connected' : 'disconnected'
  })
  
})

app.listen(port, async () => {
  await connectToDB()
  console.log(`Example app listening on port ${port}`)
})
