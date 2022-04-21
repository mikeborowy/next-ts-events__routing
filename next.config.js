const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "mikeborowy",
        mongodb_password: "M11c4al.B81",
        mongodb_clustername: "cluster0",
        mongodb_database: "events",
      },
    };
  }

  return {
    env: {
      mongodb_username: "mikeborowy",
      mongodb_password: "M11c4al.B81",
      mongodb_clustername: "cluster0",
      mongodb_database: "events",
    },
  };
};
