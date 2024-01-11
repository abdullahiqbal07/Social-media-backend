import { db } from "../connect.js";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";


export const register = (req, res) => {
    // user is present or not

    const q =  "SELECT * FROM users where username = ?";
    db.query(q,[req.body.username], (err, data) => {
        if(err) {
            return res.status(500).json(err);
        }
        if(data.length){
            return res.status(409).json("User already exists");
        }

        // hash password for encryption purposes

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // insert users into the database
        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";

        const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
        db.query(q, [values], (err, data)=>{
            if(err) {
                return res.status(500).json(err);
            }
            else{
                return res.status(200).json("User has been created");
            }
        })
    })
}

export const login = (req, res) => {
    const q =  "SELECT * FROM users where username = ?";

    db.query(q, [req.body.username], (err, data)=> {
        if(err) {
            return res.status(500).json(err);
        }
        if(data.length === 0){
            return res.status(409).json("User not exists");
        }

        const checkPassword = bcrypt.compareSync(req.body.password , data[0].password);
        if(!checkPassword){
            res.status(400).json("password is incorrect");
        }

        const token = jwt.sign({ id: data[0].id}, "secretkey");

        const { password, ...other} = data[0];

        res.cookie("accessToken", token, {
            httpOnly : true,
        }).status(200).json(other);

    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken",{
        secure : true,
        sameSite : "none",
    }).status(200).json("logged out");
}


