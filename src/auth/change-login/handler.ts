import {AuthService} from '@try-catch-f1nally/scs-core';
import {CredentialsManager} from '../../internal/credentialsManager';

export default async function (login: string) {
  await CredentialsManager.read({throwErrorIfNotAuthorized: true});
  console.log('Changing login...');
  const authService = new AuthService();
  await authService.changeLogin(login);
  console.log('Login changed successfully.');
}
