const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {

    let importStructureCommand = vscode.commands.registerCommand('extension.importProjectStructure', async function () {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Please open a folder in VSCode before running this command.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;

        const fileUri = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            filters: {
                'JSON Files': ['json']
            }
        });

        if (!fileUri || fileUri.length === 0) {
            return; // User cancelled the dialog
        }

        const filePath = fileUri[0].fsPath;
        const jsonContent = fs.readFileSync(filePath, 'utf8');

        try {
            const structure = JSON.parse(jsonContent);
            createStructure(rootPath, structure);
            vscode.window.showInformationMessage('Project structure imported successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to import project structure: ${error.message}`);
        }
    });

    context.subscriptions.push(importStructureCommand);
}

function createStructure(basePath, structure) {
    for (const folder in structure) {
        const folderPath = path.join(basePath, folder);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const folderContents = structure[folder];
        const files = folderContents.files || [];
        const subfolders = folderContents.folders || [];

        // Create files with content from templates
        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            console.log('Writing file to:', filePath);
            if (!fs.existsSync(filePath)) {
                const templatePath = path.join(__dirname, 'templates', file);
                let content = '';

                if (fs.existsSync(templatePath)) {
                    content = fs.readFileSync(templatePath, 'utf8');
                }

                fs.writeFileSync(filePath, content);
            }
        });

        // Recursively handle subfolders
        subfolders.forEach((subfolder) => {
            const subfolderStructure = structure[folder][subfolder] || {};
            createStructure(folderPath, { [subfolder]: subfolderStructure });
        });
    }
}



function deactivate() {}

module.exports = {
    activate,
    deactivate
};
