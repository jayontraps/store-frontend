import { css } from "@emotion/core"
import theme from "./theme"

const globalStyles = () => {
  const { colors, fonts } = theme
  return css`
    @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap");
    * {
      box-sizing: border-box;
      margin: 0;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    body,
    html {
      color: ${colors.primary};
      font-size: 15px;
      line-height: 1.4;
      font-family: ${fonts.family};
      background-color: ${colors.bgColor};
    }

    h1 {
      font-size: 2.5rem;
    }

    .button {
      appearance: none;
      border: 0;
      outline: none;
      display: inline-block;
      padding: 1em;
      background-color: rgba(75, 75, 75, 0.15);
      &:disabled {
        background-color: whitesmoke;
      }
      &:hover {
        cursor: pointer;
      }
    }

    .btn_icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .animated {
      animation-duration: 1s;
      animation-fill-mode: both;
    }

    .animated.infinite {
      animation-iteration-count: infinite;
    }

    .animated.hinge {
      animation-duration: 2s;
    }

    .animated.bounceIn,
    .animated.bounceOut {
      animation-duration: 0.75s;
    }

    .animated.flipOutX,
    .animated.flipOutY {
      animation-duration: 0.75s;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translate3d(-500%, 0, 0);
      }

      to {
        opacity: 1;
        transform: none;
      }
    }

    .fadeInLeft {
      animation-name: fadeInLeft;
    }
  `
}

export default globalStyles
