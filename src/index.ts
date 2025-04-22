import express from 'express';
import { pnrRouter } from './routes/pnr.routes.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', pnrRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
