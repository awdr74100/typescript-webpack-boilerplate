/// <reference types="webpack/module" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly BACKEND_URL: string;
  }
}
