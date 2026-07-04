import { Router } from "express";
import { connectDb } from "../../config/db.js";
import User from "./model.js"
import bcrypt from "bcryptjs"

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();

router.get("/", async (req, res) => {
    connectDb()
    try {
        const userDoc = await User.find();
        res.status(200).json(userDoc)
    } catch (err) {
        res.status(500).json(err)
    }

})

router.post("/", async (req, res) => {
    connectDb()
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, bcryptSalt)

    try {
        const newUserDoc = await User.create({
            name,
            email,
            password: encryptedPassword
        });
        res.status(200).json(newUserDoc)
    } catch (err) {
        res.status(500).json(err)
    }

});

router.post("/login", async (req, res) => {
    connectDb();
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email })
        if (userDoc) {
            const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
            const { name, _id } = userDoc;
            passwordCorrect ? res.status(200).json({ _id, name, email }) : res.status(400).json("Senha inválida");
        } else {
            res.status(400).json("Usuário não encontrado. Tente Novamente !")
        }

    } catch (error) {
        res.status(500).json(error)
    }

})

export default router;