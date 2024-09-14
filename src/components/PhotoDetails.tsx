import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchPhotoDetailsById } from "../api/unsplash";
import { PhotoDetails as PhotoDetailsType } from "../types";
import { ErrorMessage, Container, BackButton, Image } from "../styles";

export const PhotoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<PhotoDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotoDetails = async () => {
      try {
        if (id) {
          const details = await fetchPhotoDetailsById(id);
          setPhoto(details);
        }
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          setError("Error fetching photo: " + error.message);
        } else {
          setError("An unknown error occurred while fetching photos.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotoDetails();
  }, [id]);

  if (error)
    return <ErrorMessage data-testid="error-message">{error}</ErrorMessage>;
  if (isLoading) return <div>Loading...</div>;
  if (!photo) return <div>Photo not found</div>;

  const { alt_description, urls, user, created_at, description } = photo;

  return (
    <Container>
      <BackButton data-testid="back-button" to="/">
        Back to Grid
      </BackButton>
      <h1>{alt_description}</h1>
      <Image src={urls.regular} alt={alt_description || "Unsplash photo"} />
      <p>Photographer's name: {user.name}</p>
      <p>Date Taken: {new Date(created_at).toLocaleDateString()}</p>
      <p>Description: {description}</p>
    </Container>
  );
};
