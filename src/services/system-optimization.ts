'use server';

import os from 'os';
import {promisify} from 'util';
import {exec} from 'child_process';
import fs from 'fs';
import path from 'path';

const execPromise = promisify(exec);
const fsPromises = fs.promises;

export async function runOptimization(): Promise<string> {
  try {
    // Clear temporary files
    const tempDir = os.tmpdir();
    const files = await fsPromises.readdir(tempDir);

    for (const file of files) {
      const filePath = path.join(tempDir, file);
      try {
        await fsPromises.unlink(filePath);
      } catch (e: any) {
        console.error(`Failed to delete ${filePath}:`, e);
      }
    }

    // Flush DNS cache
    await execPromise('ipconfig /flushdns');

    return 'System optimized: Temporary files cleared and DNS cache flushed.';
  } catch (error: any) {
    console.error('Error during system optimization:', error);
    throw new Error(error.message || 'System optimization failed.');
  }
}
