function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
      if (book.borrows[0].returned === false) {
          acc++;
      }
      return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  const genresMap = books.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
  }, {});
  const sortedGenres = Object.keys(genresMap).sort((a, b) => genresMap[b] - genresMap[a]);
  return sortedGenres.slice(0, 5).map(genre => ({ name: genre, count: genresMap[genre] }));
}

function getMostPopularBooks(books) {
  const popularBooks = books.map(book => ({ name: book.title, count: book.borrows.length }));
  return popularBooks.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorMap = {};
  books.forEach(book => {
      const author = authors.find(author => author.id === book.authorId);
      const authorName = `${author.name.first} ${author.name.last}`;
      authorMap[authorName] = (authorMap[authorName] || 0) + book.borrows.length;
  });
  const sortedAuthors = Object.keys(authorMap).sort((a, b) => authorMap[b] - authorMap[a]);
  return sortedAuthors.slice(0, 5).map(author => ({ name: author, count: authorMap[author] }));
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
