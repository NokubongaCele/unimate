const User = require('./../models/userModel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const path = require('path');
const fs = require('fs');


dotenv.config({path: './../config/config.env'})


exports.createProfile = async (req, res) => {
  const { email, name, age, residence, course, level, interests, goals, role, bio } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email not verified, please verify your email',
      });
    }

    let profilePicture = null;
    if (req.file) {
      const uploadDir = path.join(__dirname, '../uploads/profile-pictures'); 


      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${user._id}_${Date.now()}${path.extname(req.file.originalname)}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, req.file.buffer);

      profilePicture = `/uploads/profile-pictures/${fileName}`;
    }

    user.name = name;
    user.age = age;
    user.residence = residence;
    user.courseOfStudy = course;
    user.levelOfStudy = level;
    user.interests = interests;
    user.relationshipGoals = goals;
    user.role = role;
    user.bio = bio;
    user.profilePicture = profilePicture; // Save the file path
    user.profileCompleted = true;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Profile created successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'fail',
      message: 'Server error',
    });
  }
};


exports.signUp = async (req, res) =>{
    const {email, password, confirmPassword} = req.body

    if(password !== confirmPassword){
        return(
            res.status(400).json({
                status: 'fail',
                message: 'Passwords do not match'
            })
        )
    }
    try{
        let user = await User.findOne({email})
        if(user){
            return(
                res.status(400).json({
                    status: 'fail',
                    message: 'User already exists'
                })
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
            lowerCaseAlphabets: false,
        })  

        console.log(otp)

        user = new User({
            email,
            password: hashedPassword,
            otp: otp,
            expiresAt: Date.now()+10*60*1000 //10 minutes

        })
    
        await user.save()
    
        const sender = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
    
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: user.email,
            subject: 'Unimate OTP',
            text: `Your OTP is ${otp}`
        }
    
        sender.sendMail(mailOptions)

        res.status(200).json({
            status:'success',
            message: `An OTP has been sent to ${user.email}, please verify your email with the provided OTP`
        })  

    }catch(err){
        console.log(err.message)
    }    
}

exports.verifyOtp = async (req, res) =>{
    const {email, otp} = req.body
    
    try{
        const user = await User.findOne({email})
        if(!user){
            return(
                res.status(400).json({
                status: 'Fail',
                message: 'User not found'
            })
            )
        }
        console.log(`system otp ${user.otp}`)

        if(parseInt(user.otp) !== parseInt(otp)){

            console.log(`user otp ${otp}: system otp ${user.otp}`)
            return(
                res.status(400).json({
                    status: 'Fail',
                    message: 'Invalid or Expired OTP'
                })
            )
        }

        user.otp = null;
        user.expiresAt = null;
        user.isVerified = true;
        await user.save()

        res.status(200).json({
            status: 'success',
            message: 'Email verified, please create your profile'
        })

    }catch(err){
        console.log(err.message)

        res.status(500).json({
            status:'fail',
            message: 'Server Error'
        })
    }
}

exports.signIn = async (req, res)=>{
    const {email, password} = req.body
    
    try{

        const user = await User.findOne({email})

        if(user.isVerified === false){
            console.log('not verified')
            return res.status(400).json({
                status: 'Fail',
                message: 'User not verified'
            })
        }
        if(user.profileCompleted === false){
            return res.status(400).json({
                status: 'Fail',
                message: 'User profile not completed'
            })
        }

        if(!user){
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password'
            })
        }

        const payload = {
            id: user._id,
            email: user.email,
            age:user.age,
          }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'})
        
        res.status(200).json({
            status: 'success',
            token,
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            status: 'fail',
            message: 'Server error'
        })
    }
}