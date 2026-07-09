import { Router } from "express";
import Booking from "./model.js"
import { connectDb } from "../../config/db.js";
import { JWTVerify } from '../../utils/jwt.js';

const router = Router();

router.post("/", async (req, res) => {
    connectDb();
    const {
        place,
        user,
        price,
        total,
        checkin,
        checkout,
        guests,
        nights } = req.body;

    try {
        const newBookingDoc = await Booking.create({
            place,
            user,
            price,
            total,
            checkin,
            checkout,
            guests,
            nights,
        })

        res.json(newBookingDoc);
    } catch (error) {
        console.error(error);
        res.status(500).json("Deu erro ao fazer/criar reserva");
    }
})

router.get("/owner", async (req, res) => {
    connectDb();

    try {
        const { _id: id } = await JWTVerify(req)

        try {
            const bookingDocs = await Booking.find({
                user: id
            }).populate('place')

            res.json(bookingDocs);
        } catch (error) {
            console.error(error);
            res.status(500).json("Não foi possível encontrar as reservas desse usuário.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Deu erro ao validar token do usuário para encontrar reservas.");
    }



})

export default router;