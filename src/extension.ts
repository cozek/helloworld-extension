// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as nvidia from './nvidia';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	const cssPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'pico.min.css');
    // const cssUri = cssPath.with({ scheme: 'vscode-resource' });

	var provider = new SimpleSidebarProvider(context.extensionUri,);
	var webview = vscode.window.registerWebviewViewProvider(
		'smiSidebar.view',
		provider,
	  );
	context.subscriptions.push(
		webview,
		
	  );
}


function noSMIFoundHTML(cssUri: vscode.Uri) {
	return `
		<!DOCTYPE html>
		<link rel="stylesheet"
			href="pico.min.css"
		>
		<html>
			<body>
				<h1>No Nvidia-SMI installed</h1>
			</body>
		</html>
	`;
}

class SimpleSidebarProvider implements vscode.WebviewViewProvider {
	constructor(public readonly extensionUri: vscode.Uri) {}

	resolveWebviewView(webviewView: vscode.WebviewView): void {
		webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'media')]
        };

		const cssUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'pico.min.css'));

        nvidia.isNvidiaSmiAvailable().then(isAvailable => {
            if (isAvailable) {
                setInterval(()=>{
					webviewView.webview.html = generateHTML(cssUri);
				},5000); // updates every 5 seconds
            } else {
                webviewView.webview.html = noSMIFoundHTML(cssUri);
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

function generateHTML(cssUri: vscode.Uri): string {
	const dfs = nvidia.readNvidiaSmi();
	const htmlTable0 = generateHtmlTable(dfs[0]);
	// const htmlTable1 = generateHtmlTable(dfs[1]);

	const pico = `
	<!doctype html>
	<html lang="en" data-theme="dark">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="color-scheme" content="light dark">
		<link rel="stylesheet"
			href="${cssUri}"
		>
		<title>NVIDIA-SMI GPU Memory Info</title>
	</head>
	<body>
		<main class="container" data-theme="dark">
		<h1>GPU Memory Info</h1>
		${htmlTable0}
		</main>
	</body>
	</html>
	`;
	return pico;
}


// This method is called when your extension is deactivated
export function deactivate() {}
