import Hasher from './hasher';
import Worker from './web.worker.js';

console.log('app started');
const worker = new Worker();
const hasher = new Hasher(worker);

hasher.events();
