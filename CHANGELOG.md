# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/Pukimaa/kayano/compare/v1.0.0-alpha...v1.2.0) (2021-10-20)

### [1.2.0-alpha] - 2021-10-20
### Added
- New config system (sensible data is still in `.env` like the token or the ID of the Owner)
- Content for the `info` command
- `uwufy` command
### Changed
- README now is a little more clear
- Redesigned the `userinfo` command
- Bumped various dependencies ([#6](https://github.com/kayano-bot/kayano/pull/6), [#5](https://github.com/kayano-bot/kayano/pull/5), [#4](https://github.com/kayano-bot/kayano/pull/4))
- Switching from `npm` to `yarn`
- More consitency for the `reddit` and `meme` command
- `raw` moved to the Context Menu (right click on a message)
### Removed
- Scope for dependabot commits got removed
- Temporarly removed the `info` command due a bug (discord(.js) being weird with registering commands)
- Guild only registering is now gone

### [1.1.1-alpha] - 2021-10-13
### Removed
- Dependabot updates `node-fetch` to v3 (because that would break the bot and v2 still gets updates)
### Fixed
- Wrong links in the CHANGELOG

## [1.1.0-alpha] - 2021-10-13
### Added
- Eslint
- Dependabot
- Clear command
- Donation "Badge" in the `userinfo` command for users who donated
- More info added to `userinfo`
- `customEmojis.js` so that you can replace them with your own emojis (when using custom ones the bot must be in the server where the emojis are from)
### Removed
- `.vsls.json` as it should be ignored
### Fixed
- Wrong link in CHANGELOG for `1.0.0-alpha`
- `clear` command saying it deleted 0 messages when it deleted 1 message (I don't know why it just happens on author though)

## [1.0.0-alpha] - 2021-10-12
### Added
- `.vsls.json` to `.gitignore` because I don't care what you share with your Live Share session
- Some minor opotical changes (new line at the end of a file etc.)
- Sponsor button on Github
- License
- More information in the README
- Follows the SemVer how it should 
- some minor consitency improvements
### Changed
- Forgot to bump the version number
- `discord.js@13.1.0` > `discord.js@13.2.0`
- `@discordjs/rest@0.1.0-canary.0` > `@discordjs/rest@0.1.1-canary.0`
### Removed
- A `console.log` that was just for testing something (in `raw.js`)
### Fixed
- Typos

## [0.0.2] - 2021-10-11
### Added
- Changelog
- Example for the `.env` file
- Readme
- Error handler now sends a message in a channel too (needs to be defined in the `.env` file)
- Ban command
- Raw command
- Reddit command
- Meme Command
### Changed
- Reworked the status (also with a little Squid Game reference)
- The text for the `info` command is now `soon™️`
### Removed
- Ping command (due to bugs)

## [0.0.1] - 2021-10-3
### Added
Inital commit

[Unreleased]: https://github.com/kayano-bot/kayano/compare/stable...development
[1.1.1-alpha]: https://github.com/kayano-bot/kayano/compare/v1.1.0-alpha...v1.1.1-alpha
[1.1.0-alpha]: https://github.com/kayano-bot/kayano/compare/v1.0.0-alpha...v1.1.0-alpha
[1.0.0-alpha]: https://github.com/kayano-bot/kayano/compare/v0.0.2...v1.0.0-alpha
[0.0.2]: https://github.com/kayano-bot/kayano/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/kayano-bot/kayano/commits/v0.0.1
