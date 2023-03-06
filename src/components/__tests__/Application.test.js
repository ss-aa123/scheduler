import React from "react";

//Import our helper functions from the react-testing-library
import { render, cleanup } from "@testing-library/react";

// Import the component that we are testing
import Application from "components/Application";

afterEach(cleanup);

//A test that renders a React Component
it("renders without crashing", () => {
  render(<Application />);
});
