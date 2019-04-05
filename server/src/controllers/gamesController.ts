import { Request, Response } from "express";
import pool from "../database";
class GamesController {

  public async list(req: Request, res: Response): Promise<void>{
    const games = await pool.query('SELECT * FROM games')
    res.json({games})
  }
  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const game = await pool.query('SELECT * FROM games where id = ?',[id])
    if(game.length >0){
      return res.json(game[0]);
    }
    res.status(404).json({text: "The game doesn't exists"})
  }
  public async create(req: Request, res: Response): Promise<void>{
    await pool.query('INSERT INTO games set ?', [req.body])
    res.json({menssage: 'Game Saved'})
  }
  public async delete(req: Request, res: Response): Promise<void>{
    const { id } = req.params
    await pool.query('DELETE FROM games WHERE id= ?', [id])
    res.json({menssage: 'The game was deleted'})
  }
  public async update(req:Request, res:Response): Promise<void>{
    const { id } = req.params
    await pool.query('UPDATE games set ? WHERE id = ?', [req.body,id])
    res.json({text: 'The game was updated'})
  }
}
export const gamesController = new GamesController();
