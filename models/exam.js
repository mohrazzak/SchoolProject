const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const examSchema = new Schema(
  {
    prettyId: {
      type: Number,
    },
    subject: {
      type: String,
      required: true,
    },
    fullMark: {
      type: String,
      required: true,
    },
    At: { type: Date },
    classes: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
        prettyId: {
          type: Number,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: { currentTime: () => Date.now() + 10800000 },
  }
);

examSchema.plugin(AutoIncrement, {
  id: "examId",
  inc_field: "prettyId",
  start_seq: 1,
  inc_amount: 1,
  disable_hooks: false,
});

module.exports = mongoose.model("Exam", examSchema);
