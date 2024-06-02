import {AuthService} from '@try-catch-f1nally/scs-core';
import {CredentialsManager} from '../../internal/credentialsManager';

export default async function (login: string, password: string) {
  console.log('Register...');
  const authService = new AuthService();
  const credentials = await authService.register(login, password);
  await CredentialsManager.write(credentials);
  console.log('Successfully registered.');
}
