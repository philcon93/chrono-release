

// Generates a date-based tag number
function generateVersionNumber(previousVersion){
	let today = new Date();
	var newMajor = `${today.getFullYear()}.${parseInt(today.getMonth()) + 1}`;
	newMajor = newMajor.substr(2);
	oldMajorArr = previousVersion.split('.');
	oldMajor = `${oldMajorArr[0]}.${oldMajorArr[1]}`;

	if(oldMajor == newMajor){
		newVersion = `${newMajor}.${parseInt(oldMajorArr[2]) + 1}`;
	} else {
		newVersion = newMajor + '.0';
	}
	return newVersion;
}

// Returns existing tag
function setBase(tag){
	releaseData.base = tag;
	return n
}

// Get latest version
// Get current git tag
// Get new git tag
// Update package.json
// Update git tag
// Ask if want to update remote
// git push
