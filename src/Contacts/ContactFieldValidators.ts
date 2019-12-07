// Taken from https://stackoverflow.com/a/201378/7141073
const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function validateEmail(email: string | undefined): boolean {
  return email !== undefined && email.search(emailRegexp) > -1;
}

/* Very general phone regexp. 
 *  Phone may start from +
 *  Phone may contain any digit, brackets, dash or white space
 * This regexp match 10 digit number or local number like 123-567
*/
const phoneRegexp = /^[+]?[0-9|(|)|\-| ]+$/;
export function validatePhone(phone: string | undefined): boolean {
  return !phone || phone.search(phoneRegexp) > -1;
}

// Name shouldn't be empty
export function validateName(name: string | undefined): boolean {
  return !!name;
}