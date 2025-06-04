import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

export async function generateProject(projectName: string, files: { [key: string]: string }) {
  // Créer un dossier temporaire pour le projet
  const tempDir = path.join(os.tmpdir(), projectName);
  
  // Créer le dossier du projet
  await fs.promises.mkdir(tempDir, { recursive: true });

  // Créer tous les fichiers
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(tempDir, filePath);
    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.promises.writeFile(fullPath, content);
  }

  // Installer les dépendances
  await execAsync('npm install', { cwd: tempDir });

  return tempDir;
}

export async function openInVSCode(projectPath: string) {
  try {
    // Ouvrir VS Code avec le projet
    await execAsync(`code "${projectPath}"`);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'ouverture dans VS Code:', error);
    return false;
  }
} 