module.exports = {
  roles: {
    OWNER: ["924501682619052042"],
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
