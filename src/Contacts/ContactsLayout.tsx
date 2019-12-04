import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeGetVisibleContacts } from '../store/contactsSelector';

import { ContactsList } from './ContactsList'
import { ContactsState, actionCreators } from '../store/contacts';
import { ApplicationState } from '../store';

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

type ContactsLayoutStateProps = ContactsState;

type ContactsLayoutDispatchProps = typeof actionCreators;

type ContactsLayoutProps = ContactsLayoutStateProps & ContactsLayoutDispatchProps

export const ContactsLayout: FC<ContactsLayoutProps> = 
  ({ contacts, showFavorites, isLoading, newContact, newContactId,
    ToggleShowFavorites, AddContact, CreateUpdateContact, DeleteContact }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolBar}>
      <FormControlLabel
        control={<Switch checked={showFavorites} onClick={ToggleShowFavorites}/>}
        label="Show favorite contacts"
      />
      </div>
      <ContactsList 
      contacts={contacts} 
      newContact={newContact} 
      newContactId={newContactId}
      CreateUpdateContact={CreateUpdateContact}
      DeleteContact={DeleteContact}
      />
      <Fab className={classes.addButton} color="primary" aria-label="add" onClick={AddContact}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default connect<
  ContactsLayoutStateProps, 
  ContactsLayoutDispatchProps, 
  {}, 
  ApplicationState>(
    () => {
      const getVisibleContacts = makeGetVisibleContacts();
      const mapStateToPropsFactory = (state: ApplicationState) => ({
          ...state.contacts,       
          contacts: getVisibleContacts(state),
        })
      return mapStateToPropsFactory;
      },
    actionCreators
  )(ContactsLayout);