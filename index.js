var GitHubApi = require('github')

/*

# formatNotes()

Pass commit data into this function to format a markdown commit note. Data structure is based on what Github's compare endpoint returns.

Example data:

var dataExample = [{
	author: {
		login: 'brandonsheppard',
		html_url: 'https://github.com/brandonsheppard'
	},
	commit: {
		message: 'Etiam porta sem malesuada magna mollis euismod.'
	},
	sha: '685eb53d517a335d0d7a654472c9553679161ec8',
	html_url: 'https://github.com/my_repository/685eb53d517a335d0d7a654472c9553679161ec8'
},{
	author: {
		login: 'philconnah',
		html_url: 'https://github.com/philconnah'
	},
	commit: {
		message: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
	},
	sha: 'e34784dcbc43873c6900803db2e29c3555830e59',
	html_url: 'https://github.com/my_repository/e34784dcbc43873c6900803db2e29c3555830e59'
}]

Example output:

- [brandonsheppard](https://github.com/brandonsheppard) Etiam porta sem malesuada magna mollis euismod. [685eb53d517a335d0d7a654472c9553679161ec8](https://github.com/my_repository/685eb53d517a335d0d7a654472c9553679161ec8)
- [philconnah](https://github.com/philconnah) Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. [e34784dcbc43873c6900803db2e29c3555830e59](https://github.com/my_repository/e34784dcbc43873c6900803db2e29c3555830e59)

*/

function formatNotes(data){
	return data.map(commit => `- [${commit.author.login}](${commit.author.html_url}) ${commit.commit.message} [${commit.sha}](${commit.html_url})`).join('\n')
}

/*

# generateVersionNumber()

This function generates a date-based version number.

Year + Month + Iteration

So, the first release in March 2017 will be 17.3.0

If multiple releases occur in a month, the final number will increase. Otherwise, an entirely new verion number will be generated.

i.e.
generateVersionNumber('17.12.10');

Output:

Given that the date is 2017-12-01 (day is irrelevant)

17.12.11

*/

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
			body: `# All Changes \n${formatNotes(res.data.commits)}`
		}).then(res =>
			console.log(res)
		)
	)
);
