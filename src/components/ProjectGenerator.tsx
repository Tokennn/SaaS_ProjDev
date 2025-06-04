import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft, Code } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectGeneratorProps {
  technologies: string[];
  onBack: () => void;
}

interface ProjectStructure {
  name: string;
  version: string;
  description: string;
  dependencies: { [key: string]: string };
  scripts: { [key: string]: string };
}

const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({ technologies, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateProjectStructure = async () => {
    setIsGenerating(true);
    
    try {
      // Création de la structure du projet
      const projectStructure: ProjectStructure = {
        name: "mon-projet",
        version: "1.0.0",
        description: "Projet généré automatiquement",
        dependencies: {},
        scripts: {
          "start": "node index.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        }
      };

      // Ajout des dépendances en fonction des technologies
      technologies.forEach(tech => {
        switch(tech.toLowerCase()) {
          case 'react':
            projectStructure.dependencies = {
              ...projectStructure.dependencies,
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
              "@vitejs/plugin-react": "^4.0.0",
              "vite": "^4.3.9"
            };
            projectStructure.scripts = {
              ...projectStructure.scripts,
              "dev": "vite",
              "build": "vite build",
              "preview": "vite preview"
            };
            break;
          case 'node.js':
            projectStructure.dependencies = {
              ...projectStructure.dependencies,
              "express": "^4.18.2"
            };
            break;
          case 'typescript':
            projectStructure.dependencies = {
              ...projectStructure.dependencies,
              "typescript": "^5.0.0",
              "@types/node": "^20.0.0"
            };
            break;
        }
      });

      // Création du fichier README.md
      const readmeContent = `# ${projectStructure.name}

## Description
${projectStructure.description}

## Technologies utilisées
${technologies.map(tech => `- ${tech}`).join('\n')}

## Installation
\`\`\`bash
npm install
\`\`\`

## Démarrage
\`\`\`bash
npm start
\`\`\`
`;

      // Création des fichiers de base selon les technologies
      const files: { [key: string]: string } = {
        'package.json': JSON.stringify(projectStructure, null, 2),
        'README.md': readmeContent
      };

      if (technologies.includes('React')) {
        files['src/App.jsx'] = `import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Bienvenue sur mon projet React</h1>
    </div>
  );
}

export default App;`;

        files['src/main.jsx'] = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`;

        files['src/index.css'] = `:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}`;

        files['index.html'] = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectStructure.name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

        files['vite.config.js'] = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`;
      }

      if (technologies.includes('Node.js')) {
        files['index.js'] = `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API');
});

app.listen(port, () => {
  console.log(\`Serveur démarré sur le port \${port}\`);
});`;
      }

      // Envoi des fichiers au serveur pour création du projet
      const response = await fetch('http://localhost:3001/api/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName: projectStructure.name,
          files
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du projet');
      }

      const { projectPath } = await response.json();

      // Ouverture du projet dans VS Code
      const openResponse = await fetch('http://localhost:3001/api/open-in-vscode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectPath })
      });

      if (!openResponse.ok) {
        throw new Error('Erreur lors de l\'ouverture dans VS Code');
      }

      toast.success("Projet généré et ouvert dans VS Code !");
    } catch (error) {
      console.error("Erreur lors de la génération du projet:", error);
      toast.error("Une erreur est survenue lors de la génération du projet");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Génération de votre <span className="gradient-text">projet</span>
        </h2>

        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Technologies sélectionnées :</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-custom-blue to-custom-purple text-white rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-muted-foreground mb-6">
            Cliquez sur le bouton ci-dessous pour générer un projet de base avec les technologies sélectionnées.
            Le projet sera automatiquement ouvert dans VS Code.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>

            <Button
              onClick={generateProjectStructure}
              disabled={isGenerating}
              className="bg-gradient-to-r from-custom-blue to-custom-purple hover:opacity-90 transition-opacity flex-1"
            >
              <Code className="mr-2 h-4 w-4" />
              {isGenerating ? 'Génération en cours...' : 'Générer et ouvrir le projet'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectGenerator; 