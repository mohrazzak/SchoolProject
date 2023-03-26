const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const classSchema = new Schema(
  {
    prettyId: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    students: [
      {
        name: {
          type: String,
        },
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
        prettyId: {
          type: Number,
        },
      },
    ],
    teachers: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Teacher",
        },
        name: {
          type: String,
        },
        prettyId: {
          type: Number,
        },
      },
    ],
    exams: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Exam",
        },
        prettyId: {
          type: Number,
        },
        subject: {
          type: String,
        },
        At: {
          type: Date,
        },
      },
    ],
    program: [
      [{ type: String }],
      [{ type: String }],
      [{ type: String }],
      [{ type: String }],
      [{ type: String }],
    ],
  },
  {
    timestamps: { currentTime: () => Date.now() + 10800000 },
  }
);

classSchema.plugin(AutoIncrement, {
  id: "classId",
  inc_field: "prettyId",
  start_seq: 10000,
  inc_amount: 1,
  disable_hooks: false,
});

module.exports = mongoose.model("Class", classSchema);
