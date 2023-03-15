import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('https://api.matgargano.com/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError('An error occurred while fetching the book data');
      }

      setLoading(false);
    };

    fetchBooks();
  }, []);

  return (
    <Container>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {loading && (
        <div className="max-w-[230px]">
          <Skeleton count="10" />
        </div>
      )}
      {!loading && !error && (
        <>
  <h1 style={{ fontSize: "2rem", textAlign: "center", color: "blue" }}>
          WELCOME TO THE BOOK CLUB
        </h1>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
              <div key={book.id} className="border p-4 rounded-md shadow">
                <Link to={`/books/${book.id}`}>
                  <h2 className="text-lg font-bold mb-2 hover:underline">
                    {book.title}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4">

          </div>
        </>
      )}
    </Container>
  );
};

export default Books;
