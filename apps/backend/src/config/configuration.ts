export const configuration = () => ({
  session: {
    secret: process.env.SESSION_SECRET || "2722badd029fa3bbe29f7ebeee0dcaeb82a91c1088d348354c6e7172996368fd",
    salt: process.env.SESSION_SALT || "332535f60da28f8f",
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
