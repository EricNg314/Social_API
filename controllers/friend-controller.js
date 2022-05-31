const { User } = require('../models');

const friendCreate = async ({params}, res) => {
  try {
    const { userId, friendId } = params;

    await User.findOneAndUpdate({"_id": userId}, {
      $addToSet : { friends: friendId } 
    }, { 
      new: true
    })

    res.status(200).json({message: `Friend created.`})

  } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to create friend.`});
  }
}

const friendDeleteById = async ({ params }, res) => {
  try {
    const { userId, friendId } = params;

    const userData = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { runValidators: true, new: true })

    res.status(200).json({data: userData})

  } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to delete friend ID.`});
  }
}
module.exports = {friendCreate, friendDeleteById};
