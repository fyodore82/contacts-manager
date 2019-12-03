export interface Contact {
  name: string;
  email: string;
  phone?: string;
  isFavorite: boolean;
}

export interface Contacts {
  [id: string]: Contact;
}