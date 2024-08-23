# Chrome Extension Side Panel Generator

This VSCode extension generates a barebones Chrome extension project with a side panel. The generated project includes all the necessary files and structure to help you quickly start building your Chrome extension with a side panel.

## Features

- Automatic Project Generation: Generates the required files and folders for a basic Chrome extension with a side panel.
- Pre-built Templates: Includes template files for `manifest.json`, `background.js`, `sidepanel.html`, `sidepanel.css`, and `sidepanel.js`.
- Customizable: Easily modify the generated templates to suit your needs.

## How to Run this Project
- Open extension.js and press F5. Alternatively, you can choose Run > Start Debugging, or open the Run and Debug panel and click Run and Debug.
- A new VSCode window will open. Select or Create a Folder for the new project to exist in, and then open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and run the command `Import Project Structure`.

## Usage

1. **Generate a New Chrome Extension Project**:
   - Open VSCode and create a new workspace or folder where you want the Chrome extension project to be generated.
   - Use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and run the command `Import Project Structure`.
   - Select the JSON file that defines the project structure.

2. **JSON Structure for Project Generation**:
   The extension relies on a JSON file that defines the structure of the Chrome extension project. Here’s an example of what the JSON file might look like:

   - The project includes files like `manifest.json`, `background.js`, and `sidepanel.html`.
   - It also creates folders like `css` and `js`, and adds files `sidepanel.css` and `sidepanel.js` to these folders.

3. **Generated Project Structure**:
   Once the command is executed, the specified files and folders will be created in your workspace, setting up the basic structure for your Chrome extension.

## Project Templates

The content for the generated files is stored in the `templates` directory of this extension. You can customize these templates to change the content of the files generated by the extension.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [VSCode API Documentation](https://code.visualstudio.com/api)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/mv3/)
