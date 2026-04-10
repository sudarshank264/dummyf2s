import React from 'react';
import Navbar from '../components/Navbar';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';

const BlogsListPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '20px', minHeight: '80vh' }}>
        <Blogs />
      </div>
      <Footer />
    </>
  );
};

export default BlogsListPage;
