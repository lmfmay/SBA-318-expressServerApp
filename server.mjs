//Imports
import express from "express";
import { error } from "./utilities/error.mjs";

import userRoutes from "./routes/userRoutes.mjs";
import projRoutes from "./routes/projRoutes.mjs";
import projCategoryRoutes from "./routes/projCategoryRoutes.mjs";

import bodyParser from "body-parser";



const app = express();
let PORT = 3000;

//Static files to be used by template
app.use(express.static('./styles'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging middleware, custom middleware #1
app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

//Routes
app.get('/',(req,res)=>{
    res.render('userLogin');
    // res.json({
    //     links: [
    //         {
    //             href: "/api",
    //             rel: "api",
    //             type: "GET"
    //         }
    //     ]
    // }
    // );
})

app.get('/api',(req,res)=>{
    res.json({
        links: [
            {
                href: "/api/users",
                rel: "users",
                type: "GET"
            },
            {
                href: "/api/users",
                rel: "users",
                type: "POST"
            },
            {
                href: "/api/projects",
                rel: "projects",
                type: "GET"
            },
            {
                href: "/api/projects",
                rel: "projects",
                type: "PATCH"
            },
            {
                href: "/api/projects",
                rel: "projects",
                type: "DELETE"
            },
            {
                href: "/api/projcategories",
                rel: "projcategories",
                type: "GET"
            }
        ]
    }
    );
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