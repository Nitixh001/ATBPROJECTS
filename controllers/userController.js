const User = require("../model/usermodel");
//add user
exports.addUser = async(req,res)=>{
    try{
    const {name,email,password,userType} = req.body;
    const user = new User({name, email, password, userType});
    await user.save();
    res.status(201).json({message:"User Created Successfully--",User});
}catch(error){
res.status(409).json({error:error.message});
}
};