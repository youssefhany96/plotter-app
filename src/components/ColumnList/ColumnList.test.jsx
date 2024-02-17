import { render, screen, fireEvent } from '@testing-library/react';
import ColumnList from './ColumnList';

describe('ColumnList', () => {
  const mockColumns = [
    { name: 'Product', function: 'dimension' },
    { name: 'Cost', function: 'measure' }
  ];

  it('renders correctly with title and columns', () => {
    render(<ColumnList title="Test Title" columns={mockColumns} onDragStart={() => {}} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();

    mockColumns.forEach(column => {
      expect(screen.getByText(column.name)).toBeInTheDocument();
    });
  });


  const mockOnDragStart = jest.fn();

  it('calls onDragStart when a column item is dragged', () => {
    render(<ColumnList title="Test Title" columns={mockColumns} onDragStart={mockOnDragStart} />);
    
    const firstItem = screen.getByText(mockColumns[0].name);
    fireEvent.dragStart(firstItem);

    expect(mockOnDragStart).toHaveBeenCalled();

  });
});
