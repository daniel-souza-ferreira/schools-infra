import app from './app.js'
import { env } from './env/index.js'
import { sequelize } from './lib/sequelize.js'

const port = env.PORT

try {
    await sequelize.sync({ alter: true }); 
    console.log('Database synced successfully');

    await sequelize.authenticate();
    console.log('Database connection established');

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
} catch (error) {
    console.error('Unable to start server:', error);
}