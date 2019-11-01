# MyDiary

[![Build Status](https://travis-ci.com/Aphrodis/MyDiary_Challenge.svg?branch=develop)](https://travis-ci.com/Aphrodis/MyDiary_Challenge) [![Coverage Status](https://coveralls.io/repos/github/Aphrodis/MyDiary_Challenge/badge.svg?branch=develop)](https://coveralls.io/github/Aphrodis/MyDiary_Challenge?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/910f867611f0450cfc87/maintainability)](https://codeclimate.com/github/Aphrodis/MyDiary_Challenge/maintainability) [![Known Vulnerabilities](https://snyk.io/test/github/Aphrodis/MyDiary_Challenge/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Aphrodis/MyDiary_Challenge?targetFile=package.json)

## Project Overview
MyDiary is an online journal where users can pen down their thoughts and feelings.

## Tools/Technologies Used
- HTML
- CSS
- JavaScript
- Server side Framework: Node/Express
- Linting Library: ESLint
- Style Guide: Airbnb
- Testing Framework: Mocha

## Set up
- Clone this repository: ```git clone https://github.com/Aphrodis/MyDiary_Challenge.git```
- Enter in the directory: ```cd MyDiary_Challenge```
- Install all packages: ```npm install```
- Run the build: ```npm run build```
- Start the app: ```npm run start```
- Run tests: ```npm run test```


## UI Features
- Users can create an account.
- User can sign in.
- Users can view all entries to their diary.
- Users can view the contents of a diary entry.
- Users can add entry.
- Users can modify an entry.
- Users can delete an entry.
- Users can set and get daily notifications that prompt them to add an entry to their diary.

## UI templates
The UI templates can be accessed at: *https://aphrodis.github.io/MyDiary_Challenge/UI/*

## API Endpoints
| Endpoint | Method   | Functionality| 
|:----------:|:----------:|:--------------:|
| /api/v1/auth/signup | POST | Sign up |
| /api/v1/auth/signin | POST | Sign in |
| /api/v1/entries | GET | Get all entries|        
| /api/v1/entries/:id | GET | Get a specific entry|
| /api/v1/entries/:id | POST | Add a new entry |
| /api/v1/entries/:id | PATCH | Edit an entry |
| /api/v1/entries/:id | DELETE | Delete an entry |

## App hosted on Heroku
[MyDiaryApp](https://mydiary-application.herokuapp.com)