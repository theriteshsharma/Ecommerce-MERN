const jwt = require('jsonwebtoken')

exports.requiresignin = (req,res,next)=>{

    if(req.headers.authorization){
    const token = req.headers.authorization;
    const user = jwt.decode(token,process.env.JWT_SECRET);
    req.user = user;
    next();
    }
    else
    return res.status(203).json({messgae:"Authorization Required"})
    
}
exports.userMiddleware = (req,res,next) => {
    if(req.user && req.user.role === 'user'){
        next();
    }
    else return res.status(400).json({
        message: "Access Denied"
    })
}

exports.adminMiddleware = (req,res,next) =>{
  
    if(req.user && req.user.role === 'admin'){
        next();
    }
    else 
    {return res.status(400).json({
        message: "Access Denied"
    })
    }

}