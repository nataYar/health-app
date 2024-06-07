'use client'

import { useState, useEffect } from 'react';

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    // Render skeleton loading component while data is being fetched
    return (
      <div>
        loading
      </div>
    );
  }

  // Render the actual content once loading is complete
  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>This is the main content of the page.</p>
    </div>
  );
};

export default LoadingPage;