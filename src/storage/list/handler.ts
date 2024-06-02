import {StorageService} from '@try-catch-f1nally/scs-core';
import {CredentialsManager} from '../../internal/credentialsManager';

export default async function () {
  console.log('Listing...');
  const credentials = await CredentialsManager.read({throwErrorIfNotAuthorized: true});
  const storageService = new StorageService(credentials);
  const list = await storageService.list();
  console.table(list);
  console.log(`Total: ${list.length}`);
}
