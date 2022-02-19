import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useOnClickOutside } from "./useOnClickOutside";

describe("useOnClickOutside", () => {
  const handleClick = jest.fn();

  const TestComponent = () => {
    const ref = useRef();
    useOnClickOutside(ref, handleClick);

    return (
      <>
        <span>Outsider</span>
        <div ref={ref} data-testid="container">
          <button />
          <span />
          <div />
        </div>
      </>
    );
  };

  it("calls the function passed to the hook when any element outside the ref is clicked", () => {
    render(<TestComponent />);
    const outsider = screen.getByText("Outsider");
    userEvent.click(outsider);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does NOT call the function passed to the hook when the ref is clicked", () => {
    render(<TestComponent />);
    const container = screen.getByTestId("container");
    userEvent.click(container);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does NOT call the function passed to the hook when a child element of the ref is clicked", () => {
    render(<TestComponent />);
    const children = screen.getByTestId("container").children;
    Array.from(children).forEach((child) => {
      userEvent.click(child);
    });

    expect(handleClick).not.toHaveBeenCalled();
  });
});
