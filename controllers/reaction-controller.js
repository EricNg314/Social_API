const { Thought } = require('../models');

const reactionCreate = async ({params, body}, res) => {
  try {
    const { thoughtId } = params;
    const { reactionBody, username } = body;

    if (reactionBody === "" || username === "") {
      res.status(400).json({message: "Missing reactionBody and/or username."})
      return;
    }

    await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $addToSet: { reactions: { reactionBody, username } } },
      { runValidators: true, new: true })

    res.status(200).json({message: `Reaction created.`})

  } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to create reaction.`});
  }
}

const reactionDeleteById = async ({ params, query }, res) => {
  try {
    const { thoughtId } = params;
    const { reactionId } = query;
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId: reactionId } } },
      { runValidators: true, new: true })

    res.status(200).json({data: thoughtData})

  } catch (error) {
    console.log(error);
    res.status(500).json({message: `Failed to delete reaction ID.`});
  }
}
module.exports = {reactionCreate, reactionDeleteById};
