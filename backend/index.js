import express from "express";
import dotenv from "dotenv"

dotenv.config();
console.log(process.env.PLATEFORM);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }))

// Variables
const PORT = 5454;

// Prefix
const prefix = '/test'

const data = [];


// Initialize Pusher
import Pusher from "pusher"
const { APPID,KEY, SECRET} = process.env;
const pusher = new Pusher({
  appId: APPID,
  key: KEY,
  secret: SECRET,
});


setTimeout(() => {
  pusher.trigger('my-test-channel', 'my-test-event', {
    _id: Date.now(),
    message:"Test Message"
  }).then(() => {
    console.log('Pusher Test Message Sent')
  })
}, 3000);



// Routes
app.get(`${prefix}`, (req, res) => {
    res.json({ message:"Server Running" })
})


app.get(`${prefix}/pusher`, (req, res) => {

  pusher.trigger("my-http-channel", "my-http-event", {
    _id: Date.now(),
    message: "Sent from HTTP Request",
  });

  res.json({ message: "Pusher Mesage sent" });
});


app.get(`${prefix}/crush`, (req, res) => {
  process.exit(1)
});


// Temp
app.get(`${prefix}/add`, (req, res) => {
  const todo = "test todo";
  const isCompleted = "false";

  data.push({ todo, isCompleted , _id:Date.now()});
  return res.json({message:'added' })
});


// Add/Edit
app.post(`${prefix}/add`, (req, res) => {
  const { todo, isCompleted } = req.body;


    data.push({ todo, isCompleted , _id:Date.now()});
    return res.json({ message: "added" });
});

// List
app.get(`${prefix}/list`, (req, res) => {

  
    return res.json(data);
});


// Listen
app.listen(PORT, () => console.log(`server Running on Port ${PORT}`));