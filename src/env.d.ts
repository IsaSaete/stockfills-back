declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    DEBUG?: string;
    JWT_SECRET: string;
  }
}
