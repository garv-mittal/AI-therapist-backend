import express from "express";
import { Request, Response } from "express";
import { serve } from "inngest/express"
import { inngest } from "./inngest/client";
import {functions as inngestFunctions} from "./inngest/function"
import { logger } from "./utils/logger";
import connectDB from "./utils/db";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes"
import chatRouter from "./routes/chat.route";
import moodRouter from "./routes/mood.route";
import activityRouter from "./routes/activity.route";
import { errorHandler } from "./middlewares/errorHandler";

//.env configuration
dotenv.config()
const app = express()

// console.log(`mongodb uri is: ${process.env.MONGODB_URI}`)

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());                      //set some security headers, use for security
app.use(morgan("dev"));                 //for logging http requests in console (maintaining activity logs)

app.use("/api/inngest", 
    serve({ client: inngest, functions:inngestFunctions })
);


//routes    
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/api/mood", moodRouter);
app.use("/api/activity", activityRouter);


//error handling
app.use(errorHandler)


const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3001;
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