import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { SearchInputBar } from '../components/SearchInputBar';

describe('SearchInputBar', () => {
  const mockHandleSearch = jest.fn();
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <SearchInputBar
        handleSearch={mockHandleSearch}
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
      />
    );

    expect(screen.getByTestId('search-input-bar')).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('updates search query on input change', () => {
    render(
      <SearchInputBar
        handleSearch={mockHandleSearch}
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
      />
    );

    const input = screen.getByTestId('search-input');
    const testValue = faker.lorem.word();
    
    fireEvent.change(input, { target: { value: testValue } });
    
    expect(mockSetSearchQuery).toHaveBeenCalledWith(testValue);
  });

  it('calls handleSearch on form submission', async () => {
    const testQuery = faker.lorem.words();
    
    render(
      <SearchInputBar
        handleSearch={mockHandleSearch}
        searchQuery={testQuery}
        setSearchQuery={mockSetSearchQuery}
      />
    );

    const form = screen.getByTestId('search-form');
    
    fireEvent.submit(form);
    
    expect(mockHandleSearch).toHaveBeenCalledWith(testQuery);
  });

  it('allows user to submit the form by clicking the search button', async () => {
    const testQuery = faker.lorem.words();
    
    render(
      <SearchInputBar
        handleSearch={mockHandleSearch}
        searchQuery={testQuery}
        setSearchQuery={mockSetSearchQuery}
      />
    );

    const button = screen.getByTestId('search-button');
    
    userEvent.click(button);
    
    expect(mockHandleSearch).toHaveBeenCalledWith(testQuery);
  });

  it('has the correct placeholder text', () => {
    render(
      <SearchInputBar
        handleSearch={mockHandleSearch}
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
      />
    );

    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('placeholder', 'Search for photos...');
  });

  it('has the correct aria-label', () => {
    render(
      <SearchInputBar
        handleSearch={mockHandleSearch}
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
      />
    );

    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('aria-label', 'Search input');
  });
});