#!/usr/bin/env node

const fs = require('fs')
const shell = require('shelljs')
const chalk = require('chalk')
const log = console.log
const success = chalk.green
const warning = chalk.yellow

// Generates a date-based tag number
function generateVersionNumber(previousVersion){
	let today = new Date()
	var newMajor = `${today.getFullYear()}.${parseInt(today.getMonth()) + 1}`
	newMajor = newMajor.substr(2)
	oldMajorArr = previousVersion.split('.')
	oldMajor = `${oldMajorArr[0]}.${oldMajorArr[1]}`

	if(oldMajor == newMajor){
		newVersion = `${newMajor}.${parseInt(oldMajorArr[2]) + 1}`
	} else {
		newVersion = newMajor + '.0'
	}
	return newVersion
}

// Returns existing tag
function setBase(tag){
	releaseData.base = tag
	return n
}

// require shelljs
// require semver

// check if git 
// store tag number
// check if tag number is semver
// store new tag number
// npm version new tag number
// git push

module.exports.trigger = (opt) => {
    var options = opt
}