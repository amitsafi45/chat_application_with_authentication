import controller from "../controller/controller.js";
import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
const urlencoded=bodyParser.urlencoded({extended:false})
  router.post('/log',urlencoded,(req,res)=>{
    controller.login(req.body).then((response)=>{
      res.cookie('token',response.token).send(response.message)
    })
})
router.post('/registration',urlencoded,(req,res)=>{
   controller.insert(req.body).then((response)=>{
    res.send(response)
   })
})
export default router;
