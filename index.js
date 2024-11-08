// index.js
import express from 'express';
import session from 'express-session';
import { handler as svelteKitHandler } from './build/handler.js'; // Adjust path as needed

const app = express();

app.use(
    session({
        secret: 'your-secret-key',  // Replace with a secure secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }  // Set to true if using HTTPS
    })
);

app.use(svelteKitHandler);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
