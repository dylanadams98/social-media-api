const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    ThoughtName: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    user: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
      toJSON: {
          virtuals: true,
          getters: true,
      },
      id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return `reactions: ${this.reactions.length}`;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;