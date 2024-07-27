import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";

// register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email })
        if(user) return res.status(400).json({message: "Already have an account with this email"});

        const hashPassword = await bcrypt.hash(password, 10)

        // update user
        user = await User.create({
            name, email, password: hashPassword,
        });
        generateToken(user._id, res);
        
        res.status(201).json({user, message: "User Registered"})
    } catch (error) {
        res.status(500).json({message: "Invaild server error"})
    }
}

// login
export const loginUser = TryCatch(async(req,res)=> {
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({message: "No user with this email"});

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) return res.status(400).json({message: "Wrong Password"});

    generateToken(user._id, res);

    res.status(200).json({user, message: "Login Succesfully"});
})

// my profile
export const myProfile = TryCatch(async(req, res) => {
    const user = await User.findById(req.user._id);   // this id pass with the help off isAuth middlewear 
    res.json(user);
})

// user profile
export const userProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
});