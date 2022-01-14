import Hasher from './hasher';

console.log('app started');
const worker = new Worker(new URL('web.worker.js', import.meta.url));
const hasher = new Hasher(worker);

hasher.events();
