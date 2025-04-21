import { Router } from 'express';
import { getPnrStatus } from '../handlers/pnr.handler.js';

export const pnrRouter = Router();

pnrRouter.get('/pnr/:pnrNumber', getPnrStatus);
