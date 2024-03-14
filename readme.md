# Firebase template

This is a template for a Firebase project with a webapp, firestore rules, storage rules, remote config, functions, developer friendly, and with a built-in CI.

## Features in detail

// TODO

## Understanding the repo

// TODO

## Instructions

1. Fork this template;
2. Search the code for `<FIX:` and address the required comments;
3. Deploy with firebase for a first time;
   1. During the deployment, select that you already have a Github repo and associate with it;
   2. Do not let the Firebase CLI override your files;
   3. After the Github secrets are set, search for `<FIX:SECRET_NAME>` and replace with the secret added to your Github repo;
4. (This step is mandatory to enable deploying Firestore rules, Storage rules, and Remote Config) Go to the Cloud Console, and add the following permisson to the GithubAction role:
   1. TBD, list the permissions here
5. ...
6. Start the local development with a `npm start`;