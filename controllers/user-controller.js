
const { User } = require('../models');

const userCreate = async ({body}, res) => {
  try {
    const {username, email} = body;
    if (username === "" || email === "") {
      res.status(400).json({message: "Missing username and/or email."})
      return;
    }
    const userData = await User.create({
      username, 
      email
    })
    // console.log("userData: ",userData )
    res.status(200).json({message: `User ${userData.username} created.`})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to create user.`});
  }
}

const userGetAll = async (req, res) => {
  try {
    const userData = await User.find({})
    // console.log("userData: ",userData )
    res.status(200).json({data: userData})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to get all users.`});
  }
}

const userGetById = async ({params}, res) => {
  try {
    const userData = await User.findById({ _id: params.id })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    // console.log("userData: ",userData )
    res.status(200).json({data: userData})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to get by user ID.`});
  }
}

const userUpdateById = async ({params, body}, res) => {
  try {
    const userData = await User.findByIdAndUpdate({ _id: params.id }, body, {new: true})

    res.status(200).json({data: userData})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to update by user ID.`});
  }
}

const userDeleteById = async ({params, body}, res) => {
  try {
    const userData = await User.findOneAndDelete({ _id: params.id })

    res.status(200).json({data: userData})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to delete by user ID.`});
  }
}

module.exports = {userCreate, userGetAll, userGetById, userUpdateById, userDeleteById};