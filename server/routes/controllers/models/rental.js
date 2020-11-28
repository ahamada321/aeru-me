const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },

  isBanned: Boolean,
  isApproved: Boolean,
  isShared: Boolean,

  rating: Number,

  lineURL: String,
  email: {
    type: String,
    max: [32, "32文字以下で入力してください"],
    min: [4, "4文字以上で入力してください"],
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  facebook: String,
  instagram: String,
  twitter: String,
  youtube: String,
  videoLink: String,

  birthday: Date,
  rentalname: {
    type: String,
    required: true,
    max: [128, "商品名は最大128文字までです"],
  },
  province: { type: Object, required: "都道府県を設定してください" },
  address: String,
  nearStation: { type: String, required: "活動最寄駅を入力してください" },
  // hourlyPrice: { type: Number, required: "時給を設定してください" },
  hourlyPrice: { type: Number, default: 5000 },

  selectedCategory: Object,
  cardDescription: { type: String, required: true },
  description: { type: String, required: true },

  course1Img: String,
  course1Title: { type: String, required: true },
  course1Description: { type: String, required: true },
  course2Title: String,
  course2Img: String,
  course2Description: String,

  image: { type: String, required: "プロフィール写真を設定してください" },
  gallery1: String,
  gallery2: String,
  gallery3: String,
  gallery4: String,
  gallery5: String,
  gallery6: String,
  gallery7: String,
  gallery8: String,

  // Wanna be more simlpify menu below
  businesshour_enabled_sun: { type: Boolean, default: true },
  businesshour_startTime_sun: {
    hour: { type: Number, default: 10 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_endTime_sun: {
    hour: { type: Number, default: 19 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_enabled_mon: { type: Boolean, default: true },
  businesshour_startTime_mon: {
    hour: { type: Number, default: 10 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_endTime_mon: {
    hour: { type: Number, default: 19 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_enabled_tue: { type: Boolean, default: true },
  businesshour_startTime_tue: {
    hour: { type: Number, default: 10 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_endTime_tue: {
    hour: { type: Number, default: 19 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_enabled_wed: { type: Boolean, default: true },
  businesshour_startTime_wed: {
    hour: { type: Number, default: 10 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_endTime_wed: {
    hour: { type: Number, default: 19 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_enabled_thu: { type: Boolean, default: true },
  businesshour_startTime_thu: {
    hour: { type: Number, default: 10 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_endTime_thu: {
    hour: { type: Number, default: 19 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_enabled_fri: { type: Boolean, default: true },
  businesshour_startTime_fri: {
    hour: { type: Number, default: 10 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_endTime_fri: {
    hour: { type: Number, default: 19 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_enabled_sat: { type: Boolean, default: true },
  businesshour_startTime_sat: {
    hour: { type: Number, default: 10 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },
  businesshour_endTime_sat: {
    hour: { type: Number, default: 19 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
  },

  user: { type: Schema.Types.ObjectId, ref: "User" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  favouritesFrom: [{ type: Schema.Types.ObjectId, ref: "User" }],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

module.exports = mongoose.model("Rental", rentalSchema);
