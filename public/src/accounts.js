// helper function
function getAuthorForBook(book, authors) {
  return authors.find(author => author.id === book.authorId);
}


function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}   

function sortAccountsByLastName(accounts) {
  // Sorts them by last name
  accounts.sort((a, b) => {
      // takes the last names
      const lastNameA = a.name.last.toLowerCase();
      const lastNameB = b.name.last.toLowerCase();
      
      // Compares the last names
      if (lastNameA < lastNameB) return -1;
      if (lastNameA > lastNameB) return 1;
      return 0; 
  });

  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  // Initialize a variable to store the total count of borrows
  let totalCount = 0;
  
  // Iterate through each book
  books.forEach(book => {
      // Check if the borrows array exists and is not empty
      if (book.borrows && book.borrows.length > 0) {
          // Count how many times the account's ID appears in the book's borrows array
          const borrowCount = book.borrows.reduce((acc, borrow) => {
              // If the account's ID matches the borrow's ID, increment the count
              if (borrow.id === account.id) {
                  return acc + 1;
              } else {
                  return acc;
              }
          }, 0);
          
          // Add the borrow count for this book to the total count
          totalCount += borrowCount;
      }
  });
  
  return totalCount;
}

function getBooksPossessedByAccount(account, books, authors) {
  if (!books || books.length === 0) {
      return [];
  }

  return books.filter(book => {
      const currentBorrow = book.borrows[0]; // Assuming the most recent borrow is at index 0
      return currentBorrow.id === account.id && !currentBorrow.returned;
  }).map(book => ({
      ...book,
      author: getAuthorForBook(book, authors) // Using the helper function to get author information
  }));
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

