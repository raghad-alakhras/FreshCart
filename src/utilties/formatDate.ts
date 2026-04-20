export function formatDate(dateInput:string) {
  if (!dateInput) return '';

  const date = new Date(dateInput);

  if (isNaN(date as any)) return '';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}