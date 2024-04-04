export function maskDate(value) {
  let newValue = value.replace(/\D/g, '');
  if (newValue.length > 2) {
    newValue = newValue.slice(0, 2) + '.' + newValue.slice(2);
  }
  if (newValue.length > 5) {
    newValue = newValue.slice(0, 5) + '.' + newValue.slice(5);
  }
  if (newValue.length > 10) {
    newValue = newValue.slice(0, 10);
  }
  return newValue;
}