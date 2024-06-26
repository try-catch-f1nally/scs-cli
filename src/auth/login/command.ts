import {Command} from 'commander';
import handler from './handler';

export default new Command('login')
  .summary('log in')
  .description('Logs in')
  .argument('<login>', 'user login')
  .action(handler);
