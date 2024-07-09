import { NextFunction, Request, Response } from "express"
import Joi, { ObjectSchema } from "joi"
import { ITask } from "../model/Task"
import { title } from "process"

export function ValidateSchema (schema:ObjectSchema, property:string) {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            switch(property) {
                case "query":
                    await schema.validateAsync(req.query)
                    break
                case "params":
                    await schema.validateAsync(req.params)
                    break
                default:
                    await schema.validateAsync(req.body)
                    break
            }
            next()
        } catch (error:any) {
            return res.status(422).json({message: "Object validation failed please include a valid object"})
        }
    }
}

export const Schemas = {
    user:{
        get: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    task: {
        create: Joi.object<ITask>({
            title: Joi.string().required(),
            description: Joi.string().required(),
            labels: Joi.array(),
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })
    }
}