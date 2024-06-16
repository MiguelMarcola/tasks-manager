const os = require('os');

const getComputerName = () => {
  return os.hostname();
};

module.exports = { getComputerName };