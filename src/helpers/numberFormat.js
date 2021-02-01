export default function numberFormat(value) {
  if (value !== 'undefined') {
    return new Intl.NumberFormat().format(value);
  }
  return null;
}
