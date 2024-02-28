function findAuthorById(authors, authorId) {
  return authors.find(author => author.id === authorId);
}

function findBookById(books, bookId) {
  return books.find(book => book.id === bookId);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = [];
  const returned = [];
  books.forEach(book => {
    const recent = book.borrows[0]; // Get the most recent borrow
    if (recent && !recent.returned) {
      checkedOut.push(book);
    } else {
      returned.push(book);
    }
  });
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  book.borrows.forEach(borrow => {
    const account = accounts.find(acc => acc.id === borrow.id);
    if (account) {
      borrowers.push({ ...account, returned: borrow.returned });
    }
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
