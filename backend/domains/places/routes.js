import { Router } from "express";
import Place from "./model.js"
import { JWTVerify } from "../../utils/jwt.js";
import { connectDb } from "../../config/db.js";
import { sendToS3, downloadImage, uploadImage } from "./controller.js";

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
        const { filename, fullPatch, mimeType } = await downloadImage(link);

        const fileURL = await sendToS3(filename, fullPatch, mimeType);

        res.status(200).json(fileURL)
    } catch (error) {
        res.status(500).json("Deu na rota no erro no envio da imagem")
    }

});

router.post('/upload', uploadImage().array('files', 10), async (req, res) => {
    const { files } = req;

    const filesPromise = new Promise((resolve, reject) => {
        const fileURLArray = []

        files.forEach(async (file, index) => {
            const { filename, path, mimetype } = file;
            try {
                const fileURL = await sendToS3(filename, path, mimetype);

                fileURLArray.push(fileURL)
                
            } catch (error) {
                console.error("Deu algum erro ao subir upload para o S3 ", error)
                reject(error);
            }


        })

        const idInterval = setInterval(() => {
            if (files.length === fileURLArray.length) {
                clearInterval(idInterval)
                resolve(fileURLArray)
            }

        }, 100);

    });

    const fileURLArrayResolved = await filesPromise;

    res.json(fileURLArrayResolved);
});

export default router;

// {
//   fieldname: 'files',
//   originalname: 'WhatsApp Image 2026-03-10 at 10.27.57.jpeg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   path: 'E:\\Área de Trabalho\\Renan-Airbnb\\backend\\tmp\\1783515907729-638334301.jpg',
//   destination: 'E:\\Área de Trabalho\\Renan-Airbnb\\backend/tmp/',
//   filename: '1783515907729-638334301.jpg',
//   size: 34621
// }