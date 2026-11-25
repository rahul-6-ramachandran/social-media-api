import express from 'express'
import db from './database/connection.js';

const router = express.Router();


// {
//   "message": "success",
//   "data": [
//     {
//       "id": 1,
//       "title": "My First Post",
//       "image": "post1.jpg",
//       "description": "Exploring the backwaters",
//       "user": "Rahul",
//       "likes": 2,
//       "comments": 3
//     }
//   ]
// }

router.get('/posts', (req, res, next)=>{
    db.all('SELECT p.id, p.title, p.description, p.image, u.name AS user , COUNT (DISTINCT l.id) AS likes, COUNT (DISTINCT c.id) AS comments FROM post p INNER JOIN user u ON p.user_id = u.id LEFT JOIN "like" l ON l.post_id = p.id LEFT JOIN "comment" c ON c.post_id = p.id GROUP BY p.id', [], (err,row)=>{
        if(err){
            next({message : 200, error : err})
        }
        return res.status(200).json({
            message: "success",
            data : row
        })
    })
})


// {
//   "message": "success",
//   "data": {
//     "id": 1,
//     "title": "My First Post",
//     "image": "post1.jpg",
//     "description": "Exploring the backwaters",
//     "user": "Rahul",
//     "createdAt": "2026-11-25 10:00:00",
//     "likes": 2,
//     "comments": [
//       {
//         "comment": "Great post!",
//         "name": "Alex"
//       },
//       {
//         "comment": "Beautiful experience",
//         "name": "Sam"
//       }
//     ]
//   }
// }


router.get('/posts/:id', (req, res, next)=>{
    const id  = req.params.id
    let posts = {};
    db.get('SELECT p.id, p.title, p.description, p.image, u.name AS user , COUNT (DISTINCT l.id) AS likes FROM post p INNER JOIN user u ON p.user_id = u.id LEFT JOIN "like" l ON l.post_id = p.id  where p.id = ?', [id], (err,row)=>{
        if(err){
            next({message : 200, error : err})
        }
        posts = {
            ...row
        }
    })
    db.all('SELECT c.content, u.name AS name FROM comment c LEFT JOIN user u ON c.user_id = u.id WHERE c.post_id = ?', [id], (err,row)=>{
        if(err){
            next({message : 200 , error : err})
            console.log(err)
        }
            console.log(posts)
        posts = {
            ...posts,
            comments : [
                ...row
            ]
        }
          return res.status(200).json({
        message: "success",
        data : posts
    })
    })

  
})



export default router