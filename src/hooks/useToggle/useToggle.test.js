import { render, screen } from "@testing-library/react";
import useToggle from "./useToggle";

const MockComponent = () => {
  const [value, toggleValue] = useToggle();

  return (
    <>
      <button onClick={() => toggleValue()} />
      <div>{`${value}`}</div>
    </>
  );
};

it("sets the initial state to false if none was provided", () => {
  render(<MockComponent />);
  const value = screen.getByText("false");

  expect(value).toBeInTheDocument();
});
