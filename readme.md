# Simple Github Release

This script will create a release for a specified Github repository. It will generate a version number (based on [chronological versioning](https://gist.github.com/brandonsheppard/d242ba4ba99923d332f1afdcfa4fbf86)) and release notes ([based on commit history](https://gist.github.com/brandonsheppard/548a4cff7bc1a63e69397cb82269405b)).

## Usage

```
node index <TOKEN> <REPO_OWNER_USERNAME> <REPO_NAME> [draft]
```

## Params

- TOKEN - Github Personal access tokens - https://github.com/settings/tokens **required**
- REPO_OWNER_USERNAME - Owner of the Github repo username **required**
- REPO_NAME - Github repo name **required**
- draft - Make a draft release instead of a public release, not including this will make the release public **optional**

## Functions

### formatNotes()

Pass commit data into this function to format a markdown commit note. Data structure is based on what Github's compare endpoint returns.

Example data:

```
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
```

Example output:

```
[brandonsheppard](https://github.com/brandonsheppard) Etiam porta sem malesuada magna mollis euismod. [685eb53d517a335d0d7a654472c9553679161ec8](https://github.com/my_repository/685eb53d517a335d0d7a654472c9553679161ec8)

[philconnah](https://github.com/philconnah) Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. [e34784dcbc43873c6900803db2e29c3555830e59](https://github.com/my_repository/e34784dcbc43873c6900803db2e29c3555830e59)
```

### generateVersionNumber()

This function generates a date-based version number.

- Year + Month + Iteration

So, the first release in March 2017 would be `17.3.0`

#### Multiple releases per month

If multiple releases occur in a month, the final number will increase. Otherwise, an entirely new version number will be generated. i.e: `generateVersionNumber('17.12.10');`

Given that the date is 2017-12-01 (day is irrelevant) and there has already been a release this month: `17.12.11`
