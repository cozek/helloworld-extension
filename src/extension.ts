// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as nvidia from './nvidia';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from helloworld2!');
	});

	context.subscriptions.push(disposable);
	const provider = new SimpleSidebarProvider();
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		  'exampleView.view',
		  provider
		)
	  );

}

function helloworldHTML() {
	return `
		<!DOCTYPE html>
		<link rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
		>
		<html>
		
			<body>
				<h1>Hello World!</h1>
			</body>
		</html>
	`;
}

function noSMIFoundHTML() {
	return `
		<!DOCTYPE html>
		<link rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
		>
		<html>
			<body>
				<h1>No Nvidia-SMI installed</h1>
			</body>
		</html>
	`;
}

class SimpleSidebarProvider implements vscode.WebviewViewProvider {
	resolveWebviewView(webviewView: vscode.WebviewView): void {
        nvidia.isNvidiaSmiAvailable().then(isAvailable => {
            if (isAvailable) {
				// const dfs = nvidia.readNvidiaSmi();
				// console.table(dfs[0]);
				// console.table(dfs[1]);
                // webviewView.webview.html = helloworldHTML();
                webviewView.webview.html = generateHTML();

            } else {
                webviewView.webview.html = noSMIFoundHTML();
            }
        });
		
		// nvidia.readNvidiaSmi().then(out => {
		// 	console.table(out[0]);
		// 	console.table(out[1]);
		// });
    }
}

function generateHtmlTable(data: any[]): string {
    if (data.length === 0) {return '<table></table>';}

    const headers = Object.keys(data[0]);
    let table = '<table border="1"><thead><tr>';

    // Generate table headers
    headers.forEach(header => {
        table += `<th>${header}</th>`;
    });
    table += '</tr></thead><tbody>';

    // Generate table rows
    data.forEach(row => {
        table += '<tr>';
        headers.forEach(header => {
            table += `<td>${row[header]}</td>`;
        });
        table += '</tr>';
    });

    table += '</tbody></table>';
    return table;
}

function generateHTML(){
	const dfs = nvidia.readNvidiaSmi();
	const htmlTable0 = generateHtmlTable(dfs[0]);
	const htmlTable1 = generateHtmlTable(dfs[1]);
	const htmlContent = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="color-scheme" content="dark">
		<link rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
		>
		<title>NVIDIA SMI Data</title>
	</head>
	<body>
		<main class="container">
		<h1>NVIDIA SMI Data</h1>
			${htmlTable0}
			${htmlTable1}
		</main>
	</body>
	</html>
	`;

	const pico = `
	<!doctype html>
	<html lang="en" data-theme="light">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="color-scheme" content="light dark">
		<link rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
		>
		<title>Hello world!</title>
	</head>
	<body>
		<main class="container" data-theme="light">
		<h1>Hello world!</h1>
		${htmlTable0}
		${htmlTable1}

		</main>
	</body>
	</html>
	`;
	return pico;
}


// This method is called when your extension is deactivated
export function deactivate() {}
