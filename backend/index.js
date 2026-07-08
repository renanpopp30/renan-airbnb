import "dotenv/config"
import { app } from "./server.js";

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Servidor Rodando na Porta ${PORT}`));