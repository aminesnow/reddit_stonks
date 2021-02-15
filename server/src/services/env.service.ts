import { config as dotenvConfig } from 'dotenv';

if (process.env.ENV !== 'production') {    
    dotenvConfig({ path: __dirname + '/../../.env' });
}

export function getEnvVar(variable: string): string | undefined {    
    return process.env[variable];
}