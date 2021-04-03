const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      env: {
        rooturl: "http://localhost:3000",
      },
    };
  }

  return {
    /* config options for all phases except development here */
    env: {
      rooturl: "https://tafsir.institute",
    },
  };
};
