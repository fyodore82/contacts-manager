import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Contacts } from '../store/contacts'
import { ContactItem } from './ContactItem'

const useStyles = makeStyles(theme => ({
  contactItem: {
    marginBottom: theme.spacing(1),
  }
}));

interface ContactsListOwnProps {
  contacts: Contacts;
}

export const ContactsList: FC<ContactsListOwnProps> = ({ contacts }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState<string | undefined>(undefined);
  return (
    <>
      {Object.entries(contacts).map(([id, contact]) =>
        <ContactItem 
          key={id} 
          className={classes.contactItem} 
          isEditing={id === editing}
          StartEdit={setEditing.bind(null, id)} 
          {...contact} />)
      }
    </>
  )
}