# Contacts Manager demo app

## Technologies in use

- The app is built with React, Redux and Redux-Saga.
  For such simple app there is no need to use Redux and Redux-Saga, but as I have enougth time I've included these technologies to showcs my skills
- Language: TypeScript
- Library: Material-UI. But layouting is done by me with CSS.
- Components (ContactItem, COntactLayout) are developed in isolation with StoryBook. To run use `npm run storybook`
- Form field validation is done with RegExp
- Commits follow angular conventions. During development I've comitted to [develop branch](https://github.com/fyodore82/contacts-manager/commits/develop). When development is finished, I've merged develop to master.
- UnitTests are done with jest (for Redux store) and storyshots (for components). To see run `npm run test`
- End-to-end testing is done with Cypress. 
  To run do either:
  - For interactive mode 
        npm run start
        npm run cypress:open
  - For automatic mode
        npm run cypress:test
  Video from last automatic run is here.
