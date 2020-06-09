const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noteSchema = new Schema(
  {
    text: String,
  },

  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
