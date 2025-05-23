'use client';

import React from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
}

export default function BookItem({ book, onDelete }: BookItemProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex justify-between items-center">
      <div>
        <h3 className="font-medium">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          by {book.author} ({book.year})
        </p>
      </div>
      <div className="flex space-x-2">
        <button 
          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
          onClick={() => alert(`Edit ${book.title}`)}
        >
          Edit
        </button>
        <button 
          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
          onClick={() => onDelete(book.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
