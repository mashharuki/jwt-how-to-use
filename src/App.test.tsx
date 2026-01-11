import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Get JWT button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Get JWT/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Get Foods button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Get Foods/i);
  expect(buttonElement).toBeInTheDocument();
});
