const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
        return res.send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
        name,
        email,
        password: hashedPassword,
        });

        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
        return res.send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return res.send("Invalid credentials");
        }

        const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
        );

        res.cookie("token", token, {
        httpOnly: true,
        });

        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
    login,
};