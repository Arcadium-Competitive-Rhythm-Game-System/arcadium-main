# Arcadium

Rhythm Game competitive chart system.

## Supported Games & Ladders
- BMS
    - 7K
        - Easy Clear Ladder
        - Hard Clear Ladder

## What Is This?
Arcadium is a project that aims to add a more competitive nature to rhythm games, with an ELO system and a progression through tiers. Currently, the goal is to support BMS, but with the potential to support many more rhythm games over time!

### How Does It Work?
Both players and charts have an ELO rating, and you get matchmade with charts in a similar range. You have `10` minutes to succeed at the given ladder's requirements (currently Easy Clear and Hard Clear) in order to "win". After a match, both players and charts fluctuate in rating. This means charts that are rated too low, will naturally be bumped up to where they should be, which means hopefully over time, the ladder will continue to feel more fair and rewarding.

The goal of this project is to provide more ways to play rhythm games, and add a solo competitive flair that pushes you to your limits. If you're where you should be, you will win and lose at relatively the same rate.

### Score Integration
Currently, for ease of development and use, we integrate with [Bokutachi](https://boku.tachi.ac/) which is an Internet Ranking for BMS, and other home-based rhythm gaming. For arcade games, we may also consider [Kamaitachi](https://kamai.tachi.ac/) when that time comes. Or perhaps develop score hooks.

### The Future After Release
There are lots of ways we can take this app. The main goal is to keep it open source and allow anyone to develop additional ladders and mechanics. As long as discussions are kept close, I'm open to all forms of games and developments. 

For me, I'd like to integrate with Unnamed SDVX Clone (USC) next, and use the custom chart scale that's already on Bokutachi. This also means to make the backend and frontend more dynamic. Which will allow a large variety of games to play around with.

Additionally, for BMS, we currently just use the Sieglinde scale that Bokutachi uses. It works well enough, but it doesn't contain every chart. I'd like to develop algorithms or mechanics to give ELOs to charts that aren't on the Sieglinde scale.

## How to run

Ensure Docker Desktop is installed, and node/npm

Clone `.env.example` and rename it to `.env`.
- Fill it with any information you'd like. Docker creates the database from this information.

In the root, run `npm run build` or `npm run build-verbose`.
- `build` Builds the docker container and all the services within.
- `build-verbose` does the same, but you can see all the parts being built. It does not give you terminal access back until you stop the process.

Run `npm run migrate` to run the database migrations.

Run `npm run seed` to get all chart data and other necessary data into the database.