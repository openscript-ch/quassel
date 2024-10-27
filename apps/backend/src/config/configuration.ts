export const configuration = () => ({
  auth: {
    jwtSecret: process.env.JWT_SECRET || "local-secret",
  },
  database: {
    host: process.env.DATABASE_HOST || "db",
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    name: process.env.DATABASE_NAME || "postgres",
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
  },
});

export type Configuration = ReturnType<typeof configuration>;
