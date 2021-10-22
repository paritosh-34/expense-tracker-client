const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: '2-digit',
  });

export default formatDate;
