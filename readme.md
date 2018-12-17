`npm i --save-dev chrono-release`

# Chrono Release

Creates a new git tag for a git repository. It will generate a version number, based on chronological versioning..

## Usage

```
chrono-release trigger
```

Generates a date-based version number.

- Year + Month + Iteration

So, the first release in March 2019 would be `19.3.0`

**Multiple releases per month**

If multiple releases occur in a month, the final number will increase. Otherwise, an entirely new version number will be generated.

Given that the date is 2019-03-05 (day is irrelevant) and there has already been  release this month, the next release number will be: `19.3.1`
