import {AuthService} from '@try-catch-f1nally/scs-core';
import {CredentialsManager} from '../../internal/credentialsManager';
import {questionPassword} from '../../internal/utils';

export default async function (login: string) {
  const password = await questionPassword('Enter the password: ');
  console.log('Log in...');
  const authService = new AuthService();
  const credentials = await authService.login(login, password);
  await CredentialsManager.write(credentials);
  console.log('Successfully logged in.');
}
