import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getAuthorDetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  useEffect(() => {
    getAuthorDetails();
  }, []);
  return (
    <div>{authorDetails.books?.map((book) => (
      <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAuthorDetails} />
    ))}
    </div>
  );
}

export default ViewAuthor;
