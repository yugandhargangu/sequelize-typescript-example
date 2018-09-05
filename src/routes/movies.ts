import { Request, Response, NextFunction } from 'express';
import { Movie } from '../models/Movie';

export async function createMovie(req: Request, res: Response, next: NextFunction) {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (e) {
    next(e);
  }
}

export async function findAllMovies(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await Movie.scope(req.query['scope']).findAll());
  } catch (e) {
    next(e);
  }
}

export async function getMovieById(req: Request, res: Response, next: NextFunction) {
  try {
    const movie = await Movie.scope(req.query['scope']).findById(req.params['id']);
    res.json(movie);
  } catch (e) {
    next(e);
  }
}

export async function putMovieById(req: Request, res: Response, next: NextFunction) {
  try {
    await Movie.update<Movie>(req.body, { where: { id: req.params['id'] } });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
