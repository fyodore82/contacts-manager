import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  root: {
    border: 0,
    display: 'inline-flex',
    flexDirection: 'column',
    verticalAlign: 'top',
  },
  span: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontSize: '1rem',
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.00938em',
    marginTop: '8px',
  },
}));

interface TextBoxOwnProps {
  label: string;
  className?: string;
}

export const TextBox: FC<TextBoxOwnProps> = ({ label, children, className }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.root} ${className}`}>
      <InputLabel shrink={true}>{label}</InputLabel>
      <span key='name' className={classes.span}>{children}</span>
    </div>
  )
}