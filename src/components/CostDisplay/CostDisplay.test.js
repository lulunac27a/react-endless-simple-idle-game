import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CostDisplay from "./CostDisplay";

describe("<CostDisplay />", () => {
    test("it should mount", () => {
        render(<CostDisplay />);

        const costDisplay = screen.getByTestId("CostDisplay");

        expect(costDisplay).toBeInTheDocument();
    });
});
