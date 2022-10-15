import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { useEventListener } from "./useEventListener";

describe("useEventListener", () => {
  const TestComponent = ({ event, callback, element }) => {
    const buttonRef = useRef();
    const el = element || buttonRef.current;
    console.log(el);
    useEventListener(event, callback, el);

    return <button ref={buttonRef} />;
  };

  const defaultProps = {
    event: 'click',
    callback: jest.fn(),
  }

  it("successfully adds an event listener to an element", () => {
    render(<TestComponent {...defaultProps} />);
    const button = screen.getByRole('button');

    userEvent.click(button);
    expect(defaultProps.callback).toHaveBeenCalledTimes(1);
  });

  it("does not add an event listener if the element passed is invalid", () => {
    render(<TestComponent {...defaultProps} element="invalid" />);
    const button = screen.getByRole('button');

    userEvent.click(button);
    expect(defaultProps.callback).not.toHaveBeenCalled();
  });
});
