const glob = require('glob');
const { buildSync } = require('esbuild');

glob('src/js/{workers/scripts/*.js,pages/**/*.js}', (err, files) => {
    if (err) {
        console.error('error finding matching glob files:', err);
        process.exit(1);
    }
    console.log('matching web worker files:', files);
    const buildOpts = {
        entryPoints: ['src/js/main.js', ...files],
        minify: true,
        bundle: true,
        format: 'esm',
        outdir: 'www/js',
    };
    if (process.env.CI_ENV === 'dev') {
        buildOpts.sourcemap = true;
    }
    buildSync(buildOpts);
});
