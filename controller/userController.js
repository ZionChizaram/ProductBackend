const bcrypt = require ("bcrypt");
const User = require("../module/userModule.js");


const registerUser = async (req, res) => {
    try {
        let { phoneNumber, email, password , UserName } = req.body;

        // validate required fields
    if (
        ! phoneNumber ||
        ! email ||
        ! password ||
        ! UserName 

    )
    {
        return res
           . status (400)
           . json ({ message : "ALL FIELDS REQUIRED"});
   
       }
       
    // try {
    //     let { name, email, UserName, password, phoneNumber, sex, maritalStatus} = req.body;

    //     // validate required fields
    // if (
    //     !name ||
    //     ! email ||
    //     ! UserName ||
    //     ! password ||
    //     ! phoneNumber ||
    //     ! sex ||
    //     ! maritalStatus 

    // {
    //  return res
    //     . status (400)
    //     . json ({ message : "ALL FIELDS REQUIRED"});

    // }  

    // check if user  exist
    const existingUser = await User.findOne({email});
    if (existingUser){
        return
        res.status(400).json({message:"Email already exists"});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(password,salt);

    // save user in database
    const newUser = new User({
        // name,
        // email,
        // UserName,
        // password : hashedPassword,
        // phoneNumber,
        // sex,
        // maritalStatus,

        
        phoneNumber,
        email,
        password : hashedPassword,
        UserName
        
    });

    // Register user in database
    const registeredUser = await newUser.save();
    res.status (201).json(registeredUser);
}

    catch (error) {
        console.error("registration Error", error);

        // handle duplicate key errors
    if (error.code === 11000) {
        return res.status(400).json({
            message : "Duplicate value",
            field : Object.keys(error.keyValue),
        
        });
    }
    res
        .status(500)
        .json ({message: "Error registering user", err: error.message});
        
    
    }
}


// login user

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!email || !password){
            return res.status(400).json({message: "user not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status (400).json({message : "invalid password"})
        }
        res.status(200).json(user);


        // if (!email || !password) {
        //     return res
        //     .status(400)
        //     .json ({message: "email and password are required " });
                
        // }

        // find the user by username
    //     const user = await user.findOne({email});
    //     if (!user) {
    //         return res.status(404).json({message: "username not found"});
    //     }
    //     console.log (user);

    //     // compare password

    //     const isMatch = await bcrypt.compare(email, user.password);
    //     if (!isMatch) {
    //         return res.status(400).json({ message: "invalid password"});
    //     }
    //     // const re= await newUser.save();
    //     if (isMatch) {
    //     // const registeredUser = await newUser.save(); 
       
    //     return res.status(200).json(user);
    //     }
    // } 
    //  catch (error) {
    //     res.status(500).json({ message: "error logging in ", error});
    // }



} catch (error) {
    res.status(500).json({ message: "error logging in ", error})
}
};


    //update User

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        //find user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({message:"User Not Found"});
        }

        // find user fields

        const updateData = req.body;

        // only hash password if its being updated
        if (updateData.password){
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password,salt);
        }

        // update user in the database
        const updatedUser = await User.findByIdAndUpdate(id, updateData,{
            new: true, // return the updated document
            runValidators: true, // enforce validators rule
        });

        res
          .status(200)
          .json({message: "User updated successfullly", updateData});
    } catch (error) {
        console.error("error updating user", error);
        res
          . status (500)
          . json ({ message : "error updating user", error: error.message});

        }
};

let deleteUser = async (req,res) =>{
    try {

        const {id} = req.params
        // check if user exists
        const user = await User.findById(id);
        if (!user){
            return res.status (400).json({message:"user not found"});
        }
        // delete user
        await user.deleteOne();
        res.status(200).json({message:"user deleted successfully"});
    } catch (error) {
        res
        . status (500)
        . json ({ message : "error updating user", error: error.message});

        
    }

    
};



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
    
}