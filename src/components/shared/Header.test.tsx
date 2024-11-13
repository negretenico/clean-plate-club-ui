import { render, screen, cleanup } from '@testing-library/react';
import Header from './Header';
import React from 'react';
describe('Tests the header component', () => {
  afterEach(() => {
    cleanup();
  });
  it('Tests that the `Home` link is present', () => {
    render(<Header/>);
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });
  it('Tests that the `Who are we` link is present', () => {
    render(<Header/>);
    expect(screen.getByText(/Who are we?/)).toBeInTheDocument();
  });
  it('Tests that the `Menu` link is present', () => {
    render(<Header/>);
    expect(screen.getByText(/Menu/)).toBeInTheDocument();
  });
  it('Tests that the `FAQ` link is present', () => {
    render(<Header/>);
    expect(screen.getByText(/Menu/)).toBeInTheDocument();
  });
});
