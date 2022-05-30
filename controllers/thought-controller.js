const { User, Thought } = require('../models');

const thoughtCreate = async ({body}, res) => {
  try {
    const {thoughtText, username, userId} = body;

    if (thoughtText === "" || username === "") {
      res.status(400).json({message: "Missing thoughtText and/or username."})
      return;
    }

    const thoughtData = await Thought.create({
      thoughtText, 
      username
    })

    const {_id: thoughtId} = thoughtData;
    await User.findOneAndUpdate({"_id": userId}, {
      $push: { thoughts: thoughtId } 
    }, { 
      new: true
    })

    res.status(200).json({message: `Thought created.`})

   } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to create thought.`});
  }
}

const thoughtGetAll = async (req, res) => {
  try {
    const thoughtData = await Thought.find({})
    // console.log("thoughtData: ",thoughtData )
    res.status(200).json({data: thoughtData})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to get all thoughts.`});
  }
}

const thoughtGetById = async ({params}, res) => {
  try {
    const thoughtData = await Thought.findById({ _id: params.id })
    // console.log("thoughtData: ",thoughtData )
    res.status(200).json({data: thoughtData})
      
   } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to get by thought ID.`});
  }
}
module.exports = {thoughtCreate, thoughtGetAll, thoughtGetById};