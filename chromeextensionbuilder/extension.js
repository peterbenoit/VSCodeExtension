const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {

    let importStructureCommand = vscode.commands.registerCommand('extension.importProjectStructure', async function () {
        // Open a dialog to select the JSON file
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
            // Parse the JSON structure
            const structure = JSON.parse(jsonContent);
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage('Please open a folder in VSCode before running this command.');
                return;
            }
            const rootPath = workspaceFolders[0].uri.fsPath;

            // Create the project structure
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

        // Create the folder if it doesn't exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const folderContents = structure[folder];
        const files = folderContents.files || [];
        const subfolders = folderContents.folders || [];

        // Create files within the current folder
        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '');
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
