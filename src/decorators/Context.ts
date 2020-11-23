import { Request, Response } from "express";

export type ContextType = { req: Request; res: Response };

/**
 * @Context {req,res} : ContextType
 */

export const Context: ParameterDecorator = () => {};
