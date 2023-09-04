const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

      email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,

            //validator for email address
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Enter a correct valid email"
            },
            required: [true, "Email needed"]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

userSchema.virtual('friend_count').get(function () {
    return `friends: ${this.friends.length}`;
});

const User = model('User', userSchema);

module.exports = User;