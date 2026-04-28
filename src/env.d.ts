declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    DEBUG?: string;
    NODE_ENV?: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }
}
