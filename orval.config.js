import { defineConfig } from 'orval';

const API_URL = '';

export default defineConfig({
  api: {
    input: {
      target: API_URL,
    },
    output: {
      workspace: 'api',
      clean: true,
      mode: 'tags-split',
      target: './services',
      schemas: './models',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './templates/mutator.ts',
          name: 'customInstance',
        },
        formData: {
          path: './templates/form-data.ts',
          name: 'customFormDataFn',
        },
        query: {
          useSuspenseQuery: true,
          version: 5,
          signal: false,
        },
      },
    },
  },
  apiZod: {
    input: {
      target: API_URL,
    },
    output: {
      mode: 'tags-split',
      workspace: 'app/api',
      client: 'zod',
      target: './services',
      indexFiles: false,
      fileExtension: '.zod.ts',
    },
  },
});
