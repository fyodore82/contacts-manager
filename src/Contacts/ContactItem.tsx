import React, { FC, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import SaveIcon from '@material-ui/icons/Check'
import CancelIcon from '@material-ui/icons/Clear'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';

import { actionCreators } from '../store/contacts';
import { TextBox } from './TextBox'
import { validatePhone, validateEmail, validateName } from './ContactFieldValidators'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: '0px 0px 5px #c7c7c7',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  textField: {
    marginRight: theme.spacing(0.5),
    width: '30%',
    [theme.breakpoints.down('xs')]: {
      width: 'unset',
      marginBottom: '15px',
    },
  },
  fieldsSpace: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonsSpace: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'unset',
      alignItems: 'flex-end',
    },
    display: 'flex',
    justifyContent: 'flex-end',
    width: '20%',
    marginRight: '10px',
  },
}));

interface ContactItemOwnProps {
  isFavorite: boolean;
  isNew?: boolean;
  className?: string;

  contactId: string;
  name: string;
  email: string;
  phone?: string;

  CreateUpdateContact: typeof actionCreators['CreateUpdateContact'];
  DeleteContact: typeof actionCreators['DeleteContact'];
}

export const ContactItem: FC<ContactItemOwnProps> =
  ({ isFavorite, name, email, phone, className, isNew, contactId,
    CreateUpdateContact, DeleteContact }) => {
    const classes = useStyles();

    const [edit, setEdit] = useState<boolean>(!!isNew);

    const [stateName, setName] = useState<string | undefined>(name);
    const [stateEmail, setEmail] = useState<string | undefined>(email);
    const [statePhone, setPhone] = useState<string | undefined>(phone);

    const isNameValid = validateName(stateName);
    const isEmailValid = validateEmail(stateEmail);
    const isPhoneValid = validatePhone(statePhone);

    const editOnClick = useCallback(
      () => {
        setEdit(p => !p);
        if (stateName && stateEmail && edit) {
          CreateUpdateContact(contactId, { name: stateName, email: stateEmail, phone: statePhone, isFavorite });
        }
      },
      [contactId, edit, setEdit, CreateUpdateContact, stateName, stateEmail, statePhone, isFavorite]);

    const cancelOnClick = useCallback(
      () => { isNew ? DeleteContact(contactId) : setEdit(false) },
      [setEdit, DeleteContact, isNew, contactId])

    const textFiledOnChange = useCallback(
      ({ target: { id, value } }: React.ChangeEvent<{ id: string; value: string }>) => {
        if (id === 'name-edit') setName(value);
        else if (id === 'email-edit') setEmail(value);
        else if (id === 'phone-edit') setPhone(value);
      }, [setName]);

    const deleteOnClick = useCallback(
      () => DeleteContact(contactId),
      [DeleteContact, contactId]
    );

    const toggleFavorites = useCallback(
      () => { CreateUpdateContact(contactId, { name, email, phone, isFavorite: !isFavorite }) }
      , [CreateUpdateContact, name, email, phone, isFavorite, contactId]);

    return (
      <form className={`${classes.root} ${className}`} noValidate autoComplete="off">
        <div className={classes.fieldsSpace}>
          {edit ?
            <>
              <TextField multiline error={!isNameValid} onChange={textFiledOnChange} key='name-edit' id='name-edit' className={classes.textField} label="Name" value={stateName} />
              <TextField error={!isEmailValid} onChange={textFiledOnChange} key='email-edit' id='email-edit' className={classes.textField} label="Email" value={stateEmail} />
              <TextField error={!isPhoneValid} onChange={textFiledOnChange} key='phone-edit' id='phone-edit' className={classes.textField} label="Phone" value={statePhone ? statePhone : ''} />
            </>
            :
            <>
              <TextBox className={classes.textField} key='name' label='Name'>{name}</TextBox>
              <TextBox className={classes.textField} key='email' label='Email'>{email}</TextBox>
              <TextBox className={classes.textField} key='phone' label='Phone'>{phone}</TextBox>
            </>
          }
        </div>
        <div className={classes.buttonsSpace}>
          <IconButton disabled={edit && !(isNameValid && isEmailValid && isPhoneValid)} edge="end" aria-label="edit" onClick={editOnClick}>
            {edit ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          {edit && <IconButton edge="end" aria-label="edit" onClick={cancelOnClick}>
            <CancelIcon />
          </IconButton>}
          <IconButton edge="end" aria-label="delete" onClick={deleteOnClick}>
            <DeleteIcon />
          </IconButton>
          {!edit && <IconButton edge="end" aria-label="favorite" onClick={toggleFavorites}>
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>}
        </div>
      </form>
    )
  }