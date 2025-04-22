declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SCRAPEOPS_API_KEY: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
    }
  }
}

export {};