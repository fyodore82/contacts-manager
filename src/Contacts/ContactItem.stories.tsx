import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ContactItem } from './ContactItem'

const OtherProps = {
  name: 'John Doe',
  email: 'jhondoe@mycompany.com',
  phone: '12342345656',
  StartEdit: () => { action('StartEditing') }
}

storiesOf('ContactItem', module)
  .add('not-edit', () => <ContactItem isFavorite={false} isEditing={false} {...OtherProps}/>)
  .add('edit', () => <ContactItem isFavorite={false} isEditing={true} {...OtherProps}/>)
  .add('edit favorite', () => <ContactItem isFavorite={true} isEditing={true} {...OtherProps}/>)
  ;