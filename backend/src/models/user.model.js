const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (value) {
          const emailRegex = /\S+@\S+\.\S+/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    likedMovies: {
      type: [Number],
      default: [],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
