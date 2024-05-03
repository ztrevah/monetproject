import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// Check registered email
export const register_step1 = (req,res) => {
    // check existing user
    const q = "select * from accounts where email = ?";
    db.query(q,[req.body.email,req.body.accountType], (err,data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        // var salt = bcrypt.genSaltSync(10);
        // var hash = bcrypt.hashSync("12345",salt);
        
        // const q1 = "insert into accounts (email,type,password,firstname,phone) values (?) ";
        // const values =[req.body.email,req.body.accountType,hash,"Chien","0943394091"]
        // db.query(q1,[values],(err,data) => {
        //     if(err) return res.json(err);
        //     return res.status(200).json("Verification code created and sent");
        // })
    })
}
// Check verification code & insert new account
export const register_step2 = (req,res) => {
    // check existing user
    const q = "select * from accounts where email = ?";
    db.query(q,[req.body.email], (err,data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");
        
        // hash the password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password,salt);
    });
};

export const login = (req,res) => {
    const q = "select * from accounts where email = ?";
    db.query(q,[req.body.email], (err,data) => {
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Wrong username or pasword!");

        const isPasswordCorrect =  bcrypt.compareSync(req.body.password,data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or pasword!");

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({email: data[0].email,accountType: data[0].type},jwtSecretKey);
        const {password, address, phone, ...other} = data[0];

        res.cookie("access_token",token, {
            httpOnly: true,secure: true
        });
        res.status(200).json(other);
    })
}

export const logout = (req,res) => {
    res.clearCookie("access_token",{
        secure:true
    }).status(200).json("User has been logged out.")
}
