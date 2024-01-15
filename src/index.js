const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { botToken } = require('./config.json');

const express = require('express');
const {DOTA2GSI} = require('dotagsi');

const app = express();
const GSI = new DOTA2GSI()
exports.GSI = GSI;

app.use(express.urlencoded({extended:true}));
app.use(express.raw({limit:'10Mb', type: 'application/json' }));

app.post('/', (req, res) => {
	const text = req.body.toString().replace(/"(player|owner)":([ ]*)([0-9]+)/gm, '"$1": "$3"').replace(/(player|owner):([ ]*)([0-9]+)/gm, '"$1": "$3"');
    data = JSON.parse(text);
	GSI.digest(data);
    res.sendStatus(200);
});


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(botToken);
app.listen(4000);