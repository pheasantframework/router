import { RouteResult } from '../../req.ts';


export type RouteFunc = (request: RouteResult) => void;
