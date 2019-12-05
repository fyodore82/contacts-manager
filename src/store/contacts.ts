import { Action, Reducer } from 'redux';
import uuid from 'uuid/v1';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { ContactsKeys } from '../constants';
import { ApplicationState } from './index'

export interface Contact {
  name: string;
  email: string;
  phone?: string;
  isFavorite: boolean;
}

export interface Contacts {
  [id: string]: Contact;
}

export interface ContactsState {
  contacts: Contacts;
  newContactId?: string;
  newContact?: Contact;
  showFavorites: boolean;
  isLoading: boolean;
  error?: string;
}

const initalContactsState: ContactsState = {
  contacts: {},
  showFavorites: false,
  isLoading: false,
}

export const sagaActions = [
  function* watchCreateUpdateContact() {
    yield takeEvery<CreateUpdateContactAction>('CREATE_UPDATE_CONTACT', CreateUpdateContact)
  },
  function* watchDeleteContact() {
    yield takeEvery<DeleteContactAction>('DELETE_CONTACT', DeleteContact);
  },
]

function* CreateUpdateContact(action: CreateUpdateContactAction) {
  try {
    yield call([localStorage, localStorage.setItem], action.contactId, JSON.stringify(action.contact));
    const keys: string[] = yield select<(state: ApplicationState) => string[]>(state => Object.keys(state.contacts.contacts));
    yield call([localStorage, localStorage.setItem], ContactsKeys, JSON.stringify([action.contactId, ...keys]))
  }
  catch (error) {
    yield put<SetErrorAction>({ type: 'SET_ERROR', error });
  }
}

function* DeleteContact(action: DeleteContactAction) {
  try {
    yield call([localStorage, localStorage.removeItem], action.contactId);
    const keys: string[] = yield select<(state: ApplicationState) => string[]>(state => Object.keys(state.contacts.contacts));
    yield call([localStorage, localStorage.setItem], ContactsKeys, JSON.stringify(keys.filter(f => f !== action.contactId)))
  }
  catch (error) {
    yield put<SetErrorAction>({ type: 'SET_ERROR', error });
  }
}

interface ToggleShowFavoritesAction extends Action { type: 'TOGGLE_SHOW_FAVORITES' };

interface AddContactAction extends Action { type: 'ADD_CONTACT' };
interface CreateUpdateContactAction extends Action { type: 'CREATE_UPDATE_CONTACT'; contactId: string; contact: Contact };
interface DeleteContactAction extends Action { type: 'DELETE_CONTACT'; contactId: string; };
interface SetErrorAction extends Action { type: 'SET_ERROR'; error: string }

export interface StartLoadContactsAction extends Action { type: 'START_LOAD_CONTACTS'; };
export interface FinishLoadContactsAction extends Action { type: 'FINISH_LOAD_CONTACTS'; contacts: Contacts; error?: string; };

export const actionCreators = {
  ToggleShowFavorites: (): ToggleShowFavoritesAction => ({ type: 'TOGGLE_SHOW_FAVORITES' }),
  AddContact: (): AddContactAction => ({ type: 'ADD_CONTACT' }),
  CreateUpdateContact: (contactId: string, contact: Contact): CreateUpdateContactAction => ({ type: 'CREATE_UPDATE_CONTACT', contactId, contact }),
  DeleteContact: (contactId: string): DeleteContactAction => ({ type: 'DELETE_CONTACT', contactId }),
  StartLoadContacts: (): StartLoadContactsAction => ({ type: 'START_LOAD_CONTACTS' }),
}

type KnownActions = ToggleShowFavoritesAction |
  AddContactAction | CreateUpdateContactAction |
  DeleteContactAction | SetErrorAction |
  StartLoadContactsAction | FinishLoadContactsAction;

export const reducer: Reducer<ContactsState, KnownActions> = (state = initalContactsState, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_FAVORITES':
      return { ...state, showFavorites: !state.showFavorites };
    case 'ADD_CONTACT':
      return state.newContactId ? state : {
        ...state,
        newContactId: uuid(),
        // If new contact created when favorites switch is ON, add contact as favorite
        newContact: { name: '', email: '', isFavorite: state.showFavorites, },
      }
    case 'CREATE_UPDATE_CONTACT':
      const isNewContact = state.newContactId === action.contactId;
      return {
        ...state,
        error: undefined,
        newContactId: isNewContact ? undefined : state.newContactId,
        contacts: isNewContact ? {  // New contact add to top
          [action.contactId]: action.contact,
          ...state.contacts,
        } : {
          ...state.contacts,
          [action.contactId]: {
            ...state.contacts[action.contactId],
            ...action.contact
          },
        }
      }
    case 'DELETE_CONTACT':
      {
        const contacts = { ...state.contacts };
        if (contacts[action.contactId]) delete contacts[action.contactId];
        return {
          ...state,
          error: undefined,
          contacts,
          newContactId: action.contactId === state.newContactId ? undefined : state.newContactId,
        }
      }
    case 'START_LOAD_CONTACTS':
      return { ...state, isLoading: true, error: undefined }
    case 'FINISH_LOAD_CONTACTS':
      return action.error ? { ...state, isLoading: false, error: action.error }
        :
        { ...state, isLoading: false, contacts: action.contacts }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      }
    default:
      return state;
  }
}