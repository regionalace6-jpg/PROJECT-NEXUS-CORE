const { embed } = require("../utils/embed");
const { generateChart } = require("../utils/chart");
const { getUserStats, calculateRisk } = require("../services/intelEngine");

module.exports = {
  name: "report",

  async execute(message) {

    const user = message.mentions.users.first() || message.author;

    const stats = await getUserStats(user.id);

    const total = stats.activity.reduce((a,b)=>a+parseInt(b.count),0);
    const days = stats.activity.length;
    const servers = stats.servers;

    const risk = calculateRisk(total, days, servers);

    const labels = stats.activity.map(x=>x.date);
    const data = stats.activity.map(x=>parseInt(x.count));

    const chart = generateChart(labels, data);

    const e = embed("INTELLIGENCE REPORT")
      .addFields(
        { name: "User", value: user.tag },
        { name: "Servers", value: String(servers) },
        { name: "Days", value: String(days) },
        { name: "Total", value: String(total) },
        { name: "Risk", value: risk }
      )
      .setImage(chart);

    message.reply({ embeds: [e] });
  }
};
