import {Command} from 'commander';
import handler from './handler';

export default new Command('list').summary('list archives').description('Lists uploaded archives').action(handler);
