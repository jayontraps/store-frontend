const theme = {
  mq: {
    small: "@media (max-width: 480px)",
    smallToTabletLandscap: "@media (max-width: 768px)",
    tabletLandscapeUp: "@media (min-width: 769px)",
    mediumOnly: "@media (min-width: 481px) and (max-width: 1028px)",
    medium: "@media (min-width: 481px)",
    large: "@media (min-width: 1029px)",
  },
  layout: {
    innerWidth: "800px",
    maxWidth: "1100px",
    productWidth: "1080px",
    leaderWidth: "800px",
    maxLineLength: "700px",
    width: "95%",
  },
  spacing: {
    section: "4rem",
    gridGap: "2rem",
  },
  animation: {
    duration: "700ms",
    easing: "ease-out",
  },
  colors: {
    bgColor: "#F8E1B6", // F8E1B6
    bgColorDark: "#20232f",
    bgColorLight: "#FFF0D4",
    primary: "#17181A",
    slate: "#20232f",
    slateTrans: "rgba(32, 35, 47, 0.4)",
    darkSlate: "#1f1919",
    active: "#FF9F00",
    activeDark: "#804F00",
    borderColor: "rgba(75, 75, 75, .25)",
    dark_green: "#155147",
    dark_green_grey: "#454E4C",
    dark_brown: "#8B7262",
    dark_blue: "#053551",
    red: "#410C12",
    pink: "#CE917E",
    disabled: "whitesmoke",
    checkout: {
      bgColor: "rgba(255, 255, 255, 0.4)", // #7795f8
      placeholder: "rgba(0, 0, 0, 0.25)", // #7795f8
      border: "rgba(0, 0, 0, 0.25)", // #7795f8
      label: "#17181A",
    },
  },
  fonts: {
    family: `Raleway, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol"`,
  },
}

export default theme
