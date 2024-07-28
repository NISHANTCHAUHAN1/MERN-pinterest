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

// follow and Unfollow
export const followAndUnfollowUser = TryCatch(async(req, res) => {
    const user = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if(!user) return res.status(400).json({message: "No user with this id"});
    
    if(user._id.toString() === loggedInUser._id.toString())
        return res.status(400).json({message: "you can't follow yourself"});

    if(user.followers.includes(loggedInUser._id)) {     // agar hamnw user ko phle se follow kar rakha hai toh 
        const indexFollowing = loggedInUser.following.indexOf(user._id);
        const indexFollowers = user.followers.indexOf(loggedInUser._id);

        loggedInUser.following.splice(indexFollowing, 1)
        user.followers.splice(indexFollowers, 1);

        await loggedInUser.save();
        await user.save();
        res.json({message: "User Unfollowed"});
    }
    else {
        loggedInUser.following.push(user._id);
        user.followers.push(loggedInUser._id)

        await loggedInUser.save();
        await user.save();
        res.json({message: "User following"});
    }
});

// logout
export const logOutUser = TryCatch(async(req, res) => {
    res.cookie("token", "" , {maxAge: 0});
    res.json({message: 'logged Out successfuly'});
});