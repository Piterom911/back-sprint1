import {Router, Request, Response} from "express";
import {PostsRepository} from "../repositories/posts-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {HTTP_REQUEST_STATUS} from "../models/common";

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = PostsRepository.getAllEntities()
    res.send(posts)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) res.send(HTTP_REQUEST_STATUS.BAD_REQUEST)

    const targetPost = PostsRepository.getEntityById(id)
    if (!targetPost) res.send(HTTP_REQUEST_STATUS.NOT_FOUND)

    res.send(targetPost)
})
postsRouter.post('/', authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const postId = await PostsRepository.postNewEntity(req.body)
    if (!postId) {
        res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }
    const createdPost = await PostsRepository.getEntityById(postId)
    if (!createdPost) {
        res.sendStatus(HTTP_REQUEST_STATUS.NOT_FOUND)
    }
    res.status(HTTP_REQUEST_STATUS.CREATED).send(createdPost)
})
postsRouter.put('/:id', authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) {
        res.send(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsRepository.updateEntity(id, req.body)
    if (!targetPost) {
        res.send(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_REQUEST_STATUS.NO_CONTENT)
})
postsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) {
        res.send(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsRepository.deleteEntity(id)
    if (!targetPost) {
        res.send(HTTP_REQUEST_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_REQUEST_STATUS.NO_CONTENT)
})















