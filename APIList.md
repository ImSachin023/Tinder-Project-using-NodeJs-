# DEV Tinder APIs -

## authRouter

- POST /signup
- POST /login
- post /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password - forgot password

## connectionRequestRouter

<!-- status -> 1.["ignored", "interested"], 
               2.["accepted", "rejected"] -->

- POST /request/send/:status/:userID
- POST /request/review/:status/:requestId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profile of others users on platform

status: ignored, interesred, accepted ,rejected
