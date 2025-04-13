'use server';

import os from 'os';
import {glob} from 'glob';
import {promisify} from 'util';
import {exec} from 'child_process';

const globPromise = promisify(glob);
const execPromise = promisify(exec);

export async function analyzeSystem(): Promise<string> {
  try {
    const tempDir = os.tmpdir();
    const tempFiles = await globPromise(`${tempDir}/*`);
    const processInfo = await execPromise('tasklist');

    return `
      System Analysis Results:
      - Number of temporary files: ${tempFiles.length}
      - Running processes: ${processInfo.stdout.split('\\r\\n').length - 2}
    `;
  } catch (error: any) {
    console.error('Error during system analysis:', error);
    throw new Error(error.message || 'Failed to analyze system.');
  }
}


