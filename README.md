# Contacts Manager demo app

The app is deployed [here](https://contacts-manager.glitch.me/) 

## Technologies in use

- The app is built with React, Redux and Redux-Saga.
  For such simple app there is no need to use Redux and Redux-Saga, but as I have enougth time I've included these technologies to showcs my skills
- App is created with create-react-app, ejected to make config modifications.
- Language: TypeScript
- Library: Material-UI. But layouting is done by me with CSS. (See [ContactsItem](https://github.com/fyodore82/contacts-manager/blob/c926613003222f35a48f337d50e861e44b6c86ba/src/Contacts/ContactItem.tsx#L18) and [ContactsLayout](https://github.com/fyodore82/contacts-manager/blob/c926613003222f35a48f337d50e861e44b6c86ba/src/Contacts/ContactsLayout.tsx#L15))
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
        
  Video from last automatic run is [here](https://github.com/fyodore82/contacts-manager/tree/master/cypress/videos).
- ESlint is used with default settings from create-react-app