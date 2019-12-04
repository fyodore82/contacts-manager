import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ContactsList } from '../ContactsList'
import { Contacts } from '../../store/contacts'

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
}

storiesOf('ContactsList', module)
  .add('not-edit', () => <ContactsList
    contacts={contacts}
    CreateUpdateContact={() => action('CreateUpdateContact') as any}
    DeleteContact={() => action('DeleteContact') as any}
  />)
  ;