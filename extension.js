// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios').default;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "test-extension" is now active!');

	let disposable = vscode.commands.registerCommand('test-extension.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from the other side!');

		// let date = new Date();
		// let second = date.getSeconds();
		// let minutes = date.getMinutes();
		// let hour = date.getHours();

		// vscode.window.showInformationMessage(`the current time is --> ${hour}:${minutes}:${second}`);

		// let value = await vscode.window.showInputBox();
		// vscode.window.showInformationMessage(`the current time is --> ${value}`);

		const weapon_options = [
			'AK-47', 
			'AUG', 
			'AWP', 
			'Bayonet', 
			'Bowie Knife', 
			'Butterfly Knife', 
			'Classic Knife', 
			'CZ75-Auto', 
			'Desert Eagle', 
			'Dual Berettas', 
			'Falchion Knife', 
			'FAMAS', 
			'Five-SeveN', 
			'Flip Knife', 
			'G3SG1', 
			'Galil AR', 
			'Glock-18', 
			'Gut Knife', 
			'Huntsman Knife', 
			'Karambit', 
			'M249', 
			'M4A1-S', 
			'M4A4', 
			'M9 Bayonet', 
			'MAC-10', 
			'MAG-7', 
			'MP5-SD', 
			'MP7', 
			'MP9', 
			'Navaja Knife', 
			'Negev', 
			'Nomad Knife', 
			'Nova', 
			'P2000', 
			'P250', 
			'P90', 
			'Paracord Knife', 
			'PP-Bizon', 
			'R8 Revolver', 
			'Sawed-Off', 
			'SCAR-20', 
			'SG 553', 
			'Shadow Daggers', 
			'Skeleton Knife', 
			'SSG 08', 
			'Stiletto Knife', 
			'Survival Knife', 
			'Talon Knife', 
			'Tec-9', 
			'UMP-45', 
			'Ursus Knife', 
			'USP-S', 
			'XM1014'
		];

		const wear_options = [
			'Field-Tested',
			'Minimal Wear',
			'Battle-Scarred',
			'Well-Worn',
			'Factory New',
			'Not Painted'
		];
		
		// Steam api vscode extension making in process
		let quickPickWeapon = await vscode.window.showQuickPick(weapon_options).then(response => {
			console.log(response);
			return response;
		});

		let name = await vscode.window.showInputBox({
			placeHolder: "Name"
		})

		let quickPickWear = await vscode.window.showQuickPick(wear_options).then(response => {
			console.log(response);
			return response;
		});

		// vscode.window.showInformationMessage(`quickPickWeapon --> ${quickPickWeapon}`);
		// vscode.window.showInformationMessage(`name --> ${name}`);
		// vscode.window.showInformationMessage(`quickPickWear --> ${quickPickWear}`);
		// Five-SeveN%20%7C%20Case%20Hardened%20%28Field-Tested%29

		if ((typeof(quickPickWeapon) !== 'undefined') && (typeof(name) !== 'undefined') && (typeof(quickPickWear) !== 'undefined')) {
			// All correct, call the steam market api
			console.log(typeof(quickPickWeapon));

			let market_hash_name = quickPickWeapon + "%20%7C%20" + name + "%20%28" + quickPickWear + "%29";
			console.log('market_hash_name --> ', market_hash_name);
			axios.get('https://steamcommunity.com/market/priceoverview/?appid=730&currency=24&market_hash_name='+market_hash_name)
			.then(response => {
				console.log('response --> ', response);
				if (response.status == 200) {
					let data = response.data;
					vscode.window.showInformationMessage(`The average price for your gun is: ${data.median_price}`);
				}
			})
			.catch(err => {
				console.error("failed, the error --> ", err);
			})
		} else {
			// Not all values are available then show an error msg
			vscode.window.showInformationMessage(`All the values are required.`);
		}
		

	});

	context.subscriptions.push(disposable);
}
// @ts-ignore
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	// @ts-ignore
	activate,
	deactivate
}
