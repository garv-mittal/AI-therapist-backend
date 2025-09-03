import express from "express";
import { Request,Response } from "express";

const app = express()
app.use(express.json());

const PORT =3000;

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
    console.log("server is running on the Port: ", PORT);
});