import 'jest'
import { validateEmail, validateName, validatePhone } from '../ContactFieldValidators'

const correctEmail = "mail@mail.com";
const correctName = "Name";
const correctPhone = "+1 (123) 123"

const incorrectEmail = "mailmail.com";
const incorrectName = undefined;
const incorrectPhone = "+1eee(123) 123"

test('validateEmail', () => {
  expect(validateEmail(correctEmail)).toBe(true);
  expect(validateEmail(incorrectEmail)).toBe(false);
});

test('validateName', () => {
  expect(validateName(correctName)).toBe(true);
  expect(validateName(incorrectName)).toBe(false);
});

test('validatePhone', () => {
  expect(validatePhone(correctPhone)).toBe(true);
  expect(validatePhone(incorrectPhone)).toBe(false);
});