const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thought text is Required',
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: 'Username is Required'
    },
    reactions: [reactionSchema]
  }, {
    toJSON: {
      virtuals: true
    }
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
