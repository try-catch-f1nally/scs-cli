import {AuthService} from '@try-catch-f1nally/scs-core';
import {CredentialsManager} from '../../internal/credentialsManager';

export default async function () {
  console.log('Log out...');
  const authService = new AuthService();
  const credentials = await CredentialsManager.read();
  if (credentials) {
    await authService.logout(credentials.refreshToken);
  }
  console.log('Successfully logged out.');
}
