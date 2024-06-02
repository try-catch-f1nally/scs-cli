import fs from 'node:fs';
import path from 'node:path';
import {Command} from 'commander';
import loginCommand from './auth/login/command';
import logoutCommand from './auth/logout/command';
import registerCommand from './auth/register/command';
import deleteUploadCommand from './storage/delete/command';
import downloadCommand from './storage/download/command';
import listUploadsCommand from './storage/list/command';
import uploadCommand from './storage/upload/command';

const {version} = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')).toString());

new Command('scs')
  .description('Secure Cloud Storage CLI')
  .addCommand(registerCommand)
  .addCommand(loginCommand)
  .addCommand(logoutCommand)
  .addCommand(deleteUploadCommand)
  .addCommand(downloadCommand)
  .addCommand(listUploadsCommand)
  .addCommand(uploadCommand)
  .version(version, '-v, --version')
  .showHelpAfterError()
  .parseAsync()
  .catch((err) => {
    console.error('\x1b[31m%s\x1b[0m', err);
    process.exit(1);
  });
