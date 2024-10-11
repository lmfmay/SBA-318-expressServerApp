//Imports
import express from "express";
import { error } from "./utilities/error.mjs";

const app = express();
let PORT = 3000;

//Routes
app.get('/',(req,res)=>{
    res.send('This is working');
})

//Error Handling
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

app.use((err, req, res, next) => {//Err returned from previous error handling middleware
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

//Start server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`)
})