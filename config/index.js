'use strict';

const _ = require('lodash');
let config = require('./config.default');

// 自定义的配置：测试环境
const envList = ['test'];
if (envList.indexOf(process.env.NODE_ENV) >= 0) {
  try {
    let envConfig = require(`./config.${process.env.NODE_ENV}`);
    config = _.merge(config, envConfig);
  } catch (e) {
    global.console.log('[ERROR] loading config/config.js failed:', e.message);
  }
}

// 开发人员可配置的环境
try {
  let envConfig = require('./config');
  config = _.merge(config, envConfig);
} catch (e) {
  if (false === config.debug) {
    console.log('[ERROR] loading config/config.js failed:', e.message); // eslint-disable-line
  } else {
    if (e.code !== 'MODULE_NOT_FOUND') {
      console.log('[ERROR] loading config/config.js failed:', e.message); // eslint-disable-line
    }
  }
}

// 需要运维人员补充的配置
try {
  const globalConfig = require(process.env.CONFIG_PATH || config.globalConfigFile);
  config = _.merge(config, globalConfig);
} catch (e) {
  if (false === config.debug) {
    console.log(`[ERROR] loading ${globalConfigFile} failed:`, e.message); // eslint-disable-line
  } else {
    if (e.code !== 'MODULE_NOT_FOUND') {
      console.log(`[ERROR] loading ${globalConfigFile} failed:`, e.message); // eslint-disable-line
    }
  }
}

module.exports = config;
