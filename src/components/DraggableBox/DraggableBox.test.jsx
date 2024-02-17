// DraggableBox.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DraggableBox from "./DraggableBox";

describe("DraggableBox", () => {
  const title = "Test Box";
  const placeholder = "Drop items here";

  it("renders with title and displays the placeholder when empty", () => {
    render(
      <DraggableBox
        title={title}
        onDrop={() => {}}
        onDragOver={() => {}}
        onClear={() => {}}
        placeholder={placeholder}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('calls onDrop and onDragOver handlers', () => {
    const onDropMock = jest.fn();
    const onDragOverMock = jest.fn();
    
    render(
      <DraggableBox
        title={title}
        onDrop={onDropMock}
        onDragOver={onDragOverMock}
        onClear={() => {}}
        placeholder={placeholder}
      />
    );
  
    const box = screen.getByTestId('draggable-box');
    fireEvent.dragOver(box);
    expect(onDragOverMock).toHaveBeenCalled();
  
    fireEvent.drop(box);
    expect(onDropMock).toHaveBeenCalled();
  });
  
});
