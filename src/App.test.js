import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("displays primary colors landing page by default", () => {
    render(<App />);
    const landingElement = screen.getByTestId("PrimaryColorsLandingPage");
    expect(landingElement).toBeInTheDocument();
    expect(screen.getByText(/Primary Colors Landing Page/i)).toBeInTheDocument();
});

test("can navigate from landing page to idle game and back", () => {
    render(<App />);
    
    // Initially on primary colors landing page
    expect(screen.getByTestId("PrimaryColorsLandingPage")).toBeInTheDocument();

    // Click Go to Idle Game button
    const goToGameButton = screen.getByTestId("go-to-game-button");
    fireEvent.click(goToGameButton);

    // Now on game page
    const titleElement = screen.getByText(/endless simple idle game/i);
    expect(titleElement).toBeInTheDocument();

    const pointsElement = screen.getByText((content, element) => {
        const hasText = (node) => node.textContent.match(/points: [\d.\w]+/i);
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every(
            (child) => !hasText(child),
        );
        return elementHasText && childrenDontHaveText;
    });
    expect(pointsElement).toBeInTheDocument();

    // Click back button to return to primary colors landing page
    const backButton = screen.getByTestId("back-to-colors-button");
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    expect(screen.getByTestId("PrimaryColorsLandingPage")).toBeInTheDocument();
});
