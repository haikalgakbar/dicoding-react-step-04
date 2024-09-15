export function showFormattedDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
