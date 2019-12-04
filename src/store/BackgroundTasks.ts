import { call, put } from 'redux-saga/effects';
import { Contacts, Contact, StartLoadContactsAction, FinishLoadContactsAction } from './contacts';
import { ContactsKeys } from '../constants';

export const sagaActions = [
  function* loadContacts() {
    let contacts: Contacts = {};
    try {
      yield put<StartLoadContactsAction>({ type: 'START_LOAD_CONTACTS' });
      const keysString: string = yield call([localStorage, localStorage.getItem], ContactsKeys);
      const keys: string[] = JSON.parse(keysString);
      if (Array.isArray(keys))
        for (let key of keys)
          try {
            const contactString: string = yield call([localStorage, localStorage.getItem], key);
            const contact: Contact = JSON.parse (contactString);
            contacts[key] = contact;
          } catch { }  // In case of any error with particular contact - ignore it
    }
    catch {}
    finally {
      // In case of error - return empty list.
      // In case of success - contacts will hold correct items.
      yield put<FinishLoadContactsAction>({ type: 'FINISH_LOAD_CONTACTS', contacts });
    }
  },
]