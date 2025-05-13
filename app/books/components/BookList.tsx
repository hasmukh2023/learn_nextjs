'use client';

import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';

// Book type definition
interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([
    { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: '2', title: '1984', author: 'George Orwell', year: 1949 },
    { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  ]);

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Book Collection</h2>
      
      {books.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No books in your collection yet.</p>
      ) : (
        <div className="space-y-4">
          {books.map(book => (
            <BookItem 
              key={book.id} 
              book={book} 
              onDelete={handleDeleteBook} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
