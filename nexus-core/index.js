const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

// ===== CLIENT SETUP =====
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// ===== LOAD COMMANDS (FIXED PATH) =====
const commandsPath = path.join(__dirname, "commands");

if (!fs.existsSync(commandsPath)) {
    console.error("❌ Commands folder not found at:", commandsPath);
} else {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            console.warn(`⚠️ Command missing name: ${file}`);
        }
    }

    console.log(`✅ Loaded ${client.commands.size} commands`);
}

// ===== READY EVENT =====
client.once("ready", () => {
    console.log(`🔥 Bot is ONLINE as ${client.user.tag}`);
});

// ===== MESSAGE HANDLER =====
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const prefix = ".";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("❌ Error executing command.");
    }
});

// ===== AUTO CHANNEL CREATION (WHEN BOT JOINS SERVER) =====
client.on("guildCreate", async (guild) => {
    try {
        const channel = await guild.channels.create({
            name: "nexus-logs",
            type: 0
        });

        channel.send("Nexus Core connected. Logging initialized.");
    } catch (err) {
        console.error("Channel creation failed:", err);
    }
});

// ===== LOGIN =====
client.login(process.env.DISCORD_TOKEN);
