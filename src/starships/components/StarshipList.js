import React from "react";
import { Startship } from "./StartshipItem";

export const StartshipList = ({ starships = [] }) => {
  return (
    <div className="flex flex-wrap gap-8">
      {starships.map((name) => (
        <Startship key={name} name={name} />
      ))}
    </div>
  );
};
