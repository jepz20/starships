module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#000408",
      secondary: "#232524",
    }),
    textColor: {
      primary: "#FFF",
      secondary: "#FF6871",
      grey: "rgba(255, 255, 255, 0.5)",
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      grey: "#D9D9D9",
    }),
    extend: {
      strokeWidth: {
        3: "3",
      },
      width: {
        "card-xl": "596px",
        "card-m": "450px",
        "card-s": "347px",
        "card-image-m": "200px",
        "card-image-s": "120px",
      },
      height: {
        "card-m": "338px",
        "card-s": "200px",
        "card-image-s": "180px",
      },
      maxWidth: {
        "card-m": "596px",
        "card-s": "347px",
      },
    },
  },
  variants: {
    extend: {
      textOpacity: ["hover"],
    },
  },
  plugins: [],
};
