const mix = require('laravel-mix');
const path = require('path');

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/')
    }
  },
});

mix.ts('resources/js/app.ts', 'public/js').vue({version: 3}).version()
    .sass('resources/scss/style.scss', 'public/css').version();
