const express=require('express')
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Technology route is displaying data")
})
module.exports=router;
