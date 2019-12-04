import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ContactItem } from '../ContactItem'

const OtherProps = {
  name: 'John Doe',
  email: 'jhondoe@mycompany.com',
  phone: '12342345656',
  contactId: '123',
  CreateUpdateContact: () => (action('CreateUpdateContact') as any),
  DeleteContact: () => (action('DeleteContact') as any),
}

storiesOf('ContactItem', module)
  .add('not-edit', () => <ContactItem isFavorite={false} {...OtherProps}/>)
  .add('edit', () => <ContactItem isFavorite={false} {...OtherProps}/>)
  .add('edit favorite', () => <ContactItem isFavorite={true} {...OtherProps}/>)
  ;