import moment from 'moment/moment.js';
import {db} from '../connect.js';
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json("user not logged in");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err){
            return res.status(403).json("token is expired");
        }

        const q = `SELECT p.*, u.id AS userId, name, profilePic  FROM posts AS p JOIN users AS u ON ( u.id = p.userId) 
        Left JOIN relationships AS r ON (p.userId = r.followedUserId ) where r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC ` ;
    
        db.query(q,[userInfo.id, userInfo.id] ,(err, data) => {
            if(err){
                return res.status(500).json(err)
            }
    
            return res.status(200).json(data)
        })
    })


}


export const addPost = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json("user not logged in");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err){
            return res.status(403).json("token is expired");
        }

        const q = "INSERT INTO posts (`description`, `img`, `userId`, `createdAt`) VALUES (?)";
        const values  = [req.body.description, req.body.img, userInfo.id, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')];
        
        db.query(q,[values] ,(err, data) => {
            if(err){
                return res.status(500).json(err)
            }
    
            return res.status(200).json("Post created successfully")
        })
    })


}