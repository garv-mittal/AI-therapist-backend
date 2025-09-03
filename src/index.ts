import express from "express";
import { Request, Response } from "express";
import { serve } from "inngest/express"
import { inngest } from "./inngest";
import {functions as inngestFunctions} from "./inngest/function"
import { logger } from "./utils/logger";
import connectDB from "./utils/db";

const app = express()


app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions:inngestFunctions }));


const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            logger.info(
                `Inngest endpoint available at http://localhost:${PORT}/api/inngest`
            );
        });
    } catch (error) {
        logger.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();