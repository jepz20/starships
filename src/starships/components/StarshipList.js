import React from "react";
import { Startship } from "./StartshipItem";

export const StartshipList = ({ starships = [], showComments, className }) => {
  return (
    <div className={`flex flex-wrap gap-8 ${className || ""}`}>
      {starships.map((name) => (
        <Startship key={name} name={name} showComments={showComments} />
      ))}
    </div>
  );
};
