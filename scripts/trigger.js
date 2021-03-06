#!/usr/bin/env node

const shell = require('shelljs')
const config = {
    baseVersion: '0.0.0',
    gitVersions: 'git tag',
    newestVersion: 'git describe --abbrev=0 --tags',
    pushVersion: 'git push origin --tags'
}

// Returns existing tag
function existingTag(){
    let oldVersion
    let versions = shell.exec(config.gitVersions, {silent:true})

    if(versions.length > 1){
        console.log("Existing tag...")
        oldVersion = shell.exec(config.newestVersion)
    }else{
        console.log("No existing tag...")
        oldVersion = config.baseVersion
    }
    return oldVersion
}
// Generates a date-based tag number
function generateTag(oldVersion){
	let today = new Date()
	let newMajor = `${today.getFullYear()}.${parseInt(today.getMonth()) + 1}`
	newMajor = newMajor.substr(2)
	oldMajorArr = oldVersion.split('.')
	oldMajor = `${oldMajorArr[0]}.${oldMajorArr[1]}`

	if(oldMajor == newMajor){
		newVersion = `${newMajor}.${parseInt(oldMajorArr[2]) + 1}`
	} else {
		newVersion = newMajor + '.0'
	}
	return newVersion
}

module.exports.trigger = (opt) => {
    console.log("Chrono Release 🕙")
    let options = opt
    let currentTag = existingTag()
    let newVersion = generateTag(currentTag)

    console.log("Creating new tag...")
    if(options.test == undefined){
        shell.exec(`git tag ${newVersion}`)
        // shell.exec(pushVersion)
    }

    console.log(`${newVersion}`)
}