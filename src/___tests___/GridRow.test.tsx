import React from "react";
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { GridRow } from "../components/GridRow";
import { Photo } from "../types";

// Mock the react-router-dom Link component
jest.mock("react-router-dom", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} data-testid="mock-link">
      {children}
    </a>
  ),
}));

// Mock the styled components
jest.mock("../styles", () => ({
  PhotoItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="photo-item">{children}</div>
  ),
  PhotoImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="photo-image" />
  ),
}));

const createMockPhoto = (): Photo => ({
  id: faker.string.uuid(),
  urls: {
    thumb: faker.image.url(),
  },
  alt_description: faker.lorem.sentence(),
});

const createMockData = (count: number) => ({
  photos: Array.from({ length: count }, createMockPhoto),
  columnCount: count,
});

describe("GridRow", () => {
  it("renders the correct number of photos", () => {
    const mockData = createMockData(3);
    render(<GridRow index={0} style={{}} data={mockData} />);

    const photoItems = screen.getAllByTestId("photo-item");
    expect(photoItems).toHaveLength(3);
  });

  it("renders photos with correct URLs and alt texts", () => {
    const mockData = createMockData(2);
    render(<GridRow index={0} style={{}} data={mockData} />);

    const photoImages = screen.getAllByTestId("photo-image");
    photoImages.forEach((img, index) => {
      expect(img).toHaveAttribute("src", mockData.photos[index].urls.thumb);
      expect(img).toHaveAttribute(
        "alt",
        mockData.photos[index].alt_description || "Unsplash photo"
      );
    });
  });

  it("renders links with correct paths", () => {
    const mockData = createMockData(2);
    render(<GridRow index={0} style={{}} data={mockData} />);

    const links = screen.getAllByTestId("mock-link");
    links.forEach((link, index) => {
      expect(link).toHaveAttribute(
        "href",
        `/photo/${mockData.photos[index].id}`
      );
    });
  });
});
