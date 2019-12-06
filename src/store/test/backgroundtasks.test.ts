import 'jest';
import { runSaga, Saga } from 'redux-saga';

import { sagaActions } from '../BackgroundTasks';
import * as Contacts from '../contacts';
import { ApplicationState } from '..'
import { ContactsKeys } from '../../constants'
import { mockWindowProperty } from './mockWindowProperty'
import { Action } from 'redux';

describe('Sagas tests', () => {

  const keysArray = ['12', '23'];
  const contact12: Contacts.Contact = { name: 'name2', email: 'email@email.ee', phone: '123', isFavorite: false };
  const contact23: Contacts.Contact = { name: 'name3', email: 'email@email.ee', phone: '222', isFavorite: false };
  const getItem = jest.fn();
  getItem.mockReturnValueOnce(JSON.stringify(keysArray))
  .mockReturnValueOnce(JSON.stringify(contact12))
  .mockReturnValueOnce(JSON.stringify(contact23))

  mockWindowProperty('localStorage', {
    getItem
  });

  test('loadContacts saga test', async () => {

    const dispatched: Action[] = [];

    const saga = await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: (): ApplicationState => (({
        contacts: {
          ...Contacts.initalContactsState,
          contacts: { '12': { name: 'name2', email: 'email', isFavorite: false } }
        }
      })),
    }, sagaActions[0] as Saga).toPromise();

    expect(dispatched).toEqual([ 
      { type: 'START_LOAD_CONTACTS' },
      { type: 'FINISH_LOAD_CONTACTS', contacts: {
        '12': contact12,
        '23': contact23,
      } }
     ])

    expect(getItem.mock.calls[0]).toEqual([ContactsKeys]);
    expect(getItem.mock.calls[1]).toEqual(['12']);
    expect(getItem.mock.calls[2]).toEqual(['23']);
  });
});