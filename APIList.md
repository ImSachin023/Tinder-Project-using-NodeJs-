# DEV Tinder APIs -

## authRouter

- POST /signup
- POST /login
- post /logout

## profileRouter

- GET   /profile/view
- PATCH /profile/edit
- PATCH /profile/password - forgot password

## connectionRequestRouter

- POST /request/send/interested/:userID
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestedId
- POST /request/review/rejected/:requestedId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed-gets you the profile of others users on platform

status: ignored, interesred, accepted ,rejected
