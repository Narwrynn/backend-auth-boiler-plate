const db = require('../models');
const jwt = require('jsonwebtoken');


exports.signin = async function(req, res, next){
    try{
        //Find user
        let user = await db.User.findOne({ 
            email: req.body.email
        });
        //Destructure found user into user
        let { id, username } = user;
        //Check if password matches
        let isMatch = await user.comparePassword(req.body.password);
        //Sign a token and return the signed in user with it
        if(isMatch){
            let token = jwt.sign({
              id,
              username, 
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                token
            });
        //If Password doesn't match
        }else{
            return next({
                status: 400,
                message: "Invalid login"
            });
        }
    //Any other errors along the way   
    }catch(err){
        return next({
            status: 400,
            message: "Invalid login"
        });
    }
};

exports.signup = async function(req, res, next){
    try{
        //Create a user
        let user = await db.User.create(req.body);
        let {id, username} = user;
        //Sign a token
        let token = jwt.sign({
            id,
            username
            }, process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            token
        });
    }catch(err){
        //If username or email is taken
        if(err.code === 11000){
            err.message = "Sorry email or username is taken";
        }
        //All other errors
        return next({
            status: 400,
            message: err.message
        });
    }
};