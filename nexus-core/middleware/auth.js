const { roles, permissions } = require("../config/roles");

function getUserRole(userId) {

  if (roles.OWNER.includes(userId)) return "OWNER";
  if (roles.ADMIN.includes(userId)) return "ADMIN";
  if (roles.ANALYST.includes(userId)) return "ANALYST";

  return "USER";
}

function checkPermission(command, userId) {

  const role = getUserRole(userId);
  const allowed = permissions[command];

  if (!allowed) return true;

  return allowed.includes(role);
}

function auth(commandName) {

  return (message) => {

    const allowed = checkPermission(commandName, message.author.id);

    if (!allowed) {
      message.reply("Access denied.");
      return false;
    }

    return true;
  };
}

module.exports = { auth };
