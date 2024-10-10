"use client";
import { useState, useEffect } from "react";
import ExerciseCard from "./ExerciseCard";

const ExercisesNextPagination = () => {
  const [exercisesPerPage] = useState(9);
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const renderExercises = () => {
      const newExercises = [];
      const exerciseCount = 600;
      for (let i = 0; i < exerciseCount; i++) {
        newExercises.push(<> jhbj {i}</>);
      }

      setExercises(newExercises);
    };

    renderExercises();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);
  const startIndex = (currentPage - 1) * exercisesPerPage;
  const endIndex = startIndex + exercisesPerPage;
  const currentExercises = exercises.slice(startIndex, endIndex);

  // Handle page navigation
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {/* Render current page exercises */}
      {currentExercises.map((exercise, index) => (
        <ExerciseCard exercise={exercise}/>
      ))}

      {/* Render pagination controls */}
      {currentPage > 1 && (
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
      )}

      {Array.from({ length: totalPages }, (_, index) => {
        if (
          index + 1 === 1 || // First page
          index + 1 === currentPage || // Current page
          index + 1 === totalPages || // Last page
          Math.abs(index + 1 - currentPage) <= 2 // Pages close to the current page
        ) {
          return (
            <button
              key={index}
              disabled={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          );
        } else if (
          currentPage > 4 &&
          index === 1 // Dots after the first page
        ) {
          return <span key={index}>...</span>;
        } else if (
          currentPage < totalPages - 3 &&
          index === totalPages - 2 // Dots before the last page
        ) {
          return <span key={index}>...</span>;
        }

        return null;
      })}

      {currentPage < totalPages && (
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      )}
    </div>
  );
};

export default ExercisesNextPagination;
