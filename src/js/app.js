import Hasher from './hasher';
import Worker from './web.worker';

console.log('app started');
const worker = new Worker();
const hasher = new Hasher(worker);

hasher.events();
