import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { MasonryGrid } from "../components/MasonryGrid";
import { Photo } from "../types";
import * as api from "../api/unsplash";

// Mock the API calls
jest.mock("../api/unsplash");

// Mock the react-window and react-virtualized-auto-sizer
jest.mock("react-window", () => ({
  FixedSizeList: ({
    children,
    itemData,
  }: {
    children: (props: {
      index: number;
      style: React.CSSProperties;
      data: Photo[];
    }) => React.ReactElement;
    itemCount: number;
    itemData: Photo[];
  }) => (
    <div data-testid="fixed-size-list">
      {children({ index: 0, style: {}, data: itemData })}
    </div>
  ),
}));

jest.mock(
  "react-virtualized-auto-sizer",
  () =>
    ({
      children,
    }: {
      children: (size: { width: number; height: number }) => React.ReactElement;
    }) =>
      children({ height: 800, width: 1200 })
);

// Mock the GridRow component
jest.mock("../components/GridRow", () => ({
  GridRow: ({ data }: { data: { photos: Photo[] } }) => (
    <div data-testid="grid-row">
      {data.photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.thumb}
          alt={photo.alt_description || "Unsplash"}
        />
      ))}
    </div>
  ),
}));

// function to create mock photos
const createMockPhotos = (count: number) =>
  Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    urls: { small: faker.image.url() },
    alt_description: faker.lorem.sentence(),
  }));

const renderComponent = async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<MasonryGrid />);
  });
};

describe("MasonryGrid", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search input bar", async () => {
    await renderComponent();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("renders photos when they are fetched successfully", async () => {
    const mockPhotos = createMockPhotos(10);
    (api.fetchPhotos as jest.Mock).mockResolvedValueOnce(mockPhotos);

    await renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("fixed-size-list")).toBeInTheDocument();
    });
    expect(screen.getByTestId("grid-row")).toBeInTheDocument();
  });

  it("displays an error message when photo fetching fails", async () => {
    (api.fetchPhotos as jest.Mock).mockRejectedValueOnce(
      new Error("API Error")
    );

    await renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Error fetching photos:/)).toBeInTheDocument();
    });
  });

  it("renders correctly on initial load", async () => {
    const mockPhotos = createMockPhotos(10);
    (api.fetchPhotos as jest.Mock).mockResolvedValueOnce(mockPhotos);

    await renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId("fixed-size-list")).toBeInTheDocument();
    });
    expect(screen.getByTestId("grid-row")).not.toBeEmptyDOMElement();
  });
});
