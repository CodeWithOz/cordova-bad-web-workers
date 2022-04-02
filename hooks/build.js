const glob = require('glob');
const { buildSync } = require('esbuild');

glob('src/js/workers/scripts/*.js', (err, files) => {
    if (err) {
        console.error('error finding matching glob files:', err);
        process.exit(1);
    }
    console.log('matching web worker files:', files);
    buildSync({
        entryPoints: ['src/js/main.js', ...files],
        minify: true,
        bundle: true,
        format: 'esm',
        outdir: 'www/js',
    });
});
