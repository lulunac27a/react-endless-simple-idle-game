import React from "react";
import PropTypes from "prop-types";
import styles from "./PrimaryColorsLandingPage.module.css";

const PRIMARY_COLORS = [
    { name: "Red", color: "#ff0000" },
    { name: "Green", color: "#00ff00" },
    { name: "Blue", color: "#0000ff" },
    { name: "Yellow", color: "#ffff00" },
];

const PrimaryColorsLandingPage = ({ onNavigateToGame }) => {
    return (
        <div className={styles.PrimaryColorsLandingPage} data-testid="PrimaryColorsLandingPage">
            <h1>Primary Colors Landing Page</h1>
            <p>Welcome! Here are the primary colors:</p>
            <div className={styles.colorGrid}>
                {PRIMARY_COLORS.map((item) => (
                    <div key={item.name} className={styles.colorCard} data-testid={`color-block-${item.name.toLowerCase()}`}>
                        <div
                            className={styles.colorBox}
                            style={{ backgroundColor: item.color }}
                            role="img"
                            aria-label={`${item.name} color swatch`}
                            data-testid={`color-box-${item.name.toLowerCase()}`}
                        />
                        <span className={styles.colorName}>{item.name}</span>
                    </div>
                ))}
            </div>
            <div className={styles.navigationSection}>
                <button
                    className={styles.gameLinkButton}
                    onClick={onNavigateToGame}
                    data-testid="go-to-game-button"
                >
                    Go to Idle Game
                </button>
            </div>
        </div>
    );
};

PrimaryColorsLandingPage.propTypes = {
    onNavigateToGame: PropTypes.func.isRequired,
};

export default PrimaryColorsLandingPage;
