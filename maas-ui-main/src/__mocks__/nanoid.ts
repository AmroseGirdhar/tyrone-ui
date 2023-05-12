// This mock is used for ids generated by react-components. The ids generated
// from this mock need to be unique and not be able to conflict with the ids
// generated from the nanoid mock for @reduxjs/toolkit.

let id = 0;

beforeEach(() => {
  id = 0;
});

export const nanoid = (): string => {
  id++;
  return `mock-nanoid-${id}`;
};
