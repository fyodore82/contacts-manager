import { createSelector } from 'reselect'

import { ApplicationState } from './index'
import { Contacts } from './contacts'

const getContacts = (state: ApplicationState) => state.contacts.contacts;
const getFavoritesSwitch = (state: ApplicationState) => state.contacts.showFavorites;

export const makeGetVisibleContacts = () => createSelector(
  [getContacts, getFavoritesSwitch],
  (contacts, showFavorites) =>
    showFavorites ?
      Object.entries(contacts).reduce<Contacts>((r, [contcatId, contact]) => {
        if (contact.isFavorite) r[contcatId] = contact;
        return r;
      }, {}) : contacts
)