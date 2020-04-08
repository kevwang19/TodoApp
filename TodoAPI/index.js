const express = require('express');
const path = require("path");

const app = express();
const port = process.env.PORT || '8000';

app.get("/", (req,res)=>{
  res.status(200).send("Todo APIs")
})

app.get("/tasks", (req,res)=>{
  var data = [
    {
      'name' : 'Feed the dog',
      'status' : 'Incomplete',
      'time' : '10.5'
    },
    {
      'name' : 'Buy groceries',
      'status' : 'Incomplete',
      'time' : '11.5'
    },
    {
      'name' : 'Check mail',
      'status' : 'Incomplete',
      'time' : '13.5'
    },
  ]

  res.status(200).send(data)
})

app.listen(port, ()=>{
  console.log('Listening to requests on http://locoalhost:${port}')
})
