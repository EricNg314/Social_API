const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'reaction text is Required',
      minLength: 1,
      maxLength: 280
    },
    username: {
      type: String,
      required: 'Username is Required'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: createdAtVal => dateFormat(createdAtVal)
    }
  }
);

module.exports = reactionSchema;
