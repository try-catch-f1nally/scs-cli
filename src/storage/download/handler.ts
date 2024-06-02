import fs from 'node:fs';
import path from 'node:path';
import stream from 'node:stream';
import tar from 'tar-stream';
import {StorageService} from '@try-catch-f1nally/scs-core';
import {CredentialsManager} from '../../internal/credentialsManager';

export type DownloadOptions = {
  encKey: string;
  dest: string;
};

export default async function (archiveName: string, {encKey: encKeyFilePath, dest: destPath}: DownloadOptions) {
  console.log('Downloading...');

  const credentials = await CredentialsManager.read({throwErrorIfNotAuthorized: true});
  const storageService = new StorageService(credentials);
  const encKey = await fs.promises.readFile(encKeyFilePath).then((buffer) => buffer.toString());
  const {isTar, downloadFn} = await storageService.download(archiveName, encKey);

  let writable: stream.Writable;
  if (isTar) {
    const extract = tar.extract();
    for await (const entry of extract) {
      const destFilePath = path.join(destPath, archiveName, entry.header.name);
      entry.pipe(fs.createWriteStream(destFilePath));
      entry.resume();
    }
    writable = extract;
  } else {
    writable = fs.createWriteStream(path.join(destPath, archiveName));
  }

  await downloadFn(writable);

  console.log('Success.');
}
