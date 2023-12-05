import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders home link', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const linkElement = screen.getByText(/OWL Stock Prices/i);
  expect(linkElement).toBeInTheDocument();
});

test('click link takes me to page')
