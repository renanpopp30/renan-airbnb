import "dotenv/config"
import mongoose from "mongoose";

const { MONGO_URL } = process.env;

export const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Conexão com o DB realizada");
    } catch (err) {
        console.log(`Não deu certo a coneção com o banco, erro: ${err.stack}`);
        
    }
}