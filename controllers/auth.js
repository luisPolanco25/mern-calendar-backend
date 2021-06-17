const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJWT} = require('../helpers/jwt');

const createUser = async(req, res = express.response) => {

    const {email, password} = req.body;

    try {

        let user = await User.findOne({email});
        
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'An user is already logged with this email'
            });
        }
        
        user = new User(req.body);
    
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);        

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.name);


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please get in touch with the admin'
        });
    }

}

const loginUser = async(req, res = express.response) => {
    
    const {email, password} = req.body;

    try {
        
        let user = await User.findOne({email});
        
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'There\'s not a user registered with this email'
            });
        }

        // Compare passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is not valid'
            })
        }

        // Generate JWT
        const token = await generateJWT(user.id, user.name);
        
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please get in touch with the admin'
        });
    }
    
};

const renewToken = async(req, res = express.response) => {

    const {uid, name} = req;

    // Generate JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
};


module.exports = {createUser, loginUser, renewToken}