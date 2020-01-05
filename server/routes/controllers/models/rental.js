const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rentalSchema = new Schema({
    lastLogin: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    shared: { type: Boolean, default: true },

    lineworksURL: String,
    email: String,
    rating: Number,

    province: { type: String, required: true },
    nearStation: { type: String, required: true },
    hourlyPrice: Number,

    selectedCategory: Object,
    rentalname: { type: String, required: true, max: [128, 'Too long, max is 128 characters.']},
    cardDescription: { type: String, required: true },
    description: { type: String, required: true },
    course60img: String,
    course90img: String,
    course60Description: { type: String, required: true },
    course90Description: String,

    image1: { type: String, required: true },
    garally1: String,
    garally2: String,
    garally3: String,
    garally4: String,
    garally5: String,
    youtubeLink: String,

    businesshour_enabled_sun: { type: Boolean, default: true },
    businesshour_startTime_sun: { hour: {type: Number, default: 10}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_endTime_sun: { hour: {type: Number, default: 19}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_enabled_mon: { type: Boolean, default: true },
    businesshour_startTime_mon: { hour: {type: Number, default: 10}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_endTime_mon: { hour: {type: Number, default: 19}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_enabled_tue: { type: Boolean, default: true },
    businesshour_startTime_tue: { hour: {type: Number, default: 10}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_endTime_tue: { hour: {type: Number, default: 19}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_enabled_wed: { type: Boolean, default: true },
    businesshour_startTime_wed: { hour: {type: Number, default: 10}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_endTime_wed: { hour: {type: Number, default: 19}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_enabled_thu: { type: Boolean, default: true },
    businesshour_startTime_thu: { hour: {type: Number, default: 10}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_endTime_thu: { hour: {type: Number, default: 19}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_enabled_fri: { type: Boolean, default: true },
    businesshour_startTime_fri: { hour: {type: Number, default: 10}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_endTime_fri: { hour: {type: Number, default: 19}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_enabled_sat: { type: Boolean, default: true },
    businesshour_startTime_sat: { hour: {type: Number, default: 10}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },
    businesshour_endTime_sat: { hour: {type: Number, default: 19}, minute: {type: Number, default: 0}, second: {type: Number, default: 0} },

    user: { type: Schema.Types.ObjectId, ref: "User" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    favouritesFrom: [{ type: Schema.Types.ObjectId, ref: "User" }],
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking"}]
});

module.exports = mongoose.model('Rental', rentalSchema);
