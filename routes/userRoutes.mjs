import express from "express";
import { users } from "../data/users.mjs";
import { error } from "../utilities/error.mjs";

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
        },
        {
          href: "/api/users/:userId",
          rel: ":userId",
          type: "POST"
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

export default router;