import express from 'express';
import { generateProject, openInVSCode } from './projectGenerator';

const router = express.Router();

router.post('/generate-project', async (req, res) => {
  try {
    const { projectName, files } = req.body;
    const projectPath = await generateProject(projectName, files);
    res.json({ projectPath });
  } catch (error) {
    console.error('Erreur lors de la génération du projet:', error);
    res.status(500).json({ error: 'Erreur lors de la génération du projet' });
  }
});

router.post('/open-in-vscode', async (req, res) => {
  try {
    const { projectPath } = req.body;
    const success = await openInVSCode(projectPath);
    if (success) {
      res.json({ message: 'Projet ouvert dans VS Code' });
    } else {
      res.status(500).json({ error: 'Erreur lors de l\'ouverture dans VS Code' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'ouverture dans VS Code:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ouverture dans VS Code' });
  }
});

export default router; 