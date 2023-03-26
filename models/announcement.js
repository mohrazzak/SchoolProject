const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const announcementSchema = new Schema(
  {
    prettyId: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    content: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg",
      required: true,
    },
  },
  {
    timestamps: { currentTime: () => Date.now() + 10800000 },
  }
);

announcementSchema.plugin(AutoIncrement, {
  id: "announcementId",
  inc_field: "prettyId",
  start_seq: 10000,
  inc_amount: 1,
  disable_hooks: false,
});

module.exports = mongoose.model("announcement", announcementSchema);
