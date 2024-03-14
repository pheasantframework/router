import { RouteResult } from '../../req.ts';
import { SPAState } from '../spa/SPAState.ts'


export type RouteFunc = (request: RouteResult) => void;
export type SPARouteFunc = (request: RouteResult, state: SPAState) => void;