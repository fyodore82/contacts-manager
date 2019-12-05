import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Contacts, Contact, actionCreators } from '../store/contacts'
import { ContactItem } from './ContactItem'

const useStyles = makeStyles(theme => ({
  contactItem: {
    marginBottom: theme.spacing(1),
  }
}));

interface ContactsListOwnProps {
  contacts: Contacts;
  newContact?: Contact;
  newContactId?: string;

  CreateUpdateContact: typeof actionCreators['CreateUpdateContact'];
  DeleteContact: typeof actionCreators['DeleteContact'];
}

export const ContactsList: FC<ContactsListOwnProps> =
  ({ contacts, newContact, newContactId,
    CreateUpdateContact, DeleteContact }) => {
    const classes = useStyles();

    return (
      <>
        {newContactId && newContact &&
          <ContactItem
            key={newContactId}
            className={classes.contactItem}
            isNew
            contactId={newContactId}
            {...newContact}
            CreateUpdateContact={CreateUpdateContact}
            DeleteContact={DeleteContact}
          />}
        {Object.entries(contacts).map(([id, contact]) =>
          <ContactItem
            key={id}
            contactId={id}
            className={classes.contactItem}
            CreateUpdateContact={CreateUpdateContact}
            DeleteContact={DeleteContact}
            {...contact} />)
        }
      </>
    )
  };