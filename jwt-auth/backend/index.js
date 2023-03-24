import express from "express"; 
import cors from 'cors';
import bodyParser from "body-parser";

import Conncetion  from "./database/db.js";
import route from './routes/routes.js';


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", route);



const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`Your server is runing on ${PORT}`);
  Conncetion();

});
