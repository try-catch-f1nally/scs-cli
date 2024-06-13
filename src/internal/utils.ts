import stream from 'node:stream';
import readline from 'node:readline/promises';

export function questionPassword(question: string) {
  const mutedStdout = new stream.Writable({
    write(chunk: Buffer, encoding, callback) {
      if ([question, '\n', '\r', '\r\n'].includes(chunk.toString())) {
        process.stdout.write(chunk, encoding);
      }
      callback();
    }
  });
  const prompt = readline.createInterface({input: process.stdin, output: mutedStdout, terminal: true});
  return prompt.question(question).finally(() => prompt.close());
}
