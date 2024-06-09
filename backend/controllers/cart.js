import { db } from "../db.js";

export const addtocart = (req,res) => {
    const q = "select * from personalcart where customerid = ? and productid = ?";
    db.query(q,[req.body.customerid,req.body.productid], (err,data) => {
        if(err) return res.json(err);
        if(data.length === 0) {
            const q1 = "insert into personalcart values (?,?,?)";
            db.query(q1,[req.body.customerid,req.body.productid,req.body.quantity], (err,data) => {
                if(err) return res.json(err);
                return res.status(201).json("Successfully add to cart");
            });
        }
        else {
            const q1 = "update personalcart set quantity = quantity + ? where customerid = ? and productid = ?";
            db.query(q1,[req.body.quantity,req.body.customerid,req.body.productid], (err,data) => {
                if(err) return res.json(err);
                return res.status(201).json("Successfully add to cart");
            });
        }
    });
} 

export const getCartDetails = (req,res) => {
    const q = "select products.productname,personalcart.productid,personalcart.quantity,products.unitprice,imgurl from personalcart,products,productimages\
                where personalcart.productid = products.productid and products.productid = productimages.productid and isthumbnail = 1 and customerid = ?";
    db.query(q,[req.body.customerid],(err,data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    });
}