module.exports = {
  roles: {
    OWNER: ["YOUR_DISCORD_ID"],
    ADMIN: [],
    ANALYST: []
  },

  permissions: {
    report: ["OWNER", "ADMIN", "ANALYST"],
    blacklist: ["OWNER", "ADMIN"],
    altcheck: ["OWNER", "ADMIN", "ANALYST"],
    alert: ["OWNER", "ADMIN", "ANALYST"],
    presence: ["OWNER", "ADMIN", "ANALYST"]
  }
};
