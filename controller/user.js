import moment from 'moment/moment.js';
import {db} from '../connect.js';
import jwt from "jsonwebtoken"

export const getUser = (req, res) => {

    const userId = req.params.userId;
    const q = "SELECT * from users WHERE id = ? " ;
    
        
        db.query(q,[userId] ,(err, data) => {
            if(err){
                return res.status(500).json(err)
            }

            if (Array.isArray(data) && data.length > 0) {
                // Destructure the 'password' property from 'data[0]'
                const { password, ...info } = data[0];
    
                return res.status(200).json(info);
            } else {
                // Handle the case where data[0] is undefined
                return res.status(404).json({ message: "User not found" });
            }

            // const {password, ...info} = data[0];
            // console.log(data[0]);
            // return res.status(200).json(info)
        })
}