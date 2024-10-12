import express from "express";
import { projects } from "../data/projects.mjs";
import { error } from "../utilities/error.mjs";

let router = express.Router()

//@route: api/projects
//@desc: GET all projects
router.route('/')
.get((req,res)=>{
    const links = [
        {
            href: "/api/projects/:id",
            rel: "get project details",
            type: "GET"
        },
        {
            href: "/api/projects/:id",
            rel: "change project details",
            type: "PATCH"
        },
        {
            href: "/api/projects/:id",
            rel: "delete a project",
            type: "DELETE"
        }
      ];
    res.json({projects,links});
})

//@route: api/projects/:id
//@desc: GET project details/ PATCH project details / DELETE a project
router.route('/:id')
.get ((req,res,next) => {
    let proj = projects.find((proj)=>proj.id==req.params.id)
    if (proj){
        res.json(proj);
    } else {next(error(404,'Project does not exist'))}
})
.patch((req,res,next) => {
    let proj = projects.find((proj,index)=>{
        if(proj.id==req.params.id){
            for (const key in req.body) {
                projects[index][key] = req.body[key]; //update project object at index
            }
            return true;
        }
    })
    if (proj) {
        res.json(proj);
    } else {next(error(404,'Project does not exist'))}
})
.delete((req,res,next) => {
    let proj = projects.find((proj,index)=>{
        if(proj.id==req.params.id){
            projects.splice(index,1);
            return true;
        }
    })
    if (proj) {
        res.json(proj);
    } else {next(error(404,'Project does not exist'))}
});

export default router;