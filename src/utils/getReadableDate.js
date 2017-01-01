const MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

const _getReadableDate = (timestamp) => {
  const publishDate = new Date(timestamp);
  return MONTHS[publishDate.getMonth()] + " " + publishDate.getDate() + ", " + publishDate.getFullYear();
}

export default _getReadableDate;