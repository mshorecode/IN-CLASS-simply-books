/* eslint-disable react/style-prop-object */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteAuthorBooks, viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getADetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorDetails.first_name} ${authorDetails.last_name}?`)) {
      deleteAuthorBooks(authorDetails.firebaseKey).then(() => router.push('/authors'));
    }
  };

  useEffect(() => {
    getADetails();
  }, []);

  console.warn(authorDetails);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.last_name} style={{ width: '200px', height: '200px', border: '1px solid white' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        <p>{authorDetails.description || ''}</p>
        <hr />
        <Link href={`/author/edit/${authorDetails.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
          DELETE
        </Button>
      </div>
      <hr />
      <div id="author-details-book" className="d-flex flex-column">
        {authorDetails.books?.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getADetails} />
        ))}
      </div>
    </div>
  );
}
