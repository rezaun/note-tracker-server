const express = require('express')
const app = express()
const port = 5000;

//kabir
//EQhyVdLq5Aefww9G



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kabir:EQhyVdLq5Aefww9G@cluster0.gecqrxn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        await client.connect();
        const collection = client.db("notesTaker").collection("notes");
        console.log("conenct to DB");
    }finally{

    }
    
}

run().catch(console.dir)
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("connect to db");
//   //client.close();
// });




app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })