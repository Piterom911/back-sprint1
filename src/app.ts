import express, {Request, Response} from 'express'
import {videosRouter} from "./routes/videos-router";
import {db} from "./db/db";
import {blogsRouter} from "./routes/blogs-router";
export const app = express()

app.use(express.json())
app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos = []
    res.sendStatus(204)
})































