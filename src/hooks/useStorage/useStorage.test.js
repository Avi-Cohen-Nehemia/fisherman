import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useStorage } from "./useStorage";

const initialValue = "$63,000";
const newValue = "$100,000";

const TestComponent = ({ initialState }) => {
  const [bitcoin, setBitcoin, removeBitcoin] = useStorage(
    "bitcoin",
    initialState,
    window.localStorage // for these tests I use localStorage but they are identical when using sessionStorage
  );

  return (
    <>
      <div data-testid="crypto">{bitcoin}</div>
      <button onClick={() => setBitcoin(newValue)}>To the moon</button>
      <button onClick={() => removeBitcoin()}>To the floor</button>
    </>
  );
};

describe("useStorage", () => {
  let getItem;
  let setItem;
  let removeItem;
  let rerender;

  describe("hook behaviour when initial value argument is provided", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
        },
        writable: true,
      });
      getItem = window.localStorage.getItem;
      setItem = window.localStorage.setItem;
      removeItem = window.localStorage.removeItem;

      ({ rerender } = render(<TestComponent initialState={initialValue} />));

      expect(getItem).toHaveBeenCalledTimes(1);
      expect(getItem).toHaveBeenCalledWith("bitcoin");

      const bitcoinValue = screen.queryByText(initialValue);
      expect(bitcoinValue).toBeInTheDocument();
    });

    it("uses the key passed to it to fetch the value from local storage", () => {
      // This test refers to the first 2 assertions in in the beforeEach block
    });

    it("sets the value passed to it in local storage if it does not exist yet", () => {
      expect(setItem).toHaveBeenCalledTimes(1);
      expect(setItem).toHaveBeenCalledWith("bitcoin", `"${initialValue}"`);
    });

    it("overwrites the value in local storage and updates the component", () => {
      const button = screen.getByRole("button", { name: "To the moon" });
      userEvent.click(button);

      const updatedBitcoinValue = screen.queryByText(newValue);
      expect(setItem).toHaveBeenCalledWith("bitcoin", `"${newValue}"`);
      expect(updatedBitcoinValue).toBeInTheDocument();
    });

    it("does not overwrite existing values in local storage with a new initial value", () => {
      rerender(<TestComponent initialState={newValue} />);
      const newInitialValue = screen.queryByText(newValue);

      expect(newInitialValue).not.toBeInTheDocument();
    });

    it("removes an item form the storage", () => {
      const button = screen.getByRole("button", { name: "To the floor" });
      userEvent.click(button);

      expect(removeItem).toHaveBeenCalledTimes(1);
      expect(removeItem).toHaveBeenCalledWith("bitcoin");

      const bitcoinValue = screen.queryByText(initialValue);
      expect(bitcoinValue).not.toBeInTheDocument();
    });
  });
});
