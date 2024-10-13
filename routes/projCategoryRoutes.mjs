import express from "express";
import { categories } from "../data/projcategories.mjs";
import { projects } from "../data/projects.mjs";
import { error } from "../utilities/error.mjs";

let router = express.Router()

router.get('/',(req,res)=>{
    res.json({categories});
})

export default router;