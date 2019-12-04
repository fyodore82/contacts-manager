import { all, call } from 'redux-saga/effects'
import * as Contacts from './contacts';

import { sagaActions } from './BackgroundTasks'

export interface ApplicationState {
  contacts: Contacts.ContactsState;
}

export const reducers = {
  contacts: Contacts.reducer,
}

export function* rootSaga() {
  yield all([
    ...Contacts.sagaActions.map(call),
    ...sagaActions.map(call),
  ])
}