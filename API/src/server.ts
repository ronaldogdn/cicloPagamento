//requer o servidor express
import express from "express";
import cors from "cors";
import { router }from "./config/routes";
import { mongoose } from "./config/database";

const app = express();
//modelagem do db
const database = mongoose;
//cors
app.use(cors());
//recebe o json do http; body-parse
app.use(express.json());
app.use(router);

//function para escutar a aplicação
app.listen(3000,function(){
    console.log("o servidor está rodando...");
});










