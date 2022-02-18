import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useToggle from "./useToggle";

const MockComponent = ({ arg }) => {
  const [value, toggleValue] = useToggle();

  return (
    <>
      <button onClick={() => toggleValue(arg)} />
      <div>{`${value}`}</div>
    </>
  );
};

it("sets the initial state to false if none was provided", () => {
  render(<MockComponent />);
  const value = screen.getByText("false");

  expect(value).toBeInTheDocument();
});

it("toggles the state if it is called without an argument", () => {
  render(<MockComponent />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  const value = screen.getByText("true");
  expect(value).toBeInTheDocument();
});

it("toggles the state if it is called with non-boolean values", () => {
  render(<MockComponent arg={"Not a boolean"} />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  const value = screen.getByText("true");
  expect(value).toBeInTheDocument();
});

it("sets the state if it is called with boolean values", () => {
  render(<MockComponent arg={false} />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  const value = screen.getByText("false");
  expect(value).toBeInTheDocument();
});
