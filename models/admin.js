const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const adminSchema = new Schema(
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
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
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
  },
  {
    timestamps: { currentTime: () => Date.now() + 10800000 },
  }
);
adminSchema.plugin(AutoIncrement, {
  id: "adminId",
  inc_field: "prettyId",
  start_seq: 1,
  inc_amount: 1,
  disable_hooks: false,
});

module.exports = mongoose.model("Admin", adminSchema);
