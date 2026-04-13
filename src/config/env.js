export const env = {
    PORT: process.env.PORT || 5001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  };
  
// Fail fast — crash immediately if critical vars are missing
const required = ['DATABASE_URL', 'JWT_SECRET'];
for (const key of required) {
    if (!env[key]) throw new Error(`Missing required environment variable: ${key}`);
}