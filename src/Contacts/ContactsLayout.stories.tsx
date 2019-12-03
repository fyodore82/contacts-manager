import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ContactsLayout } from './ContactsLayout'
import { Contacts } from '../store/contacts'

const contacts: Contacts = {
  '123': {
    name: 'John Doe',
    email: 'jhondoe@mycompany.com',
    phone: '12342345656',
    isFavorite: false,
  },
  '234': {
    name: 'John Doe',
    email: 'jhondoe@mycompany.com',
    phone: '562819288',
    isFavorite: false,
  },
  '22134': {
    name: 'John Doe',
    email: 'jhondoe@mycompany.com',
    phone: '562819288',
    isFavorite: true,
  },
  '222134': {
    name: 'John Doe',
    email: 'jhondoe@mycompany.com',
    phone: '562819288',
    isFavorite: true,
  },
  '221434': {
    name: 'John Doe',
    email: 'jhondoe@mycompany.com',
    phone: '562819288',
    isFavorite: true,
  },
  '221134': {
    name: 'John Doe',
    email: 'jhondoe@mycompany.com',
    phone: '562819288',
    isFavorite: true,
  },
}

storiesOf('ContactsLayout', module)
  .add('favorites-off', () => <ContactsLayout contacts={contacts} favoritesSelected={false}/>)
  ;