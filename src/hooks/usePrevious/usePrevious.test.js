import React, { useState } from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePrevious } from './usePrevious';

const TestComponent = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <>
      <div data-testid="count">{count}</div>
      <div data-testid="previous-count">{`${prevCount}`}</div>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </>
  );
};

describe('usePrevious', () => {
  it('renders', () => {
    render(<TestComponent />);
  });

  it('keeps track of the previous state of a given value', () => {
    render(<TestComponent />);
    const count = screen.getByTestId('count');
    const prevCount = screen.getByTestId('previous-count');
    const increment = screen.getByRole('button');

    expect(count.innerHTML).toBe('0');
    expect(prevCount.innerHTML).toBe('undefined');

    userEvent.click(increment);
    expect(count.innerHTML).toBe('1');
    expect(prevCount.innerHTML).toBe('0');

    userEvent.click(increment);
    expect(count.innerHTML).toBe('2');
    expect(prevCount.innerHTML).toBe('1');
  });
});
