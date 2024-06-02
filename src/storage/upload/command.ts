import {Command} from 'commander';
import handler from './handler';

export default new Command('upload')
  .summary('upload files')
  .description('Uploads files')
  .argument('<file-or-dir>', 'file or dir path')
  .option('-n, --name [name]', 'name of the archive to create')
  .option('-k, --enc-key [file]', 'encryption key file path')
  .option('--enc-key-out [file]', 'target encryption key file path')
  .action(handler);
