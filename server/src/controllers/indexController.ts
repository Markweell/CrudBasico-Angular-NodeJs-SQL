import {Request,Response} from 'express';
class IndexController{
    index (req: Request, res: Response) {
        res.json({tex: 'API is api/games'})
    }
}
export const indexController = new IndexController();