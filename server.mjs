//Imports
import express from "express";
import { error } from "./utilities/error.mjs";

import userRoutes from "./routes/userRoutes.mjs";
import projRoutes from "./routes/projRoutes.mjs";
import projCategoryRoutes from "./routes/projCategoryRoutes.mjs";

import bodyParser from "body-parser";



const app = express();
let PORT = 3000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//Routes
app.get('/',(req,res)=>{
    res.send('This is working');
})

app.use('/api/users',userRoutes);
app.use('/api/projects',projRoutes);
app.use('/api/projcategories',projCategoryRoutes);

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