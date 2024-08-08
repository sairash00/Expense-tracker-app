import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './src/database/index.js';

connectDB()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to the database:', error);
    });
