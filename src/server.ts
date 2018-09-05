import { createServer } from 'http';
import { app } from './app';
import { sequelize } from './sequelize';

// server listen port
const port = process.env.PORT || 3000;

(async () => {
  // initialize sequelize
  await sequelize.sync({ force: true });
  // create server
  createServer(app).listen(port, () => console.info(`Server running on port ${port}`));
})();
