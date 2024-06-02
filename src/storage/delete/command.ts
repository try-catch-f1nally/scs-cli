import {Command} from 'commander';
import handler from './handler';

export default new Command('delete')
  .summary('delete archive')
  .description('Deletes archive by name')
  .argument('<archive-name>', 'archive name')
  .action(handler);
