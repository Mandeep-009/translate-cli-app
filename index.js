#!/usr/bin/env node

const yargs = require('yargs');
const { translate } = require('@vitalets/google-translate-api');
const langArr = require('./languages');

const argv = yargs
  .option('text', {
    alias: 't',
    description: 'Text to translate',
    type: 'string',
    demandOption: true
  })
  .option('target', {
    alias: 'l',
    description: 'Target language',
    type: 'string',
    demandOption: true
  })
  .help()
  .alias('help', 'h')
  .argv;

const { text, target } = argv;

const translateText = async (text, target) => {
  try {
    if (!target) return console.log("you have given empty string as target language argument");
    const target_language = target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
    const lang = langArr.find(obj => obj.language === target_language)
    if(!lang)
        return console.log("no such language found");
    const res = await translate(text, { to: lang.code });
    console.log(`Translation: ${res.text}`);
  } catch (error) {
    console.error('Error translating text:', error);
  }
};

translateText(text, target);

