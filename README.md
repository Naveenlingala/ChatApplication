# Chat Application using Firebase and React

This is a chat application built using Firebase and React. The application allows users to log in with their Google accounts, create and join chat rooms, send and receive real-time messages, and have private conversations with other users. The project utilizes Firebase Firestore to store chat room data and message history.

## Features

1. Google User Authentication: Users can log in and log out using their Google accounts via Firebase Authentication.

2. Chat Rooms: Users can create, join, and leave chat rooms.

3. Real-Time Messaging: Messages sent by users appear in the chat room in real time.

4. Message History: The chat application stores the history of messages for each chat room, which is visible to users when they join the room.

5. Private Messaging: Users can send private messages to other users.

## Instructions

To set up and deploy the application, follow the steps below:

1. Clone the repository:
   ```shell
   git clone https://github.com/Naveenlingala/ChatApplication
   ```

2. Navigate to the project directory:
   ```shell
   cd ChatApplication
   ```

3. Install dependencies:
   ```shell
   npm install
   ```
   
4. Install Firebase:  
   ```shell
   npm install Firebase
   ```
5. Login Firebase:
   ```shell
   npm install -g firebase-tools
   ```
8. Set up a new Firebase project:
   - Go to the Firebase Console (https://console.firebase.google.com/) and create a new project.
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/4d3f48ad-f9c3-47fa-8dfe-a98c2b721ee1)
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/1d0a34b0-5198-4a57-9f51-15d2a9a7e700)
    
9. Enable Firestore, Authentication, and Hosting services for your project.:
   - Go to Authentication, Enable Google Authentication and set some name or provider for it
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/a8183934-61c1-4672-89ac-144c4e33a259)
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/ee318f22-f344-4b1e-93cf-b312e939316a)
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/13d705f4-cda7-4cfa-a433-d2c0c99bd498)
   
  - Go to Cloud Firestore where click create Database and set start in test mode, select a server then a database will be created
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/9833dba9-335f-4946-8991-2fe21e5b7eeb)
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/a8db15ae-a569-427a-8f42-bc195e43ea22)
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/d990b07b-e801-4a94-97dc-790723f7065d)
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/5254807a-e7cd-4aee-8de6-9f39396335fb)
   
   - Start a App and set a name to it
   ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/079b7844-ece3-43ee-bb21-ac8c5d7093a6)
  
  - Create a firebase.js in root directory and paste the given credentials, it should look somethig like this with the strings are replaced
  ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/99993eed-e6ad-4f2e-9d0c-4da18f951bf5)
  
  - Run the Following commands and Note before running deploy makesure to set site in firebase.json
  ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/bea94e23-774d-49ec-826f-4337409885b8)
  ![image](https://github.com/Naveenlingala/ChatApplication/assets/60232407/3db39fcb-e494-4370-8711-9769a919d724)
  
  
## Firestore used Schema

The Schema structure is designed to optimize query efficiency by storing conversation IDs in separate collections for private chats and group chats and the schema for this application is as follows:

- **conversations**: Collection to store all messages for both private and group conversations.
  - **conversationId**: Document ID representing a specific conversation.
    - **messages**: Subcollection to store all messages for the conversation.
      - **messageId**: Document ID representing a specific message.
        - **senderId**: ID of the user who sent the message.
        - **content**: Content of the message.
        - **timestamp**: Timestamp when the message was sent.
        - **senderName**: Name of the sender.
        - 

- **private-chat**: Collection to store conversation IDs for private chats.
  - **userId**: Document ID representing a user.
    - **conversationId**: ID of the private conversation between the user and another user.
    - **UsersDetails**: Details of both Users.
    

- **group-chat**: Collection to store conversation IDs for group chats.
  - **groupId**: Document ID representing a group.
    - **GroupName**: Name of the Group.
    - **members**: Array of members of Group.
    - **conversationId**: ID of the group conversation.

- **users**: Collection to store user information.
  - **userId**: Document ID representing a user.
    - **name**: User's name.
    - **email**: User's email address.
    - **avatar**: User's profile picture URL.
    - **groupChats**: List of Joined Group chat ids.
    - **privateChats*: List of Joined Private chat ids.





