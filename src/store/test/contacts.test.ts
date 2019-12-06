import 'jest';
import { runSaga, Saga } from 'redux-saga';

import * as Contacts from '../contacts';
import { ApplicationState } from '../../store'
import { ContactsKeys } from '../../constants'
import { mockWindowProperty } from './mockWindowProperty'
import { Action } from 'redux';

jest.mock('uuid/v1', () => ({
  __esModule: true, // this property makes it work
  default: () => 'uniqueId-123'
}));

test('Contacts.reducer inital test', () => {
  expect(Contacts.reducer(undefined, { type: 'init' } as any))
    .toEqual(Contacts.initalContactsState);
});

test('Contacts.reducer TOGGLE_SHOW_FAVORITES action', () => {
  expect(Contacts.reducer({ ...Contacts.initalContactsState, showFavorites: false }, { type: 'TOGGLE_SHOW_FAVORITES' }))
    .toEqual({ ...Contacts.initalContactsState, showFavorites: true });
});

test('Contacts.reducer ADD_CONTACT action', () => {
  expect(Contacts.reducer(Contacts.initalContactsState, { type: 'ADD_CONTACT' }))
    .toEqual({
      ...Contacts.initalContactsState,
      newContactId: 'uniqueId-123',
      newContact: { name: '', email: '', isFavorite: false },
    });
});

const contactToUpdate: Contacts.Contact = { name: 'name1', email: 'email@email', isFavorite: true };
test('Contacts.reducer CREATE_UPDATE_CONTACT action', () => {
  expect(Contacts.reducer(Contacts.initalContactsState,
    {
      type: 'CREATE_UPDATE_CONTACT',
      contactId: '123',
      contact: contactToUpdate
    }))
    .toEqual({
      ...Contacts.initalContactsState,
      contacts: { '123': contactToUpdate },
    });
});

const contactToDelete: Contacts.Contact = { name: 'name1', email: 'email@email', isFavorite: true };
const contactIdToDelete = '234';
test('Contacts.reducer DELETE_CONTACT action', () => {
  expect(Contacts.reducer({
    ...Contacts.initalContactsState,
    contacts: { [contactIdToDelete]: contactToDelete },
  },
    { type: 'DELETE_CONTACT', contactId: contactIdToDelete }))
    .toEqual(Contacts.initalContactsState);
});

test('Contacts.reducer START_LOAD_CONTACTS action', () => {
  expect(Contacts.reducer({ ...Contacts.initalContactsState, error: 'error' },
    { type: 'START_LOAD_CONTACTS' }))
    .toEqual({ ...Contacts.initalContactsState, error: undefined, isLoading: true });
});

const contactsToLoad: Contacts.Contacts = {
  '123': { name: 'name2', email: 'email@email.ee', phone: '123', isFavorite: false },
  '345': { name: 'name3', email: 'email345@email.ee', phone: '345', isFavorite: true },
}
test('Contacts.reducer FINISH_LOAD_CONTACTS action', () => {
  expect(Contacts.reducer({ ...Contacts.initalContactsState, isLoading: true },
    { type: 'FINISH_LOAD_CONTACTS', contacts: contactsToLoad }))
    .toEqual({ ...Contacts.initalContactsState, contacts: contactsToLoad, isLoading: false });
});

describe('Sagas tests', () => {

  const setItem = jest.fn();
  const removeItem = jest.fn();
  mockWindowProperty('localStorage', {
    setItem,
    removeItem,
  });

  test('CreateUpdateContact saga test', async () => {
    const contactId = '123';
    const action = { type: 'CREATE_UPDATE_CONTACT' as 'CREATE_UPDATE_CONTACT', contact: contactToUpdate, contactId }

    const dispatched: Action[] = [];

    const saga = await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: (): ApplicationState => (({
        contacts: {
          ...Contacts.initalContactsState,
          contacts: { '12': { name: 'name2', email: 'email', isFavorite: false } }
        }
      })),
    }, Contacts.CreateUpdateContact as Saga, action).toPromise();

    const striggifiedContact = JSON.stringify(contactToUpdate);
    expect(setItem.mock.calls[0]).toEqual([contactId, striggifiedContact]);
    expect(setItem.mock.calls[1]).toEqual([ContactsKeys, JSON.stringify([contactId, '12'])]);
  });

  test('DeleteContact saga test', async () => {
    const contactId = '123';
    const action = { type: 'DELETE_CONTACT' as 'DELETE_CONTACT', contactId }

    const dispatched: Action[] = [];

    const saga = await runSaga({
      dispatch: (action: Action) => dispatched.push(action),
      getState: (): ApplicationState => (({
        contacts: {
          ...Contacts.initalContactsState,
          contacts: {
            '12': { name: 'name2', email: 'email', isFavorite: false },
            '123': { name: 'name22', email: 'email2', isFavorite: false }
          }
        }
      })),
    }, Contacts.DeleteContact as Saga, action).toPromise();

    expect(removeItem.mock.calls[0]).toEqual([contactId]);
    expect(setItem.mock.calls[2]).toEqual([ContactsKeys, JSON.stringify(['12'])]);
  });
});