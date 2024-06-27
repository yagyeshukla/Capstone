import React from "react";
import { useParams } from "react-router-dom";

const AlertDocumentationPage = () => {
  const params = useParams();
  return (
    <div>
      <h1>Alert Documentation Page</h1>
      <p>Alert in frame number {params.alertId}</p>
    </div>
  );
};

export default AlertDocumentationPage;
