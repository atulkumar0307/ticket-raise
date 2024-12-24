import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists!" });
        }

        let uniqueId;
        let uniqueIdExists = true;
        while (uniqueIdExists) {
            uniqueId = Math.floor(Math.random() * 100000000);
            const existingUser = await User.findOne({ uniqueId });
            if (!existingUser) {
                uniqueIdExists = false;
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            uniqueId,
        });

        // const token = jwt.sign(
        //     { id: createUser._id, email: createUser.email, uniqueId: createUser.uniqueId },
        //     process.env.JWT_SECRET_KEY,
        //     { expiresIn: "1h" }
        // );

        return res.status(201).json({
            fullName: createUser.fullName,
            email: createUser.email,
            uniqueId: createUser.uniqueId,
            // token,
            message: "User created successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error while creating User" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, uniqueId, password } = req.body;

        let user;
        if (email) {
            user = await User.findOne({ email });
        } else if (uniqueId) {
            user = await User.findOne({ uniqueId });
        }

        if (!user) {
            return res.status(400).json({ message: "Email or UniqueId not found!" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, uniqueId: user.uniqueId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "User logged in successfully",
            token,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error!" });
    }
};
