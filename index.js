#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');
const { trigger } = require('./scripts/trigger')

program
	.version(pkg.version)

program
	.command('trigger')
	.alias('t')
	.option('-t, --test', 'Do a test run')
	.description('Creates a new git tag for a git repository. It will generate a version number, based on chronological versioning.')
	.action(function (options){
		trigger(options)
	});

program.parse(process.argv);

if (program.args.length === 0) program.help();