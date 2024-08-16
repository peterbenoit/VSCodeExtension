const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {

    let importSidePanelCommand = vscode.commands.registerCommand('extension.importSidePanelStructure', async function () {
        await importStructure('sidepanel.json');
    });

    let importPopupCommand = vscode.commands.registerCommand('extension.importPopupStructure', async function () {
        await importStructure('popup.json');
    });

    context.subscriptions.push(importSidePanelCommand);
    context.subscriptions.push(importPopupCommand);
}

async function importStructure(configFileName) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('Please open a folder in VSCode before running this command.');
        return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const configPath = path.join(__dirname, 'templates', configFileName);  // Updated to look inside the 'templates' folder

    console.log('Looking for configuration file at:', configPath);  // Log the path being checked

    if (!fs.existsSync(configPath)) {
        vscode.window.showErrorMessage('Configuration file not found.');
        return;
    }

    const jsonContent = fs.readFileSync(configPath, 'utf8');

    try {
        const structure = JSON.parse(jsonContent);
        createStructure(rootPath, structure);
        vscode.window.showInformationMessage('Project structure imported successfully!');
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to import project structure: ${error.message}`);
    }
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
            let destinationFile = file;

            // Rename manifest file to manifest.json if needed
            if (file.startsWith('manifest-')) {
                destinationFile = 'manifest.json';
            }

            const filePath = path.join(folderPath, destinationFile);
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
