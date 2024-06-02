import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';

const CREDENTIALS_FILE_PATH = path.join(os.homedir(), '.scs', 'credentials.json');

type Credentials = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};

type ReadCredentialsOptions = {
  throwErrorIfNotAuthorized?: boolean;
};

export class CredentialsManager {
  static async read(): Promise<Credentials | undefined>;
  static async read(options: ReadCredentialsOptions & {throwErrorIfNotAuthorized: boolean}): Promise<Credentials>;
  static async read(options?: ReadCredentialsOptions) {
    const {throwErrorIfNotAuthorized} = options || {};
    try {
      const buffer = await fs.readFile(CREDENTIALS_FILE_PATH);
      return JSON.parse(buffer.toString()) as Credentials;
    } catch (error) {
      if (error instanceof Object && 'code' in error && error.code === 'ENOENT') {
        if (throwErrorIfNotAuthorized) {
          throw new Error('Please log in for this operation');
        }
        return;
      }
      throw error;
    }
  }

  static async write(credentials: Credentials) {
    await fs.writeFile(CREDENTIALS_FILE_PATH, JSON.stringify(credentials));
    await fs.chmod(CREDENTIALS_FILE_PATH, 0o400);
  }
}
