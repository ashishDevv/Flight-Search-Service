function parseDateString () {
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1; // Months are 0-based in JavaScript
    const day = parseInt(dateString.slice(6, 8), 10);
    return new Date(year, month, day);
  };

  module.exports = parseDateString;