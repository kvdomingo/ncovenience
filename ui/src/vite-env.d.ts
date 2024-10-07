/// <reference types="vite/client" />

declare module "cloudinary-react";

interface ImportMetaEnv {
  readonly VITE_MAPBOX_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
