const User = require("../model/usermodel");
const bcrypt = require("bcryptjs");
const Customer = require("../model/customermodel");
//register customer
exports.registerCustomer = async(req,res)=>{
    const session = await User.startSession();
    /*transaction for(registering a user and creating a customer profile, 
    if one succeed and one failed we are left with nothing saved)*/
    session.startTransaction();
    try{
        const {name, email,contact,password,address,gender,userType} = req.body;
        //validation for empty fields
        if(!name  || !email || !contact|| !password|| !address|| !gender|| !userType){
            return res.status(400).json({message:"Above all fields are mandatory"});
        }
        //check for existing user
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(409).json({message:"User Already exists"});
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt); 
        
        //create user
        const user = await User.create([{name, email, password:hashedPassword, userType}],{session});
        //extract id of newly created user
        const userId = user[0]._id;
        //create customer with reference to userID
        const customer = await Customer.create([{name,email,contact,address,gender,userId}],{session});
        //commit transaction
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({message:"customer registered ",user: user[0],customer: customer[0]})
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({error:error.message});
    }
};