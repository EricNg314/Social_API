
const res = require('express/lib/response');
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
    res.status(500).json({message: `Failed to create user.`});
  }
}
module.exports = {userCreate, userGetAll};