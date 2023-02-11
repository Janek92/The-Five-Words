# The Five Words

![tutorial thumbnail](./src/assets/5fivewords.png)

The Five Words is application that helps polish-speaking people without any knowledge about english language, get familiar with almost 250 basics words.

https://the-five-words.web.app/

## Technologies

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux)

## Details

- created with the React
- data stored in Firebase Database
- data fetching by Firebase methods
- auth by Firebase Authentication
- suspense for data fetching with lazy loading
- redux toolkit used to manage context values
- handling errors using custom hook
- routing with React Router
- responsive website design

## Information

Application was created in polish language due to its destiny.

## Tutorial and project structure

Inside of project, you'll see the following folders and files:

```
PROJECT_ROOT
├── public              # static assets
└── src
    ├── assets          # images
    ├── components
    │   ├── pages       # page files
    │   ├── UI          # reusable components
    ├── hooks           # custom hooks
    ├── data            # files
    ├── store           # Redux context
```

## Starting

Download the repository to your local machine and run to download all missing dependencies:

```
npm install
```

After that you can run this project using:

```
npm run dev
```

**To manage the app content you need to create a new Firebase project. Check the official documentation: https://firebase.google.com/docs**

After creating your own firebase project, just create the `.env.local` file with the following data in the main folder and restart your application:

```
REACT_APP_FIREBASE_API_KEY=your api key
REACT_APP_FIREBASE_AUTH_DOMAIN=your auth domain
REACT_APP_FIREBASE_DATABASE_URL=your database url
REACT_APP_FIREBASE_PROJECT_ID=your project name
REACT_APP_FIREBASE_STORAGE_BUCKET=your storage bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your messaging sender ID
REACT_APP_FIREBASE_APP_ID=your app ID
```
