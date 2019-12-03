import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';

import { TextBox } from './TextBox'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: '0px 0px 5px #c7c7c7',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    padding: '5px',
    display: 'flex',
  },
  textField: {
    marginRight: theme.spacing(0.5),
    minWidth: 100,
  },
  iconButton: {

  },

}));

interface ContactItemOwnProps {
  isFavorite: boolean;
  isEditing: boolean;
  className?: string;

  name: string;
  email: string;
  phone?: string;

  StartEdit: () => void;
}



export const ContactItem: FC<ContactItemOwnProps> =
  ({ isFavorite, isEditing, name, email, phone, className,
  StartEdit }) => {
    const classes = useStyles();
    return (
      <form className={`${classes.root} ${className}`} noValidate autoComplete="off">
        <div>
          {isEditing ?
            <>
              <TextField key='name-edit' className={classes.textField} id="name" label="Name" value={name}/>
              <TextField key='email-edit' className={classes.textField} id="email" label="Email" value={email}/>
              <TextField key='phone-edit' className={classes.textField} id="phone" label="Phone" value={phone}/>
            </>
            :
            <>
              <TextBox key='name' label='Name'>{name}</TextBox>
              <TextBox key='email' label='Email'>{email}</TextBox>
              <TextBox key='phone' label='Phone'>{phone}</TextBox>
            </>
          }
        </div>
        <div className={classes.iconButton}>
          <IconButton edge="end" aria-label="edit" onClick={StartEdit}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton edge="end" aria-label="favorite">
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </div>
      </form>
    )
  }