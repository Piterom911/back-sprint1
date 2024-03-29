import express from 'express'
import {blogRouter} from "./routes/blog-router";
import {postRouter} from "./routes/post-router";
import morganBody from 'morgan-body';
import bodyParser from 'body-parser';
import {testsRouter} from "./routes/tests-router";
import {URI_PATHS} from "./models/common";

export const app = express()
morganBody(app)
app.use(bodyParser.json())

app.use(URI_PATHS.tests, testsRouter)
app.use(URI_PATHS.blogs, blogRouter)
app.use(URI_PATHS.posts, postRouter)
































