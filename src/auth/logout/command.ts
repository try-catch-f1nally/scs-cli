import {Command} from 'commander';
import handler from './handler';

export default new Command('logout').summary('log out').description('Logs out').action(handler);
