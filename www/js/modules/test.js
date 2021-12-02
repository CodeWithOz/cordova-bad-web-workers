import { printer } from './exporter.js';
import blurhash from './blurhash';
printer('this is the modular test');

window.printerModule = printer;
window.blurhashModule = blurhash;
