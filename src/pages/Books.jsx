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
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <Link to={`/books/${book.id}`}>{book.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
};

export default Books;
