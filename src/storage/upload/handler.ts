import fs from 'node:fs';
import path from 'node:path';
import stream from 'node:stream';
import tar from 'tar-stream';
import {StorageService} from '@try-catch-f1nally/scs-core';
import {CredentialsManager} from '../../internal/credentialsManager';

type UploadOptions = {
  name?: string;
  encKey?: string;
  encKeyOut?: string;
};

export default async function (fileOrDir: string, options: UploadOptions) {
  if (!options.encKey && !options.encKeyOut) {
    throw new Error('The --enc-key-outfile options is required when --enc-key is not specified');
  }

  console.log('Uploading...');

  const {name: archiveName = path.basename(fileOrDir), encKey, encKeyOut} = options;
  const credentials = await CredentialsManager.read({throwErrorIfNotAuthorized: true});
  const storageService = new StorageService(credentials);

  let isTar = false;
  let readable: stream.Readable;
  const stat = await fs.promises.stat(fileOrDir);
  if (stat.isDirectory()) {
    const pack = tar.pack();
    const entry = pack.entry({type: 'directory', name: fileOrDir}, (err) => {
      if (err) {
        throw new Error(`Failed to pack ${fileOrDir} to tarball`, {cause: err});
      }
      pack.finalize();
    });
    entry.end();
    readable = pack;
    isTar = true;
  } else {
    readable = fs.createReadStream(fileOrDir);
  }

  const {encryptionKey} = await storageService.upload(readable, {archiveName, isTar, encryptionKey: encKey});
  if (encKeyOut) {
    await fs.promises.writeFile(encKeyOut, encryptionKey);
    await fs.promises.chmod(encKeyOut, 0o400);
  }

  console.log('Success.');
}
