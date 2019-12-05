import React, { FC, useRef, useCallback } from 'react';
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
    position: 'absolute',

    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    width: '80rem',
    overflowY: 'auto',
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
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: '20px',
  }
}));

type ContactsLayoutStateProps = ContactsState;

type ContactsLayoutDispatchProps = typeof actionCreators;

type ContactsLayoutProps = ContactsLayoutStateProps & ContactsLayoutDispatchProps

export const ContactsLayout: FC<ContactsLayoutProps> = 
  ({ contacts, showFavorites, isLoading, newContact, newContactId,
    ToggleShowFavorites, AddContact, CreateUpdateContact, DeleteContact }) => {
  
      const classes = useStyles();
      const containerRef = useRef<HTMLDivElement>(null);
      const addButtonOnClick = useCallback(() => {
        AddContact();
        containerRef.current && containerRef.current.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, [AddContact, containerRef]);
      return (
        <div className={classes.root}>
          <div ref={containerRef} className={classes.container}>
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
            <Fab className={classes.addButton} color="primary" aria-label="add" onClick={addButtonOnClick}>
              <AddIcon />
            </Fab>
          </div>
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