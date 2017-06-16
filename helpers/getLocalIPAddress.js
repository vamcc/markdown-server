'use strict';

const os = require('os');
const ifaces = os.networkInterfaces();
let address = ''

Object.keys(ifaces).forEach(function (ifname) {

  ifaces[ifname].forEach(function (iface) {
    if (address === '' && iface.family === 'IPv4' && !iface.internal) {
      address = iface.address
      return;
    }
  });
});

module.exports = address