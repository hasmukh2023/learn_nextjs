import React from 'react';
import BookList from '../books/components/BookList';
import AddBookForm from '../books/components/AddBookForm';

export default function BooksPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Books Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <BookList />
        </div>
        <div className="md:col-span-1">
          <AddBookForm />
        </div>
      </div>
    </div>
  );
}
