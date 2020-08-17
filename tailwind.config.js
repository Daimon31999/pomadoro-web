module.exports = {
  purge: [],
  theme: {
    backgroundColor: theme => ({
      ...theme("colors"),
      longBreak: "#191c18",
    }),
    fontFamily: {
      "futura-med": "Futura Medium",
      "futura-lite": "Futura Light",
      "futura-bold": "Futura Bold",
      "source-lite": "Source Sans Pro",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
