import React from 'react';
import Feed from '../Feed/Feed';
import { useParams } from 'react-router';
import Head from '../Helper/Head';

const UserProfile = () => {
  const { user } = useParams();
  return (
    <section className="container mainSection">
      <Head title={user} />
      <h1 className="titulo">{user}</h1>
      <Feed user={user} />
    </section>
  );
};

export default UserProfile;
