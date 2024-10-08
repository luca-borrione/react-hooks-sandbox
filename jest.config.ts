const getConfig = async () => {
  return {
    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
    verbose: true,
  };
};

export default getConfig;
