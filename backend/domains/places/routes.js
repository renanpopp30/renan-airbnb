import { Router } from "express";
import Place from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";
import { connectDb } from "../../config/db.js";
import { downloadImage } from "../../utils/imageDownloader.js";
import { __dirname } from "../../server.js";

const router = Router();

router.post("/", async (req, res) => {
    connectDb();
    const {
        title,
        city,
        photos,
        description,
        extras,
        perks,
        price,
        checkin,
        checkout,
        guests,
    } = req.body;
    try {
        const { _id: owner } = await JWTVerify(req)
        const newPlaceDoc = await Place.create({
            owner,
            title,
            city,
            photos,
            description,
            extras,
            perks,
            price,
            checkin,
            checkout,
            guests
        });
        res.status(200).json(newPlaceDoc)
    } catch (error) {
        console.error(error);
        res.status(500).json("Deu erro ao criar o novo lugar", error);
    }
})

router.post('/upload/link', async (req, res) => {
    const { link } = req.body;

    try {
        
        const filename = await downloadImage(link, `${__dirname}/tmp/`);

        res.status(200).json(filename)
    } catch (error) {
        res.status(500).json("Deu na rota no erro no envio da imagem")
    }

})

export default router;