export const dateFormat = (date) => {
    const newDate = new Date(date);
    const formattedDate = newDate.getDate() + " " + newDate.toLocaleString('es-es', {month: 'long'}) + " " + newDate.getFullYear();
    return formattedDate;
}