const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
  const h=req.headers.authorization;
  if(!h) return res.status(401).json({error:'No token'});
  const token=h.split(' ')[1];
  jwt.verify(token,process.env.JWT_SECRET,(e,decoded)=>e?res.status(401).json({error:'Token inválido'}):((req.user=decoded),next()));
};