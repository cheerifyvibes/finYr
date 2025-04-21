import { Request, Response } from 'express';
import { fetchPnrStatus } from '../services/pnr.service.js';

export const getPnrStatus = async (req: Request, res: Response) => {
  try {
    console.log('Received request to get PNR status', req.params);
    const { pnrNumber } = req.params;
    console.log('Received PNR Number:', pnrNumber);
    const pnrData = await fetchPnrStatus(pnrNumber);
    res.json(pnrData);
    console.log('PNR Data:', pnrData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch PNR status' });
  }
};
