import React from "react";
import styles from "./ErrorMessage.module.css"; // Ensure this path is correct

const ErrorMessage = ({ error }) => {
  return (
    <div className={styles.errorMessage}>
      {error === "noimage" ? (
        <p>No images found. Please try a different search query.</p>
      ) : (
        <p>Whoops, something went wrong. Please try again later.</p>
      )}
    </div>
  );
};

export default ErrorMessage;
