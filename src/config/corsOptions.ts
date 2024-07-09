import allowedOrigins from './allowedOrigins';
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 //legacy devices -- earlier versions of smart TV's
};

export default corsOptions;