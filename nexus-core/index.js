const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

const { initDB } = require("./services/database");
const { track } = require("./services/activityService");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
const PREFIX = ".";

// load commands
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", async () => {
  console.log(`NEXUS CORE ONLINE: ${client.user.tag}`);
  await initDB();
});

// auto setup
client.on("guildCreate", async (guild) => {
  try {
    const category = await guild.channels.create({
      name: "NEXUS CORE",
      type: 4
    });

    const channels = ["nexus-commands", "nexus-logs", "nexus-alerts"];

    for (const ch of channels) {
      await guild.channels.create({
        name: ch,
        type: 0,
        parent: category.id
      });
    }

  } catch (err) {
    console.log(err.message);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // track activity
  await track(message.author, message.guild?.id || "dm");

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply("Error executing command.");
  }
});

client.login(process.env.TOKEN);
