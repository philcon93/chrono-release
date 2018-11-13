`npm i --save-dev chrono-release`

# Chrono Release

This script will create a release for the repository. It will generate a version number (based on [chronological versioning](https://gist.github.com/brandonsheppard/d242ba4ba99923d332f1afdcfa4fbf86)).

## Usage

```
chrono trigger // chrono -t
chrono version // chrono -v
```

## Functions

### generateVersionNumber()

This function generates a date-based version number.

- Year + Month + Iteration

So, the first release in March 2017 would be `17.3.0`

#### Multiple releases per month

If multiple releases occur in a month, the final number will increase. Otherwise, an entirely new version number will be generated. i.e: `generateVersionNumber('17.12.10');`

Given that the date is 2017-12-01 (day is irrelevant) and there has already been a release this month: `17.12.11`
