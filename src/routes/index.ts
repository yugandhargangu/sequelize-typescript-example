import { findAllMovies, createMovie, getMovieById, putMovieById } from "./movies";
import { createActor, assignMovieToActor, findAllActors, getActorById, putActorById } from "./actors";

export interface Route {
    path: string;
    actions: any;
    routes?: Route[];
}

export const Routes: Route[] = [
    {
        path: '/movies',
        actions: {
            get: findAllMovies,
            post: createMovie
        },
        routes: [
            {
                path: '/:id',
                actions: {
                    get: getMovieById,
                    put: putMovieById
                }
            }
        ]
    },
    {
        path: '/actors',
        actions: {
            get: findAllActors,
            post: createActor
        },
        routes: [
            {
                path: '/:id',
                actions: {
                    get: getActorById,
                    put: putActorById
                },
                routes: [{
                    path: '/movies/:movieId',
                    actions: {
                        post: assignMovieToActor
                    }
                }]
            }
        ]
    }
];
