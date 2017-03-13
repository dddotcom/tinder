# Tinder 4 Animals
A remake of the Tinder dating app, with a spin.
Inspired by [Tinder for Bananas](https://tinderforbananas.com/)

## Screen shots
(Coming soon)

## Mock ups

### Login
![Login view mockups](http://res.cloudinary.com/dov5rx5fp/image/upload/v1489366992/Login_Wireframes_rl3r4y.png)

### In app
![In app view mockups](http://res.cloudinary.com/dov5rx5fp/image/upload/v1489366986/In_App_Wireframes_dvijhy.png)

### Profile
![Profile view mockups](http://res.cloudinary.com/dov5rx5fp/image/upload/v1489366996/Profile_wireframes_n8ssuc.png)

### Chat
![Chat view mockups](http://res.cloudinary.com/dov5rx5fp/image/upload/v1489366980/Chat_Wireframes_wp79lu.png)

## Routes
| Method        | URL           | Template  | Purpose           | Data  |
| ------------- |:-------------:| -----:|:-------------:| -----:|
|GET | / | index.ejs | Home page, User chooses to login or sign up |  |  
|GET | auth/login | login.ejs | Show login form, or user can log in with facebook | user email, password via req.body |
|POST | auth/login |  | Accept form data from login form, validate and login user, redirect to /potentials |  |
|GET | auth/signup | signup.ejs | Show signup form | user fields via req.body |
|POST | auth/signup |  |  accept form data from sign up form, create user if not already exists, create and associate random profile pic, login user, redirect to /potentials |  |
|GET | auth/logout |  |   clear user info redirect to / |  |
|GET | /profile | /profile/index.ejs | Show user specific info prof_pics, user about, school, work, interests, ability to add interests, ability to edit profile or go to settings | current user id from req.user.id, profile_pic and interest models|
|GET | /profile/edit | /profile/edit.ejs | Display current user info. A form allows the user to edit their info. User can shuffle their profile pic or reset it to the default pic | current user id from req.user.id, prof_pic and interest models|
|PUT | /profile/:id |   | Update User info redirect to /profile| current user id from req.user.id  |
|DELETE | /profile |  | Logout user, delete user and all associations, redirect to / | id from req.params.id, profile_pic, like (current user only), dislike (current user only), chat (all), and interest model|
|GET | /profile/:id/settings | /profile/settings.ejs | Show user settings, user can choose to logout or delete account, user can update interestedIn attribute via a form | interestedIn via req.body, current user id from req.user.id |
|PUT | /profile/:id/settings |  | Update interestedIn redirect to /profile |  |
|GET | /potentials | /potentials/index.ejs | Displays potential users that fit the isInterested gender(cat/dog) that the current user hasn't seen before. User can like, dislike, or superlike the potential. If user likes or superlikes the potential, app will check for a match | 1st profile pic, name, age, school/work of potential, current user info from req.user.id, profile_pic model |
|GET | /potentials/:potentialId | /potentials/show.ejs | Closer look into a  potential’s profile which shows interests, about, and all profile pics. Current user can dislike, like or super like. If like or super like, then app will check for a match | profile pic model, potential and current user info |
|POST | /potentials/dislike/:potentialId |  | Adds potential to the dislike table for the current user Redirects to /potentials  |  |
|POST | /potentials/like/:potentialId |   | Adds potential to the like table for the current user. Adds boolean value isSuperLike. Shows match modal if it is a match|  |  
|GET | /chatroom | /chatroom/index.ejs | Shows all ongoing chats for the current user. Shows latest message of each chat |  |
|GET | /chatroom/:potentialId | /chatroom/show.ejs | Shows chat with potential. Allows user to send a chat message to the potential  | content from req.body, id and potentialId from req.params |
|POST | /chatroom/:potentialId |   | create new chat between id and potentialId |  |  
|GET | /profile/getNewPic/:picId |   | get's a random gif from the giphy API for the current user. Saves it to the db |  |  
|GET | /profile/reventPic/:picId |   | assigns the current user's profile pic to the default cat or dog depending on the user's animal |  |  
|POST | /profile/addInterest |   | adds new interests for the current user and performs the association |  |  
|DELETE | /profile/addInterest/:interestId |   | deletes the interest association from the current user |   |
|GET | /auth/facebook |   | requests login via facebook for the app, user must give the tinder app permissions to access basic profile data |  |  
|GET | /auth/callback/facebook |   | deletes the interest association from the current user |  Signs user in by authenticatin via facebook|  |

## Database

### Tables/models
By default all tables come with the following attributes:
* id
* createdAt
* updatedAt

#### Animals Table
| id        | name           |
| ------------- |:-------------:|
| 1  | cat |
| 2      | dog      |

#### Animal Model
Attributes
* name: DataTypes.STRING

Associations
(none)

======

#### Users Table
| id        | email| password|  name|  age|  school|  work|  about|  animalId|  interestedIn|
| ------------- |:-------------:| ------------- |:-------------:| ------------- |:-------------:| ------------- |:-------------:| ------------- |:-------------:|
| 1  | hello@kitty.com | (hashed)| Hello Kitty| 7 | Cat University| | I am a cat going to school| 1 | 2|
| 2  | doge@doge.com | (hashed)| Doge| 10 | | H&R Block | I am a dog that loves doing taxes| 2 | 1|
| 3  | jake@dog.com | (hashed)| Jake the Dog| 12 | | | I am already with Lady R| 2 | 1|

Note:
By default, 1(cat) interestedIn 2(dog)
If coming from facebook use the following fields in the facebook api:
  * name.givenName as name
  * email as email
  * \_json.age\_range.min as age, age is then converted to cat or dog years
  * gender female = animalId 1 (cat)
  * gender male = animalId 2 (dog)


#### User Model
Attributes
* email: DataTypes.STRING
* name: DataTypes.STRING
* age: DataTypes.INTEGER
* school: DataTypes.STRING
* work: DataTypes.STRING (limit 30 chars)
* about: DataTypes.TEXT (limit 30 chars)
* animalId: DataTypes.INTEGER
* interestedIn: DataTypes.INTEGER

Associations
* models.user.hasMany(models.chat);
* models.user.hasMany(models.like);
* models.user.hasMany(models.dislike);
* models.user.hasMany(models.profile_pic);
* models.user.belongsToMany(models.interest, {through: models.users_interests});

======

#### Profile_pics table

| id    | url     | userId |
| :------------- | :------------- | :--- |
| 1       | http://cat.png       | 1  |
| 2       | http://cat1.png       | 1  |
| 3       | http://dog.png       | 2 |
| 4       | http://dog.png       | 3  |

What's going on: _Hello Kitty has 2 profile pics, Doge and Jake each have 1_

#### profile_pic model
Attributes
* userId: DataTypes.INTEGER
* url: DataTypes.STRING

Associations
* models.profile_pic.belongsTo(models.user);

======

#### Chats table
| id     | userId     | userIdTo    | content    |
| :------------- | :------------- | :------------- | :------------- |
| 1       |1       | 2       | Hey Doge what's up       |
| 2       |2       | 1       | Nm, Hello Kitty       |
What's going on: _Hello Kitty and Doge are chatting_

_Hello Kitty: "Hey Doge what's up"_

_Doge: "Nm, Hello Kitty"_

#### chat model
Attributes
* userId: DataTypes.INTEGER
* userIdTo:DataTypes.INTEGER
* content: DataTypes.TEXT

Associations
* models.chat.belongsTo(models.user);

======

#### Likes table
| Id    | userId    |userIdLiked     | isSuperLike    |
| :------------- | :------------- | :------------- | :------------- |
| 1       | 1       |2       | true       |
| 2       | 2       |1       | false       |
| 3       | 3       |1       | false       |
What's going on: _Hello Kitty Super Liked Doge_

_Doge Liked Hello Kitty (this fulfills a match condition)_

_Jake the Dog Liked Hello Kitty_

There is a match because (in ROW 1 userId === userIdLiked) && (in ROW 2 userIdLiked === userId)

#### like model
Attributes
* userId: DataTypes.INTEGER
* userIdLiked: DataTypes.INTEGER
* isSuperLike: DataTypes.BOOLEAN

Associations
* models.like.belongsTo(models.user);

======

#### Dislikes table
| Id    | userId    |userIdDisliked     |
| :------------- | :------------- | :------------- |
| 1       | 1       |3       |
What's going on:
_Hello Kitty disliked Jake the Dog_

This also means that Jake and Hello Kitty will never have a chance to chat

#### dislike model
Attributes
* userId: DataTypes.INTEGER
* userIdDisliked: DataTypes.INTEGER

Associations
* models.dislike.belongsTo(models.user);

======

#### Interests table

| id | name     |
| :------------- | :------------- |
| 1     | eating      |
| 2     | reading      |
| 3     | surfing      |

#### interest model
Attributes
* name: DataTypes.STRING

Associations
* models.interest.belongsToMany(models.user, {through: models.users_interests});

======

#### Users_interests table
| Id    | userId    |interestId     |
| :------------- | :------------- | :------------- |
| 1       | 1       |1       |
| 2       | 1       |2       |
| 3       | 2       |1       |
| 4       | 3       |3       |
What's going on:
_Hello Kitty is interested in Eating and reading_

_Doge is interested in Eating_

_Jake the Dog is interested in Surfing_

#### users_interests model
Attributes
* userId: DataTypes.INTEGER
* interestId: DataTypes.INTEGER

Associations
(none)

## Node Modules used
* express
* ejs
* express-ejs-layouts
* body-parser
* sequelize
* pg
* pg-hstore
* async
* bcrypt
* passport
* passport-local
* express-session
* connect-flash
* moment
* dotenv
* passport-facebook
* giphy-api
