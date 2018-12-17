#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');
const { trigger } = require('./scripts/trigger')

program
	.version(pkg.version)

program
	.command('trigger')
	.alias('t')
	.description('Compiles a Neto theme for the theme store')
	.action(function (options){
		trigger(options)
	});

program.parse(process.argv);

if (program.args.length === 0) program.help();