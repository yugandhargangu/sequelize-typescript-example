import {Request, Response, NextFunction} from 'express';
import {Actor} from '../models/Actor';
import {MovieActor} from '../models/MovieActor';

export async function createActor(req: Request, res: Response, next: NextFunction) {
  try {
    const actor = await Actor.create(req.body);
    res.status(201).json(actor);
  } catch (e) {
    next(e);
  }
}

export async function assignMovieToActor(req: Request, res: Response, next: NextFunction) {
  try {
    await MovieActor.create({
      actorId: req.params['id'], movieId: req.params['movieId']
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

export async function findAllActors(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await Actor.scope(req.query['scope']).findAll());
  } catch (e) {
    next(e);
  }
}

export async function getActorById(req: Request, res: Response, next: NextFunction) {
  try {
    const actor = await Actor.scope(req.query['scope']).findById(req.params['id']);
    res.json(actor);
  } catch (e) {
    next(e);
  }
}

export async function putActorById(req: Request, res: Response, next: NextFunction) {
  try {
    await Actor.update(req.body, {where: {id: req.params['id']}});
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
