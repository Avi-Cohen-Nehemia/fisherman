import React from "react";
import { render, screen } from "@testing-library/react";
import { useAsync } from "./index";

describe("useAsync", () => {
  const callback = (result = true) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        result ? resolve('success') : reject('error!');
      }, 200)
    });
  };

  const TestComponent = ({ result }) => {
    const { loading, data, error } = useAsync(() => callback(result));

    return (
      <>
        <div>loading: {`${loading}`}</div>
        <div>data: {data || 'undefined'}</div>
        <div>error: {error || 'undefined'}</div>
      </>
    );
  };

  it("returns loading as true while in progress", () => {
    render(<TestComponent />);
    const loading = screen.getByText('loading: true');
    const data = screen.getByText('data: undefined');
    const error = screen.getByText('error: undefined');

    expect(loading).toBeInTheDocument();
    expect(data).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });

  it("fetches the data when successful", async () => {
    render(<TestComponent />);
    const loading = await screen.findByText('loading: true');
    const data = await screen.findByText('data: success');
    const error = await screen.findByText('error: undefined');

    expect(loading).toBeInTheDocument();
    expect(data).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });

  it("returns an error when rejected", async () => {
    render(<TestComponent result={false} />);
    const loading = await screen.findByText('loading: false');
    const data = await screen.findByText('data: undefined');
    const error = await screen.findByText('error: error!');
  
    expect(loading).toBeInTheDocument();
    expect(data).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });
  
  it("sets loading to false once the the callback finished its process", async () => {
    render(<TestComponent />);
    const loading = await screen.findByText('loading: false');
    expect(loading).toBeInTheDocument();
  });
});
