const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer')


exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const passCheck = await bcrypt.compare(password, user.password)

        if (user && passCheck) {
            const token = jwt.sign(
                { id: user.id, username: user.username, name: user.name, age: user.age },
                "jwtsecret",
                { expiresIn: "1h" },
            )
            user.token = token;
            user.password = undefined;

            //cookie section
            const options = {
                expires: new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000 //90 days
                ),
                httpOnly: true,
            };
            res.status(200).cookie("jwt", token, options).json({ msg: 'User Logged In Successfully', token, user });
        } else {
            res.status(201).json({ msg: "Invalid Creds" })
        }

    } catch (error) {
        console.log(error);
    }
};


exports.getUser = async (req, res, next) => {
    // console.log(req.user);
    let user
    if (req.user) {
        // console.log(req.user);
        user = await User.findOne({ username: req.user.username });
    }
    res.send(user);

};

exports.logout = async (req, res, next) => {
    res.clearCookie('jwt');
    res.json({ msg: "User Logged Out" });
};



exports.registerUser = async (req, res, next) => {


    const image = req.file.filename;

    try {
        const { name, username, password } = req.body;
        console.log(name)
        const hashedPassword = await bcrypt.hash(password, 10);

        // // const profileImageUrl = await uploadToCloudflareCDN(req.file); // Assuming req.file contains the image file


        // // Create a new user
        let usernameC = await User.findOne({ username: username })
        if (!usernameC) {
            const user = await User.create({
                name: name,
                username: username, // Assuming username is used as an email
                image: image,
                password: hashedPassword
            });

            const token = jwt.sign(
                { id: user.id, user },
                "jwtsecret",
                { expiresIn: "1h" },

            )
            // Save the new user to the database
            user.token = token;
            user.password = undefined;



            return res.status(200).json({ msg: 'User Added Successfully', user });
        }
        else {
            return res.status(202).json({ msg: " User Already Exist" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

