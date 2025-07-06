import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render loading spinner', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render with custom size', () => {
    render(<LoadingSpinner size={60} />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('should render with custom color', () => {
    render(<LoadingSpinner color="primary" />);
    
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('should pass through additional props', () => {
    render(<LoadingSpinner data-testid="custom-spinner" />);
    
    expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
  });
});