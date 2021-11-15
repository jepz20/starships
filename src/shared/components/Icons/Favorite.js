import React from "react";
export const Favorite = ({ className, id }) => {
  return (
    <svg
      className={className}
      data-testid={`favorite-icon-${id}`}
      width="26"
      height="23"
      viewBox="0 0 26 23"
      style={{ overflow: "visible" }}
      fill="none"
    >
      <path d="M13 22.9548C13 22.9548 0.5 15.4548 0.5 7.1987C0.5 3.40988 3.525 0.454834 7.375 0.454834C9.55 0.454834 11.6375 1.44802 13 3.00524C14.3625 1.44802 16.45 0.454834 18.625 0.454834C22.475 0.454834 25.5 3.40988 25.5 7.1987C25.5 15.4548 13 22.9548 13 22.9548Z" />
    </svg>
  );
};
