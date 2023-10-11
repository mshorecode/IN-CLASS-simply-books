import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';

export default function ShowBooks() {
  const [author, setAuthor] = useState([]);
  const { user } = useAuth();

  const getAllTheAuthors = () => {
    getAuthors(user.uid).then(setAuthor);
  };

  useEffect(() => {
    getAllTheAuthors();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/author/new" passHref>
        <Button>Add An Author</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {author.map((authors) => (
          <AuthorCard key={authors.firebaseKey} authorObj={authors} onUpdate={getAllTheAuthors} />
        ))}
      </div>

    </div>
  );
}
