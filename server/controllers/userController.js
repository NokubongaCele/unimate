const mongoose = require('mongoose');
const User = require('./../models/userModel')
const Date = require('./../models/DateModel')
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');

exports.userProfileInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    if (user.profilePicture && typeof user.profilePicture === 'string') {
      const relativeProfilePicturePath = user.profilePicture.replace(/^\/+/, '');
      const profilePicturePath = path.join(__dirname, '..', relativeProfilePicturePath);
      if (fs.existsSync(profilePicturePath)) {
        const profilePictureUrl = `${req.protocol}://${req.get('host')}/${relativeProfilePicturePath}`;
        user.profilePicture = profilePictureUrl; 
      } else {
        console.log('Profile picture file does not exist.');
        user.profilePicture = null; 
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Server Error',
    });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findByIdAndDelete(userId); 

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    res.status(204).json({ 
      status: 'success',
      message: 'User profile deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Server Error',
    });
  }
};

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.residence = req.body.residence || user.residence;
    user.bio = req.body.bio || user.bio;
    user.courseOfStudy = req.body.courseOfStudy || user.courseOfStudy;
    user.levelOfStudy = req.body.levelOfStudy || user.levelOfStudy;
    user.interests = req.body.interests || user.interests;
    user.relationshipGoals = req.body.relationshipGoals || user.relationshipGoals;
    //user.profilePicture = req.body.profilePicture || user.profilePicture;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      age: updatedUser.age,
      residence: updatedUser.residence,
      courseOfStudy: updatedUser.courseOfStudy,
      levelOfStudy: updatedUser.levelOfStudy,
      interests: updatedUser.interests,
      relationshipGoals: updatedUser.relationshipGoals,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}); 

exports.createDate = async (req, res) => {

  try{

    const {title, description, age, residence, courses, level, interests, goal} = req.body
    const newDate = new Date({
      title,
      description,
      age,
      residence,
      courses,
      level,
      interests,
      goal,
      createdBy: req.user._id,
      hasCreatedDate:true
    })

    await newDate.save()

    res.status(201).json({
      status: 'success',
      message: 'Date created successfully',
      date:newDate
    })


  }catch(err){
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message:'Failed to create date'
    })
  }

}

exports.dateInfo = async (req, res) => {
  try {
    const date = await Date.findOne({ createdBy: req.user.id })
      .populate({
        path: 'applicants.user', 
        select: 'name email interests age relationshipGoals courseOfStudy residence bio' 
      });

    if (!date) {
      return res.status(404).json({ status: 'fail', message: 'No date found for the user.' });
    }

    const applicantCount = date.applicants.length;

    res.status(200).json({
      status: 'success',
      data: {
        date,
        applicantCount,
      },
    });
  } catch (error) {
    console.error('Error fetching date info:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
}

exports.getAllDates = async (req, res) => {
  try {
    const userId = req.user._id;

    const dates = await Date.find();

    const datesWithLikeStatus = dates.map((date) => {
      const isLiked = date.likes.includes(userId); 
      return {
        ...date.toObject(), 
        isLiked, 
      };
    });

    res.status(200).json({
      status: 'success',
      data: {
        dates: datesWithLikeStatus,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dates',
    });
  }
};

exports.getDateById = async (req, res) => {
  try {
    const date = await Date.findById(req.params.id);
    if (!date) {
      return res.status(404).json({
        status: 'fail',
        message: 'Date not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        date,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
    });
  }
};

exports.applyForDate = async (req, res) => {
  try {
    
    const dateId = req.params
    const userId = req.user.id;  
    const objectId = new mongoose.Types.ObjectId(dateId);

    console.log('dateId:', objectId); 
    console.log('userId:', userId); 

   
    const date = await Date.findById(objectId);
    if (!date) {
      return res.status(404).json({
        status: 'fail',
        message: 'Date not found',
      });
    }

    const alreadyApplied = date.applicants.some(applicant => applicant.user.toString() === userId);
    if (alreadyApplied) {
      return res.status(400).json({
        status: 'fail',
        message: 'You have already applied for this date',
      });
    }

   
    date.applicants.push({ user: userId, status: 'inprogress' });

  
    await date.save();

    res.status(200).json({
      status: 'success',
      message: 'Application successful!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Server Error',
    });
  }
};

exports.viewAppliedDates = async (req, res) => {
  try {
    const userId = req.user.id;

    const appliedDates = await Date.find({ 'applicants.user': userId }).populate('createdBy', 'name');

    if (!appliedDates || appliedDates.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No applied dates found',
      });
    }

    const datesWithStatus = appliedDates.map(date => {
      const applicantInfo = date.applicants.find(applicant => String(applicant.user) === String(userId));
      return {
        dateId: date._id,
        title: date.title,
        description: date.description,
        status: applicantInfo ? applicantInfo.status : 'unknown', // Applicant's status
        interviewDate: applicantInfo?.interview?.interviewdate || null, // interview date
        interviewLink: applicantInfo?.interview?.link || null, // interview link
        createdBy: date.createdBy.name,
        level: date.level,
        courses: date.courses,
        res: date.residence,
        goal: date.goal,
      };
    });

    res.status(200).json({
      status: 'success',
      data: datesWithStatus,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'fail',
      message: 'Server Error',
    });
  }
};

exports.rejectApplicant = async (req, res) => {
  try {
    const { dateId, applicantId } = req.params;

    const date = await Date.findById(dateId);

    if (!date) {
      return res.status(404).json({ status: 'fail', message: 'Date not found' });
    }

    const applicant = date.applicants.id(applicantId);

    if (!applicant) {
      return res.status(404).json({ status: 'fail', message: 'Applicant not found' });
    }

    applicant.status = 'rejected';
    await date.save();

    res.status(200).json({
      status: 'success',
      message: 'Applicant status updated to rejected',
    });
  } catch (error) {
    console.error('Error updating applicant status:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.scheduleInterview = async (req, res) => {
  try {
    const { dateId, applicantId } = req.params;
    const { interviewDate, interviewLink } = req.body;

    const date = await Date.findById(dateId);
    
    if (!date) {
      return res.status(404).json({
        status: 'fail',
        message: 'Date not found'
      });
    }

    const applicant = date.applicants.find(
      (applicant) => applicant._id.toString() === applicantId
    );

    if (!applicant) {
      return res.status(404).json({
        status: 'fail',
        message: 'Applicant not found'
      });
    }

    applicant.status = 'interview scheduled';
    applicant.interview.interviewdate = interviewDate;
    applicant.interview.link = interviewLink;

    await date.save();

    return res.status(200).json({
      status: 'success',
      message: 'Interview scheduled successfully',
      date,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'fail',
      message: 'An error occurred while scheduling the interview',
    });
  }
};
exports.deleteDate = async (req, res) => {
  const { id } = req.params; 

  try {
 
    const date = await Date.findByIdAndDelete(id);

    if (!date) {
      return res.status(404).json({ message: 'Date not found' });
    }

    res.status(200).json({ message: 'Date deleted successfully' });
  } catch (error) {
    console.error('Error deleting date:', error);
    res.status(500).json({ message: 'Server error, unable to delete date' });
  }
};

exports.acceptApplicant = async (req, res) => {
  try {
    const { dateId, applicantId } = req.params;

    const date = await Date.findById(dateId);

    if (!date) {
      return res.status(404).json({ status: 'fail', message: 'Date not found' });
    }

    const applicant = date.applicants.id(applicantId);

    if (!applicant) {
      return res.status(404).json({ status: 'fail', message: 'Applicant not found' });
    }

    applicant.status = 'accepted';
    await date.save();

    res.status(200).json({
      status: 'success',
      message: 'Applicant status updated to accepted',
    });
  } catch (error) {
    console.error('Error updating applicant status:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.toggleLike = async (req, res) => {
  const { id } = req.params; 
  const userId = req.user._id; 
console.log(id, userId)
  try {
    const date = await Date.findById(id);

    if (!date) {
      return res.status(404).json({ message: 'Date not found' });
    }

    const isLiked = date.likes.includes(userId);

    if (isLiked) {
      
      date.likes = date.likes.filter((likeId) => likeId.toString() !== userId.toString());
    } else {
      
      date.likes.push(userId);
    }
    console.log("liked")
    await date.save();

    return res.status(200).json({ success: true, likes: date.likes.length, isLiked: !isLiked });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


