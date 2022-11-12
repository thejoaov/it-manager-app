import { phone } from '@nafuzi/brazilian-masks';

export const getFirstTwoLetters = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`;
  }
  return `${name[0]}${name[1]}`.toUpperCase();
};

export const formatPhone = (string: string) => {
  return phone(string);
};
