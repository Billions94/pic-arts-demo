import React from "react";
import { Link } from "react-router-dom";
import { PhotoItem, PhotoImage } from "../styles";
import { Photo } from "../types";

interface GridRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    photos: Photo[];
    columnCount: number;
  };
}

export const GridRow: React.FC<GridRowProps> = ({ index, style, data }) => {
  const { photos, columnCount } = data;
  const startIndex = index * columnCount;
  const rowPhotos = photos.slice(startIndex, startIndex + columnCount);
  return (
    <div style={{ ...style, display: "flex" }}>
      {rowPhotos.map((photo) => (
        <Link
          key={photo.id}
          to={`/photo/${photo.id}`}
          style={{ width: `${100 / columnCount}%` }}
        >
          <PhotoItem data-testid="photo-item">
            <PhotoImage
              src={photo.urls.thumb}
              alt={photo.alt_description || "Unsplash photo"}
            />
          </PhotoItem>
        </Link>
      ))}
    </div>
  );
};
