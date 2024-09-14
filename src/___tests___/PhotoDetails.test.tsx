import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PhotoDetails } from "../components/PhotoDetails";
import { fetchPhotoDetailsById } from "../api/unsplash";
import { faker } from "@faker-js/faker";

jest.mock("../api/unsplash");
const mockedFetchPhotoDetailsById =
  fetchPhotoDetailsById as jest.MockedFunction<typeof fetchPhotoDetailsById>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "test-id" }),
}));

const mockPhoto = {
  id: faker.string.uuid(),
  alt_description: faker.lorem.sentence(),
  urls: {
    regular: faker.image.url(),
  },
  user: {
    name: faker.person.fullName(),
  },
  created_at: faker.date.past().toISOString(),
  description: faker.lorem.paragraph(),
};

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/photo/:id" element={<PhotoDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

describe("PhotoDetails Component", () => {
  beforeEach(() => {
    mockedFetchPhotoDetailsById.mockReset();
    window.history.pushState({}, "", "/photo/test-id");
  });

  it("renders loading state initially", () => {
    mockedFetchPhotoDetailsById.mockImplementation(() => new Promise(() => {}));
    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders photo details after loading", async () => {
    mockedFetchPhotoDetailsById.mockResolvedValue(mockPhoto);
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(mockPhoto.alt_description)).toBeInTheDocument();
    });
    expect(
      screen.getByText(`Photographer's name: ${mockPhoto.user.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Date Taken: ${new Date(mockPhoto.created_at).toLocaleDateString()}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Description: ${mockPhoto.description}`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockPhoto.alt_description)).toHaveAttribute(
      "src",
      mockPhoto.urls.regular
    );
  });

  it("renders error message on fetch error", async () => {
    const errorMessage = "Error fetching photo details";
    mockedFetchPhotoDetailsById.mockRejectedValue(new Error(errorMessage));
    renderComponent();

    await waitFor(() => {
      const errorElement = screen.queryByTestId("error-message");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('renders "Photo not found" when no photo data is returned', async () => {
    mockedFetchPhotoDetailsById.mockResolvedValue(null);
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Photo not found")).toBeInTheDocument();
    });
  });

  it("renders back button exits in component", async () => {
    mockedFetchPhotoDetailsById.mockResolvedValue(mockPhoto);
    renderComponent();

    await waitFor(() => {
      const backButton = screen.queryByTestId("back-button");
      expect(backButton).toBeInTheDocument();
    });
  });
});
