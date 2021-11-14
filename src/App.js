import React from "react";
import { Button } from "./shared/components/Button";
import { Main } from "./views/Main";
import startshipIcon from "./imgs/starshipIcon.png";

import "./index.css";

function App() {
  return (
    <div className="bg-primary text-primary p-6 flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between w-full pb-16">
        <a href="/">
          <img className="h-8" src={startshipIcon} alt="go home icon" />
        </a>
        <Button className="text-secondary">
          <a href="/favorites" className="text-secondary">
            View Favorites
          </a>
        </Button>
      </div>
      <Main />
    </div>
  );
}

export default App;
