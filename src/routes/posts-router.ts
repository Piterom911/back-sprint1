import {Router, Request, Response} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {HTTP_STATUS} from "../models/common";
import {mongoIdParamValidation} from "../validators/id-param-validation";
import {PostsService} from "../domain/post-service";
export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const posts = await PostsService.getAllEntities()
    res.send(posts)
})
postsRouter.get('/:id', mongoIdParamValidation(), async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsService.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.getEntityById(id)
    if (!targetPost) res.send(HTTP_STATUS.NOT_FOUND)

    res.send(targetPost)
})
postsRouter.post('/', authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const postId = await PostsService.postNewEntity(req.body)
    if (!postId) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }
    const createdPost = await PostsService.getEntityById(postId)
    if (!createdPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
    }
    res.status(HTTP_STATUS.CREATED).send(createdPost)
})
postsRouter.put('/:id', mongoIdParamValidation(), authMiddleware, postValidation(), async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsService.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.updateEntity(id, req.body)
    if (!targetPost) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
})
postsRouter.delete('/:id', mongoIdParamValidation(), authMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id

    const isExistedPost = await PostsService.getEntityById(id)
    if (!isExistedPost) {
        res.sendStatus(HTTP_STATUS.NOT_FOUND)
        return
    }

    const targetPost = await PostsService.deleteEntity(id)
    if (!targetPost) {
        res.send(HTTP_STATUS.NOT_FOUND)
        return
    }

    res.send(HTTP_STATUS.NO_CONTENT)
})















