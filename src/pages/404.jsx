import React, { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    document.title = "404 - Page Not Found"; // Brauzer tabiga 404 statusini qo'yish uchun
  }, []);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">home</a>
    </div>
  );
}

export default NotFound;