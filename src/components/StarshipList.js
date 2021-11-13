import React from "react";
import { Startship } from "./StartshipItem";

export const StartshipList = ({ ships = [] }) => {
  return (
    <div className="flex flex-wrap gap-8">
      {ships.map((ship) => (
        <Startship key={ship.name} ship={ship} />
      ))}
    </div>
  );
};
