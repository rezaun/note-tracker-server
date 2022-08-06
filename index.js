const express = require('express')
const app = express()
const port = 5000;
const cors = require("cors");

//kabir
//EQhyVdLq5Aefww9G

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://kabir:EQhyVdLq5Aefww9G@cluster0.gecqrxn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        await client.connect();
        const notesCollection = client.db("notesTaker").collection("notes");
        

        //Get api to read all notes
        //localhost:5000/notes

        app.get('/notes', async(req,res) =>{

            const q = req.query;
            console.log(q);

            const cursor = notesCollection.find({});
            const result = await cursor.toArray();

            res.send(result);
        })


        //create NotesTaker
        //localhost:5000/note
        app.post('/note', async(req,res)=>{
            const data = req.body;
            console.log(data);

            const result = await notesCollection.insertOne(data);
            res.send(result);
        })

        //update NotesTaker
        //http://localhost:5000/note/62eec158a23a038ee2ce4621
        app.put('/note/:id', async(req, res) =>{
            const id = req.params.id;
            const data = req.body;
            console.log("from update api", data);
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
       

        const updateDoc = {
            $set: {
              userName:data.userName,
              textData:data.textData,
            },
          };
          const result = await notesCollection.updateOne(filter, updateDoc, options);
          res.send(result);
        });

        //Delete Note
        //http://localhost:5000/note/62eec158a23a038ee2ce4621
        app.delete('/note/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };

            const result = await notesCollection.deleteOne(filter);

            res.send(result);
        })
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