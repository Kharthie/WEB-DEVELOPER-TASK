const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const { json } = require("express/lib/response");
const mongoClient = mongodb.MongoClient;
const URL = "mongodb+srv://user1:12345@cluster0.c6r2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


let userlist = [];
app.use(express.json());
app.use(cors({
  origin : "http://localhost:3000"
}))


app.post("/createStudent",async function(req,res){

 try {
     //connect DB
     let connection = await mongoClient.connect(URL);
     //select DB
     let db = connection.db("database1");
     //select collection
     //do operation
     await db.collection("collection1").insertOne(req.body)
     //close connection
     connection.close();
   
      res.json({message : "student Added"})

 } catch (error) {
  res.json({message:"something wrong"})
  console.log(error);
}

})

app.post("/createMentor",async function(req,res){

  try {
      let connection = await mongoClient.connect(URL);
      let db = connection.db("database1");
      await db.collection("collection1").insertOne(req.body)
      connection.close();
    
       res.json({message : "Mentor Added"})
 
  } catch (error) {
    res.json({message:"something wrong"})
   console.log(error);
 }
 
 })
 
 

 app.get('/mentor', async function (req, res) {
  try {
      let connection = await mongoClient.connect(URL)
      let db = connection.db("database1")
      let users = await db.collection("collection1").find({}).toArray();
      await connection.close();
      res.json(users)

  } catch (error) {
    res.json({message:"something wrong"})
      console.log(error)
  }
})

app.get('/student', async function (req, res) {
  try {
      let connection = await mongoClient.connect(URL)
      let db = connection.db("database1")
      let users = await db.collection("collection1").find({}).toArray();
      await connection.close();
      res.json(users)

  } catch (error) {
    res.json({message:"something wrong"})
      console.log(error)
  }
})



app.post("/assignMentor",async function(req,res){
  try {
      let connection = await mongoClient.connect(URL);
      let db = connection.db("database1");
      let users = await db.collection("collection1").findOne({email:req.body.email})
      if(users){
          await db.collection("collection1").findOneAndUpdate({email:req.body.email},{$set:req.body})
          connection.close();
          res.json({message:" Updated "})
      }else{
          res.json({message:" Incorrect"})
      }
  } catch (error) {
      res.json({message:"something wrong"})
  }
}) 


app.get("/particularMentor",async function(req,res){
  try {
      let connection = await mongoClient.connect(URL);
      let db = connection.db("database1");
     let user = await db.collection("collection1").find({mentor:req.body.mentor}).toArray();
      if(user.length!==0){
          res.json(user)
      }else{
          res.json("No mentors")
      }
             connection.close();
     
  } catch (error) {
    res.json({message:"something wrong"})
      console.log(error)
  }
})

app.listen(process.env.PORT || 3000);

