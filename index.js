var GitHubApi = require('@octokit/rest')

// Pass commit data into this function to format a markdown commit note.
// Data structure is based on what Github's compare endpoint returns.
function formatNotes(data){
	return data.map(commit => `- [:information_source:](${commit.html_url}) - ${commit.commit.message} - [${commit.author.login}](${commit.author.html_url})`).join('\n')
}

// This function generates a date-based version number.
function generateVersionNumber(previousVersion){
	let today = new Date();
	var newMajor = `${today.getFullYear()}.${parseInt(today.getMonth()) + 1}`
	newMajor = newMajor.substr(2);
	oldMajorArr = previousVersion.split('.')
	oldMajor = `${oldMajorArr[0]}.${oldMajorArr[1]}`

	if(oldMajor == newMajor){
		newVersion = `${newMajor}.${parseInt(oldMajorArr[2]) + 1}`
	} else {
		newVersion = newMajor + '.0'
	}
	return newVersion;
}

/* --------------- */

var github = new GitHubApi();
var releaseData = {
	username: process.argv[2],
	password: process.argv[3],
	base: '',
	repository: {
		owner: process.argv[4],
		name: process.argv[5]
	},
	'draft': process.argv[6] == 'draft' ? true : false,
	name: ''
}

github.authenticate({
	type: 'basic',
	username: releaseData.username,
	password: releaseData.password
})

function setBase(n){
	releaseData.base = n
	return n
}

github.repos.getLatestRelease({
	owner: releaseData.repository.owner,
	repo: releaseData.repository.name
}).then(res =>
	github.repos.compareCommits({
		owner: releaseData.repository.owner,
		repo: releaseData.repository.name,
		head: 'master',
		base: setBase(res.data.tag_name)
	}).then(res =>
		github.repos.createRelease({
			owner: releaseData.repository.owner,
			repo: releaseData.repository.name,
			tag_name: generateVersionNumber(releaseData.base),
			name: generateVersionNumber(releaseData.base) + ' ' + releaseData.name,
			draft: releaseData.draft,
			body: `# All Changes \n${formatNotes(res.data.commits)}`
		}).then(res =>
			console.log(res)
		)
	)
);
