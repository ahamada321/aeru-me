const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    FBuserID: String,
    username: {
        type: String,
        max: [32, '32文字以下で入力してください'],
        min: [4, '4文字以上で入力してください'],
    },
    email: {
        type: String,
        max: [32, '32文字以下で入力してください'],
        min: [4, '4文字以上で入力してください'],
        unique: true,
        lowercase: true,
        required: 'Emailは必須です',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        max: [32, '32文字以下で入力してください'],
        min: [6, '6文字以上で入力してください'],
        required: 'パスワードは必須です',
    },
    description: String,
    rating: Number,

    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
    // favouriteRentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],

    isVerified: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false }, // If user missed password too much
    isBanned: { type: Boolean, default: false }, // If user was not appropriate for our service
    userRole:  { type: String, default: "User" }, // User, Teacher, Owner, Admin, SuperAdmin
    
    customer: { // Stripe
        id: { type: String, default: '' },
        default_source: { type: String, default: '' }
    }
})

userSchema.methods.hasSamePassword = function(requestPassword) {
    return bcrypt.compareSync(requestPassword, this.password)
}

userSchema.pre('save', function(next) {
    const user = this

    // Skip if user didn't update user password
    if(user.password){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

module.exports = mongoose.model('User', userSchema)
