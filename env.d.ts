/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_REGISTRAR_USUARIO: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
