const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const teacherSchema = new Schema(
  {
    prettyId: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "teacher",
    },
    classes: [
      {
        name: {
          type: String,
        },
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Class",
        },
        prettyId: {
          type: Number,
        },
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
teacherSchema.plugin(AutoIncrement, {
  id: "teacherId",
  inc_field: "prettyId",
  start_seq: 100,
  inc_amount: 1,
  disable_hooks: false,
});

module.exports = mongoose.model("Teacher", teacherSchema);
