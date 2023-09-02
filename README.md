# Yana - Ai based note taking and learning platform

Welcome to the Yana repository  , Yana is a note taking app that stores all your notes on the cloud ,  uses ai to read and understand your notes and create exam preparation questions and quizzes based on that in an organized manner

## Structure 

`src/routes` : where most of the front end is written using svelte and sveltekit , to create each page and route for the user based on account and selected course.

`src/api` : where different backend interactions take place with the apis including the `AI` and the exporting files as pdfs.

`src/auth` : where the user autentication took place and connection to firebase and the database.

## Developing
Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
