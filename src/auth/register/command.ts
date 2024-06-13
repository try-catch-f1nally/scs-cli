import {Command} from 'commander';
import handler from './handler';

export default new Command('register')
  .summary('register a new user')
  .description('Registers a new user')
  .argument('<login>', 'user login')
  .action(handler);
