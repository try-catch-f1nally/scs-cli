import {AuthService} from '@try-catch-f1nally/scs-core';
import {questionPassword} from '../../internal/utils';

export default async function () {
  const oldPassword = await questionPassword('Enter your current password: ');
  const newPassword = await questionPassword('Enter your new password: ');
  console.log('Changing password...');
  const authService = new AuthService();
  await authService.changePassword(oldPassword, newPassword);
  console.log('Password successfully changed.');
}
