# Tinder 4 Animals
A remake of the Tinder dating app, with a spin. 
Inspired by [Tinder for Bananas](https://tinderforbananas.com/)

## Routes 
| Method        | URL           | Template  | Purpose           | Data  |
| ------------- |:-------------:| -----:|:-------------:| -----:|
GET | / | index.ejs | Home page |  |  | 
GET | auth/login | login.ejs | Show login form | user email, password via req.body | 
POST | auth/login |  |  | Accept form data from login form, validate the user, login user |  |  | 
GET | auth/signup | signup.ejs | Show signup form | user email, password, name, age, school, work, interests, animal via req.body | 
POST | auth/signup |  |  | accept form data from sign up form, create user if not already exists, login user |  |  | 
GET | auth/logout |  |  | clear user info | redirect to / |  |  | 
GET | /profile/:id | /profile/index.ejs | Show user specific info | prof_pics, user about, school, work, interests | 
GET | /profile/:id/edit | /profile/edit.ejs | Display current user info. Allow user to edit user info.Only current user can get to this screen | prof_pics user about, school, work, interests via req.body |
PUT | /profile/:id |  |  | Update prof_pic, user data, interests | redirect to /profile/:id |  |  | 
DELETE | /profile/:id |  |  | Logout user, delete user and associations, redirect to / | id from req.params.id | 
GET | /profile/:id/settings | /profile/settings.ejs | Show user settings | User can choose to logout or delete account | interestedIn via req.body | 
PUT | /profile/:id/settings |  |  | Update interestedIn | redirect to /profile/:id |  |  | 
GET | /potentials | /potentials/index.ejs | Shows potential cats/dogs to the user.  | User can dislike, like, or super like | Displays users that fit the isInterested gender(cat/dog) | Displays users that haven’t already been put in to the like/dislike table for the current user | userId (hidden), 1 profile pic, name, age, school/work (of potential) |
GET | /potentials/:potentialId | /potentials/show.ejs | Shows potential’s profile. User can dislike, like or super like | profile pics, name, age, school/work, about, isSuperLike | 
POST | /potentials/dislike/:id/:potentialId |  |  | Adds potential to the dislike table for the current user | Redirects to /potentials |  |  | 
POST | /potentials/like/:id/:potentialId |  |  | Adds potential to the like table for the current user. Adds boolean value isSuperLike | Redirects to /potentials or /potentials/match |  |  | 
GET | /potentials/match/:id/:potentialId | /potentials/match.ejs | Shows match if match logic fulfilled. User can send a message or keep swiping | Goes to /potentials |  |  | 
GET | /chatroom/:id | /chatroom/index.ejs | Shows all ongoing chats for the current user. Shows latest message |  |  | 
GET | /chatroom/:id/:potentialId | /chatroom/show.ejs | Shows chat with potential. Allows user to send a chat message to the potential  | content from req.body | id and potentialId from req.params | 
POST | /chatroom/:id/:potentialId |  |  | create new chat between id and potientialId |  |  | 


