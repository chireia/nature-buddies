## Frontend Code Challenge

### My Personal Roadmap
###### Updated: 2021-03-1 3:34 (UTC-4)

- [x] Create a React App
- [x] Setup formatter and linter
- [x] Setup Netlify deploy
- [x] Setup React Router 
- [x] Create default layouts for login and authenticated user
- [x] Create the login interface integrated with Auth0
- [x] Setup MirageJs as local simulated backend
- [x] Create the Plants/Herbs CRUD with Formik and Yup
- [ ] Create the Dashboard 🕘
- [ ] Enhance with optional requirements ✨

### Let's code!

<img src="https://i.giphy.com/media/G6sJqVpD1U4jC/giphy.webp" alt="" width="50%" height="50%">

---
### Challenge Description
<details>
  <summary>Click to expand!</summary>

A company wants to develop a home grown fresh plants monitoring system for casual users. The hardware development is still happening, but they want to be in touch with their future customers by providing a solution that already works without their IoT hardware for now and starting collecting feedback from them.

These are the high level requirements for the system:

- User Registration
- Add/Remove plants/herbs
  - Give it a name and/or type - ex: Thyme, Basil, Lettuce, etc
- Register health/status for a given plant and save that as a historical information ( will be captured by the IoT device later )
  - Soil moisture - 0-100%
- User Dashboard
  - Show health status of each plant for the user
  - Can also show current weather on users location (optional)

Feel free to add or change things on top of that idea. For example, you can register other attributes of the plant, show charts, simulate real time data changes, etc. For the current weather, you can get user location from the browser and use a third party API for weather info.

Share your solution via URL to your git repository and would be cool to either deploy it somewhere or send a video of it working. Don’t need to voice over on top of it or do anything fancy. Loom is a nice tool for that.

### Requirements

- React
- State Management ( Redux, Hooks, MobX, etc )
- CSS (styled-components, CSS modules, or plain CSS/SASS/LESS)
- For the backend, you can simulate using something like a backend as a service solutions like Firebase, AWS Amplify, Hasura, DGraph or just local with tools like Mirajs and Json-server.
- For the authentication part, you can offload that to an identity provider like Firebase Auth, Auth0, Cognito, Okta, etc.

### Hints

- You don't need to spend time creating a dev/build environment. You can use create-react-app (and other alike tools) for that
- Third-party libraries are allowed.
- As a company, we believe that communication is the key to success. So if something is not clear to you, or if you have doubts on what you can use, reach the devs

### Happy coding!

<img src="https://user-images.githubusercontent.com/5693916/30273942-84252588-96fb-11e7-9420-5516b92cb1f7.gif" data-canonical-src="https://user-images.githubusercontent.com/5693916/30273942-84252588-96fb-11e7-9420-5516b92cb1f7.gif" width="150" height="150" />

#### References

- https://miragejs.com/
- https://github.com/typicode/json-server
- https://firebase.google.com/
- http://auth0.com/
- https://hasura.io
- https://medium.com/@Ari_n/8-weather-api-alternatives-now-that-darksky-is-shutting-down-42a5ac395f93
</details>