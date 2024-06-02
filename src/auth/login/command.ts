import {Command} from 'commander';
import handler from './handler';

export default new Command('log in')
  .summary('log in')
  .description('Logs in')
  .argument('<login>', 'user login')
  .argument('<password>', 'user password')
  .action(handler);
