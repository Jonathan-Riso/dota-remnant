const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { botToken } = require('./config.json');

const express = require('express');

var d2gsi = require('dota2-gsi');
var server = new d2gsi();

var client_emiters = { 'client': null}
exports.client_emiters = client_emiters

server.events.once('newclient', function(client) {
	console.log("New client connection, IP address: " + client.ip);
    if (client.auth && client.auth.token) {
		console.log("Auth token: " + client.auth.token);
		client_emiters['client'] = client;
    } else {
		console.log("No Auth token");
    }
});


var StopExec = true;


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
			StopExec = false;
		}
	}
}

if (StopExec){
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
}