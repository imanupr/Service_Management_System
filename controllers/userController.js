const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const registerUser = async (req,res)=>{
   
    const {name,email,password,phone,role}= req.body
    try{
        const existingConsumer = await User.findOne({ role:"consumer" ,email });
        const existingProvider = await User.findOne({ role:"provider" ,email });
        if (existingConsumer){
         if (existingConsumer.role === "consumer" && role === "consumer") {
          
         return res.status(400).json({ message: "User already registered as Consumer" });
        }
    }
        if (existingProvider){
        if (existingProvider.role === "provider" && role === "provider"){
            return res.status(400).json({ message: "User already registered as Provider" });
        }
        }
    
        const salt=await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        //User creation
        const user= await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
            role,
        })
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(404).json({ message: "User not found" });
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
    );
    res.status(200).json({
    token,
    user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    },
    });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    }
module.exports= {registerUser,loginUser}