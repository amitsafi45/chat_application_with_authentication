import Jwt from "jsonwebtoken";
export default async (req, res, next) => {
  try {
    //console.log('i am in verification')
   const accessToken=req.cookies.token
  //  console.log(accessToken)
  //  console.log('verfication section')
  //  console.log(accessToken)
    if (!accessToken) return res.status(500).json({sucess:false,message:"You are not loged in"});
    const veriyfied = await Jwt.verify(
      accessToken,
      process.env.accessToken
    );
    if(veriyfied) next();
    
  } 
  catch (err) {
    return res.status(500).json({sucess:false,message:"token are expired",detail:err});
  }
};
