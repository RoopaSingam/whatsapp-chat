const express = require("express");
const mongoose = require("mongoose");
const { default: dbMessages } = require("./dbMessages");
const app = express();
const port = process.env.PORT || 9000
const cors = require("cors");
const Pusher = require('pusher');

const db= mongoose.connection;
db.once("open",()=>{
    console.log("db connected");

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()
    
    changeStream.on('change',(change)=>{
        console.log(change);
      
        if(change.operationType == 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name: messageDetails.user,
                message:messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        }else{
             console.log("error triggered pusher")
        }



    })


});
const pusher = new Pusher({
    appId: '1070336',
    key: '85fb9b5d3a247b908e71',
    secret: '8a6c6527b7b9708d949f',
    cluster: 'ap2',
    encrypted: true
  });
  
app.use(express.json());
app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader("Access-control-Allow-Origin","+");
//     res.setHeader("Access-Control-Allow-Header","+");
//     next();
// })
const url = 'mongodb+srv://roopa:tsNThGjqrHHUK3FY@cluster0.z2ck7.mongodb.net/whatsappdb?retryWrites=true&w=majority';

// import Messages from "./dbMessages";
const Messages = require('./dbMessages');
mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}) ;




app.get("/",(req,res)=> res.status(200).send('hello world'))

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(data)
        }else{
            res.status(200).send(data)
        }
    })
})



app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.send(201).send(data)
        }
    })
})




app.listen(port, ()=>console.log(`listening on localhost${port}`))