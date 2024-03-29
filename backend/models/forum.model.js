const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forumSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
