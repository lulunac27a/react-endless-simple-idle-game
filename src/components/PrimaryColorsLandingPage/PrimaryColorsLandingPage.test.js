import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PrimaryColorsLandingPage from "./PrimaryColorsLandingPage";

describe("<PrimaryColorsLandingPage />", () => {
    test("it should render landing page with title and navigation button", () => {
        const handleNavigate = jest.fn();
        render(<PrimaryColorsLandingPage onNavigateToGame={handleNavigate} />);

        expect(screen.getByTestId("PrimaryColorsLandingPage")).toBeInTheDocument();
        expect(screen.getByText(/Primary Colors Landing Page/i)).toBeInTheDocument();
        const button = screen.getByTestId("go-to-game-button");
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(handleNavigate).toHaveBeenCalledTimes(1);
    });

    test("it should render all four primary color blocks with correct names and box styles", () => {
        const handleNavigate = jest.fn();
        render(<PrimaryColorsLandingPage onNavigateToGame={handleNavigate} />);

        const colors = [
            { name: "red", color: "rgb(255, 0, 0)" },
            { name: "green", color: "rgb(0, 255, 0)" },
            { name: "blue", color: "rgb(0, 0, 255)" },
            { name: "yellow", color: "rgb(255, 255, 0)" },
        ];

        colors.forEach(({ name, color }) => {
            const block = screen.getByTestId(`color-block-${name}`);
            expect(block).toBeInTheDocument();

            const box = screen.getByTestId(`color-box-${name}`);
            expect(box).toBeInTheDocument();
            expect(box).toHaveStyle(`background-color: ${color}`);

            expect(screen.getByText(new RegExp(name, "i"))).toBeInTheDocument();
        });
    });
});
