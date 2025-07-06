import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message', () => {
    render(<ErrorMessage message="Test error message" />);
    
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should not render when message is empty', () => {
    render(<ErrorMessage message="" />);
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should not render when message is not provided', () => {
    render(<ErrorMessage message={undefined as any} />);
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should pass through additional props', () => {
    render(<ErrorMessage message="Test error" data-testid="custom-error" />);
    
    expect(screen.getByTestId('custom-error')).toBeInTheDocument();
  });

  it('should have error severity', () => {
    render(<ErrorMessage message="Test error" />);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardError');
  });
});