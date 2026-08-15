// @ts-check
import { defineConfig } from 'astro/config';

// Project site: repo davdenic/articles serves at /articles/.
export default defineConfig({
  site: 'https://davdenic.github.io',
  base: '/articles',
});
