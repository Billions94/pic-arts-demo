import React, { useState, useEffect, useCallback } from "react";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { SearchInputBar } from "../components/SearchInputBar";

import { fetchPhotos, searchPhotos } from "../api/unsplash";
import { Photo } from "../types";

import { GridRow } from "./GridRow";

import { GridContainer, ErrorMessage, LoadingMessage } from "../styles";

const COLUMN_WIDTH = 300;
const ROW_HEIGHT = 470;

export const MasonryGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadPhotos = useCallback(
    async (_searchQuery = "", reset = false) => {
      if (!hasMore && !reset) return;
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPhotos = _searchQuery
          ? await searchPhotos(_searchQuery, reset ? 1 : page, 100)
          : await fetchPhotos(reset ? 1 : page, 100);
        setIsLoading(false);
        if (fetchedPhotos.length === 0) {
          setHasMore(false);
        } else {
          setPhotos((prevPhotos) =>
            reset ? fetchedPhotos : [...prevPhotos, ...fetchedPhotos]
          );
          setPage(reset ? 2 : page + 1);
        }
      } catch (error: unknown) {
        setIsLoading(false);
        if (error instanceof Error) {
          setError("Error fetching photos: " + error.message);
        } else {
          setError("An unknown error occurred while fetching photos.");
        }
      }
    },
    [hasMore, page]
  );

  useEffect(() => {
    loadPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setPage(1);
      setHasMore(true);
      loadPhotos(query, true);
    },
    [loadPhotos]
  );

  const getColumnCount = (width: number) => {
    return Math.floor(width / COLUMN_WIDTH);
  };

  const getRowCount = (height: number, columnCount: number) => {
    return Math.ceil(photos.length / columnCount);
  };

  return (
    <GridContainer>
      <SearchInputBar
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => {
          const columnCount = getColumnCount(width);
          const rowCount = getRowCount(height, columnCount);

          return (
            <List
              height={height}
              itemCount={rowCount}
              itemSize={ROW_HEIGHT}
              width={width}
              itemData={{ photos, columnCount }}
              onItemsRendered={({
                visibleStopIndex,
              }: {
                visibleStopIndex: number;
              }) => {
                if (
                  visibleStopIndex === rowCount - 1 &&
                  !isLoading &&
                  hasMore
                ) {
                  loadPhotos(searchQuery ? searchQuery : "");
                }
              }}
            >
              {GridRow}
            </List>
          );
        }}
      </AutoSizer>
      {isLoading && (
        <LoadingMessage data-testid="loading-div">
          Loading photos...
        </LoadingMessage>
      )}
    </GridContainer>
  );
};
