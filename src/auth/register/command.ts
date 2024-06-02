import {Command} from 'commander';
import handler from './handler';

export default new Command('register')
  .summary('register an user')
  .description('Registers an user')
  .argument('<login>', 'user login')
  .argument('<password>', 'user password')
  .action(handler);
