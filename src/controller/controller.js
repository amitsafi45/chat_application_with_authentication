import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class controller {
  static insert = async (data) => {
    try {
   //      console.log('i am here')
      const userData = JSON.parse(JSON.stringify(data));
     // console.log(userData)
      const salt = await bcrypt.genSalt(15);
      const hashPassword = await bcrypt.hash(userData.password, salt);
      const Register={
        UserName: userData.UserName,
        emailAddress:userData.emailAddress,
        password: hashPassword
        }
       // console.log(Register)
          await db.schema.create(Register)
        return ({
        sucess:true,
        status:200,
        message:'user are register'
      })
    } catch (err) {
       return ({
         sucess:false,
         status:500,
          message:'user are not register',
          detail:err
       })
      
    }
  };
  static login = async (data) => {
    try {
      const userData=JSON.parse(JSON.stringify(data));
      //console.log(userData)
      const userValidation = await db.schema.findOne({where:{emailAddress:userData.emailAddress},raw:true});
     // console.log(userValidation)
      if (!userValidation) return ({sucess:false,message:'email is not valid',status:500})
      const passValidation = await bcrypt.compare(
        userData.password,
        userValidation.password
      );
      if (!passValidation) return ({sucess:false,message:'password is not valid',status:500})
      
      const accessToken = await jwt.sign(
        { password: userValidation.password },
        process.env.accessToken,
        {
          expiresIn: "1h",
        }
      );
      // console.log('token genrated')
      // console.log(accessToken)
     //return  cookie('token',accessToken).json({sucess:true,status:200,message:'user loged in',token:accessToken})
     return ({sucess:true,status:200,message:'user loged in',token:accessToken})
   
    // res.cookie('token',accessToken).send(accessToken)
     }
   catch (error) {
    //console.log(error);
     return ({
       sucess:false,
       status:500,
       message:'token is not generated'
     })
       }
  }
  
}
export default controller;
