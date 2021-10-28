const mix = require('laravel-mix');

mix.ts('resources/js/app.ts', 'public/js').vue({version: 3}).version()
    .sass('resources/scss/style.scss', 'public/css');
