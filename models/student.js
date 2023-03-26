const mongoose = require(`mongoose`);
var today = new Date();

const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const studentSchema = new Schema(
  {
    prettyId: {
      type: Number,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "student",
    },
    class: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
      name: {
        type: String,
      },
      prettyId: {
        type: Number,
      },
    },
    marks: [
      {
        examPrettyId: { type: Number },
        mark: { type: Number },
        fullMark: { type: Number },
        subject: { type: String },
        At: { type: Date },
      },
    ],
    birth: {
      day: {
        type: Number,
      },
      month: {
        type: Number,
      },
      year: {
        type: Number,
      },
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    place: {
      type: String,
    },
    accessToken: String,
    accessTokenExpiration: Date,
  },
  {
    timestamps: { currentTime: () => Date.now() + 10800000 },
  }
);
studentSchema.plugin(AutoIncrement, {
  id: "studentId",
  inc_field: "prettyId",
  start_seq: 1000,
  inc_amount: 1,
  disable_hooks: false,
});

module.exports = mongoose.model("Student", studentSchema);
