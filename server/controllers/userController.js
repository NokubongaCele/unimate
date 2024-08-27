const User = require('./../models/userModel')

exports.createProfile = async (req, res) =>{
    const {email, name, age, residence, course, level, interests, goals, role} = req.body

    try{
        let user = await User.findOne({email})

        if(!user){
            return(
                res.status(404).json({
                    status:'fail',
                    message:'user not found'
                })
            )
        }
    
        if(!user.isVerified){
            return(
                res.status(400).json({
                    status:'fail',
                    message:'Email not verified, please verify your email'
                })
            )
        }
        
        user.name = name
        user.age = age
        user.residence = residence
        user.courseOfStudy = course
        user.levelOfStudy = level
        user.interests = interests
        user.relationshipGoals = goals
        user.role = role
        user.profileCompleted = true

        await user.save()
        
        res.status(200).json({
            status:'success',
            message: 'profile created '
        })

    }catch(err){
        return(
            res.status(500).json({
                status:'fail',
                message:'Server error'
            })
        )
    }
}
