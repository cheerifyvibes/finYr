import express from 'express';
import { pnrRouter } from './routes/pnr.routes.js';

const app = express();
const PORT = 3000;

app.use('/api', pnrRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
