import {Command} from 'commander';
import handler from './handler';

export default new Command('download')
  .summary('download archive')
  .description('Downloads archive and extract its files')
  .argument('<archive-name>', 'archive name')
  .option('-k, --enc-key <file>', 'encryption key file path')
  .option('-d, --dest <dir>', 'destination output directory', '.')
  .action(handler);
