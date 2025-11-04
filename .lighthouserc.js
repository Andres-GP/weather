module.exports = {
  ci: {
    collect: {
      url: ["https://weather-app-bay-seven-21.vercel.app/"],
      startServerCommand: "npm run start",
      numberOfRuns: 3,
    },
    assert: {
      preset: "lighthouse:recommended",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
