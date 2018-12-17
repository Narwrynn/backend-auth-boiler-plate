const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    joined:{
        type: Date,
        default: Date.now
    }
});

//Hashing password
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        // let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    }catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        // let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return await bcrypt.compare(candidatePassword, this.password);
    }catch(err){
        return next(err);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;