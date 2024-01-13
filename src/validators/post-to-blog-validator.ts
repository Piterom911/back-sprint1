import {body} from "express-validator";
import {inputValidation} from "../input-model-validation/input-validation";

export const shortDescriptionValidation = body('shortDescription')
    .isString()
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage('Incorrect shortDescription')

export const titleValidation = body('title')
    .isString()
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage('Incorrect Title')

export const contentValidation = body('content')
    .isString()
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage('Incorrect content')


export const postToBlogValidation = () =>
    [titleValidation, shortDescriptionValidation, contentValidation, inputValidation]


















