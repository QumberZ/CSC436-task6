import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Container from '../components/Container';
import './Book.css'

const Book = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  const getData = async () => {
    const url = `https://api.matgargano.com/api/books/${id}`;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(url, { mode: 'cors' });
      const data = await response.json();
      setBook(data);
    } catch (e) {
      setError('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <div className="mb-4">
        <Link to="/books">&larr; Back to books library</Link>
      </div>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {loading && <Skeleton count={3} />}
      {book && (
        <div>
          <h2 className=" text-lg font-bold mb-2">TITLE: {book.title}</h2>
          <p className='data-item'>Author: {book.author}</p>
          <p className='data-item'>Publisher: {book.publisher}</p>
          <p className='data-item'>Publication Year: {book.year}</p>
          <p className='data-item'>Number of Pages: {book.pages}</p>
          <p className='data-item'>Country Origin: {book.country}</p>
          <img  className='data-item' src={book.imageURL} alt="" />
        
        </div>
      )}
    </Container>
  );
};

export default Book;
