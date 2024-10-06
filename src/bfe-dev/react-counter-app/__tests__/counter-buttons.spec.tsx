import React from "react";
// import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CounterButtons } from "../counter-buttons";

describe.only("CounterButtons", () => {
  it("should render two buttons", () => {
    render(<CounterButtons />);
    expect(screen.getByText("-")).toBeInTheDocuemnt();
    expect(screen.getByText("+")).toBeInTheDocuemnt();
  });
});
