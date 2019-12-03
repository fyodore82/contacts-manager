import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { ContactsList } from './ContactsList'
import { Contacts } from '../store/contacts';

const useStyles = makeStyles(theme => ({
  root: {

  },
  toolBar: {
    position: 'sticky',
    padding: '5px',
    borderRadius: '5px',
    top: 0,
    zIndex: 100,
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(1),
  },
  addButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  }
}));

interface ContactsLayoutStateProps {
  contacts: Contacts;
  favoritesSelected: boolean;
}

type ContactsLayoutProps = ContactsLayoutStateProps

export const ContactsLayout: FC<ContactsLayoutProps> = ({ contacts, favoritesSelected }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolBar}>
      <FormControlLabel
        control={<Switch checked={favoritesSelected} value="checkedA" />}
        label="Favorite contacts"
      />
      </div>
      <ContactsList contacts={contacts} />
      <Fab className={classes.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  )

}