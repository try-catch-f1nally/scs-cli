import {Command} from 'commander';
import handler from './handler';

export default new Command('change-login')
  .summary('change login')
  .description('Changes user login')
  .argument('<login>', 'user login')
  .action(handler);
