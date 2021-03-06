import React from "react";
import { HighlightButton } from "./shared/components/Button";
import { Main } from "./views/Main";
import { Favorites } from "./views/Favorites";
import startshipIcon from "./imgs/starshipIcon.png";

import "./index.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { ErrorBoundary } from "./shared/components/ErrorBoundary";

function App() {
  const location = useLocation();
  return (
    <div className="bg-primary text-primary p-6 flex flex-col">
      <div className="flex flex-row justify-between w-full pb-16">
        <Link to="/" data-testid="gohome-link">
          <img className="h-8" src={startshipIcon} alt="go home icon" />
        </Link>
        {location.pathname !== "/favorites" && (
          <Link to="/favorites" className="text-secondary">
            <HighlightButton>View Favorites</HighlightButton>
          </Link>
        )}
      </div>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
