import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.PLATEFORM);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Variables
const PORT = 5000;

// Prefix
const prefix = "/test";

const data = [];

// Initializing mysql/database

// const connection = mysql.createConnection({
//   host:
//   process.env.DB_HOST,
//   user: "root",
//   password: "724356",
//   database: "test",
// });

// Connect
// connection.connect();

// Initialize Pusher
import Pusher from "pusher";
const { APPID, KEY, SECRET } = process.env;
const pusher = new Pusher({
  appId: APPID,
  key: KEY,
  secret: SECRET,
});

setTimeout(() => {
  pusher
    .trigger("my-test-channel", "my-test-event", {
      _id: Date.now(),
      message: "Test Message",
    })
    .then(() => {
      console.log("Pusher Test Message Sent");
    });
}, 3000);

// connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
//     if (error) throw error;
//     console.log('mysql database Connected')
//   console.log("The solution is: ", results[0].solution);
// });

// Routes
app.get(`${prefix}`, (req, res) => {
  res.json({ message: "Server Running" });
});

app.get(`${prefix}/pusher`, (req, res) => {
  pusher.trigger("my-http-channel", "my-http-event", {
    _id: Date.now(),
    message: "Sent from HTTP Request",
  });

  res.json({ message: "Pusher Mesage sent" });
});

app.get(`${prefix}/crush`, (req, res) => {
  process.exit(1);
});

// Temp
app.get(`${prefix}/add`, (req, res) => {
  const todo = "test todo";
  const isCompleted = "false";

  // var sql = `INSERT INTO todos(todo, isCompleted) VALUES('${todo}',' ${isCompleted}')`;

  // connection.query(sql, (error, results) => {
  //   console.log(results);
  //   if (error) {
  //     return res.json({ message: "Not Added" });
  //   } else {
  //     return res.json({ message: "Added" });
  //   }
  // });
  data.push({ todo, isCompleted, _id: Date.now() });
  return res.json({ message: "added" });
});

// Add/Edit
app.post(`${prefix}/add`, (req, res) => {
  const { todo, isCompleted } = req.body;
  // var sql = `INSERT INTO todos(todo, isCompleted) VALUES('${todo}',' ${isCompleted}')`;

  // connection.query(sql, (error, results) => {
  //   console.log(results);
  //   if (error) {
  //     return res.json({ message: "Not Added" });
  //   } else {
  //     return res.json({ message: "Not Added" });
  //   }
  // });

  data.push({ todo, isCompleted, _id: Date.now() });
  return res.json({ message: "added" });
});

// List
app.get(`${prefix}/list`, (req, res) => {
  // connection.query("SELECT * FROM todos", (error, results) => {
  //   if (error) {
  //     return res.json([]);
  //   }
  //   return res.json(results);
  // });

  return res.json(data);
});

// Delete

// Listen
app.listen(PORT, () => console.log(`server Running on Port ${PORT}`));
