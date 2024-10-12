import express from "express";
import { users } from "../data/users.mjs";
import { error } from "../utilities/error.mjs";
import { projects } from "../data/projects.mjs";

let router = express.Router()

//@route: api/users
//@desc: GET all users / POST new user
router.route('/')
.get((req,res)=>{
    const links = [
        {
          href: "/api/users/:userId",
          rel: ":userId",
          type: "GET"
        }
      ];
    res.json({users,links});
})
.post((req,res,next)=>{
    if (req.body.username && req.body.email){ //if userfields complete
        if (users.find((user) => user.email == req.body.email)){ //if user exists
            next(error(409, 'User email already exists'));
        } else {
            let user = {
                userId: users[users.length - 1].userId + 1,
                username: req.body.username,
                email: req.body.email,
            };
            users.push(user);
            res.json(users);
        }
    } else {next(error(400,'Insufficient Data'))} //if userfields incomplete
})

//@route: api/users/:userId
//@desc: GET one user / PATCH details for one user / DELETE user
router.route('/:userId')
.get ((req,res,next) => {
    let user = users.find((user)=>user.userId==req.params.userId)
    const links = [
        {
            href: `/api/users/${req.params.userId}`,
            rel: "update user details",
            type: "PATCH"
        },
        {
            href: `/api/users/${req.params.userId}`,
            rel: "delete user",
            type: "DELETE"
        },
        {
            href: `/api/users/${req.params.userId}/projects`,
            rel: "user projects",
            type: "GET"
        },
        {
            href: `/api/users/${req.params.userId}/projects`,
            rel: "create user projects",
            type: "POST"
        }
    ]
    if (user){
        res.json({user,links});
    } else {next(error(404,'User does not exist'))}
})
.patch((req,res,next) => {
    let user = users.find((user,index)=>{
        if(user.userId==req.params.userId){
            for (const key in req.body) {
                users[index][key] = req.body[key]; //update user object at index
            }
            return true;
        }
    })
    if (user) {
        res.json(user);
    } else {next(error(404,'User does not exist'))}
})
.delete((req,res,next) => {
    let user = users.find((user,index)=>{
        if(user.userId==req.params.userId){
            users.splice(index,1);
            return true;
        }
    })
    if (user) {
        res.json(user);
    } else {next(error(404,'User does not exist'))}
});

//@route: api/users/:userId/projects
//@desc: GET projects by one user / POST project for one user 
router.route('/:userId/projects')
.get ((req,res,next) => {
    let userProjs = [];
    if (!users.find((user)=>user.userId==req.params.userId)){
        return next(error(404,'User does not exist'));
    }
    projects.forEach(proj => {
        if (proj.userId == req.params.userId){
            userProjs.push(proj);
        }
    });
    if (userProjs.length > 0){
        res.json(userProjs);
    } else {next(error(404,'User does not have any projects'))}
})
.post((req,res,next)=>{
    if (req.body.title && req.body.description && req.body.category){ //if projfields complete
        let proj = {
            id: projects[projects.length - 1].id + 1,
            userId: req.params.userId,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        };
        projects.push(proj);
        res.json(proj);
    } else {next(error(400,'Insufficient Data'))} //if projfields incomplete
    })

export default router;