import {Command} from 'commander';
import handler from './handler';

export default new Command('change-password')
  .summary('change password')
  .description('Changes user password')
  .action(handler);
