import {StorageService} from '@try-catch-f1nally/scs-core';
import {CredentialsManager} from '../../internal/credentialsManager';

export default async function (archiveName: string) {
  console.log(`Deleting archive "${archiveName}"...`);
  const credentials = await CredentialsManager.read({throwErrorIfNotAuthorized: true});
  const storageService = new StorageService(credentials);
  await storageService.delete(archiveName);
  console.log('Success.');
}
