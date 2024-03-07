# Anywhere 2.0

[Remastered Version of "Anywhere" by myself @[itss0urav] ]

- My GitHub:[https://github.com/itss0urav]
- My Linkedin:[https://www.linkedin.com/in/itssourav/]

Anywhere :

- client [https://github.com/itss0urav/Anywhere-frontend]
- server [https://github.com/itss0urav/Anywhere-BackEnd]
- admin [https://github.com/itss0urav/Anywhere-Admin]

Anywhere2.0 : [https://github.com/itss0urav/Anywhere2.0]

## Description

"Anywhere" is a web application designed to foster a sense of community and encourage meaningful discussions among its users. With its user-friendly interface, "Anywhere" provides a platform for individuals to come together and engage in a range of conversations, from casual chit-chat to in-depth discussions on topics of mutual interest. This app is intended to be a safe space where users can exchange ideas, share experiences, and build connections with like-minded individuals. Whether you're looking for a place to connect with others who share your hobbies or interests, or seeking a forum to engage in thought-provoking discussions on important issues, "Anywhere" is the ideal platform to explore and engage in online communities. With a variety of features and tools to suit your needs, "Anywhere" is the ultimate destination for anyone looking to connect, share, and grow with others.

## Features

## Admin Features

### User Management

- Login
- View Users
- Ban & Unban Users
- Assign Moderator

### Post Management

- Delete Posts
- View Reported Posts and ignore or delete them

### Feedback and Support

- Read Feedback/Support request and ignore or delete them

### Verification Management

- View Verification requests and ignore or delete them

### Banner Management

- Manage Banner (Create and Remove)

### Server Insights

- Total Users
- Total Active Users
- Total Banned Users
- Total Admins
- Total Moderators
- Total Posts
- Total Reports
- Total Support
- Total Verified Users
- Total Verification Requests

### Server Insights

- View logs ( req, res and status codes , message , etc)

## User Features

### Account Management

- Login/SignUp
- View Profile
- Update Profile
- Apply for profile verification
- Verified users can view total number of posts created at profile

### Post Interaction

- Create Post
- Edit Post
- Comment on post
- Reply to comments
- Share post
- Delete own post & comments & replies
- UpVote or Downvote Posts & Comments
- View the votes on any post and comments
- View most engaging comment of a post
- Report a post
- Select a category of posts

### Community Interaction

- Explore different communities
- Create community
- View banner content (announcement & ads)
- Search posts
- View Other’s profile
- Request for Help or Provide feedbacks
- Chat with Admin [Real time chat enabled using Tawk.to Chatbot API]

## Moderator Features

### Post Management

- Delete Post
- Delete comments
- Delete Replies

### User Management

- Ban user
- Unban User

### Report Management

Read Reports and take actions(ignore or delete post)

## Features

### Birthday Wishes

Anywhere 2.0 goes beyond just discussions and community engagement. We celebrate our users' special moments, including birthdays! Here's how our "Birthday Wishes" feature adds a personal touch to the user experience:

- **Automated Birthday Wishes:** Users receive personalized birthday wishes on their special day.

## Setup

.env

- PORT=
- MONGODB_URI=
- JWT_SECRET =

## ProtectedUrls

Place ProtectedUrls.js inside client/src/config

```JavaScript
 const ProtectedUrls = {
  baseUrl: "place your url",
  bannerPath: "place your url",
};

export default ProtectedUrls
```

## TawkTo

Place TawkTo.js inside client/src/config

For more info Visit :[https://help.tawk.to/article/react-js]

```JavaScript
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
export default function TawkTo() {
return (
    <div>
      <TawkMessengerReact
        propertyId="place your propertyId"
        widgetId="place your widgetId"
      />
    </div>
  );
}

```

# Preview

## User

<img src="/anywhere2.0/client/src/assets/Screenshots/User.png">

## Moderator

<img src="/anywhere2.0/client/src/assets/Screenshots/Moderator.png">

## Admin

<img src="/anywhere2.0/client/src/assets/Screenshots/Admin.png">

# About Me (Socials)

- GitHub: [https://github.com/itss0urav/]
- LinkedIn: [https://www.linkedin.com/in/itssourav/]
- Medium: [https://itss0urav.medium.com/]
- Instagramn: [https://www.instagram.com/itssourav.dev/]

- Portfolio (HTML , CSS): [https://itss0urav.netlify.app/]
- New Portfolio (React , Tailwind CSS): [https://github.com/itss0urav/portfolio-react]
