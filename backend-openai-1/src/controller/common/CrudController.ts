import { Request, Response } from 'express';

export interface ICrudController {
    getAll?(req: Request, res: Response): Promise<any>;
    getById?(req: Request, res: Response): Promise<any>;
    create?(req: Request, res: Response): Promise<any>;
    update?(req: Request, res: Response): Promise<any>;
    delete?(req: Request, res: Response): Promise<any>;
}