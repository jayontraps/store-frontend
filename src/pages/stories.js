import React from "react"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import theme from "../theme/theme"
import StoryCard from "../components/StoryCard"

const {
  mq: { mediumOnly, medium, large },
} = theme

const StyledCardGrid = styled.div`
  height: 300vh;
  ${medium} {
    height: 100vh;
  }
  position: relative;
  display: grid;
  background-color: ${({ theme }) => theme.colors.dark_green_grey};
  grid-gap: 5px;
  .card {
    &__1 {
      background-color: rgba(0, 0, 0, 0.2);
      .Card__back {
        background-color: ${({ theme }) => theme.colors.dark_green};
      }

      .Card__front {
        background-image: url(/img/cards/square-2.jpg);
        background-size: cover;
      }

      .Card__front--tint {
        background-color: ${({ theme }) => theme.colors.dark_green};
      }
    }

    &__2 {
      background-color: rgba(0, 0, 0, 0.3);
      .Card__back {
        background-color: ${({ theme }) => theme.colors.dark_green_grey};
      }

      .Card__front {
        background-image: url("/img/cards/map-quilt-3.jpg");
        background-size: cover;
      }

      .Card__front--tint {
        background-color: ${({ theme }) => theme.colors.dark_green_grey};
      }
    }

    &__3 {
      background-color: rgba(0, 0, 0, 0.4);
      .Card__back {
        background-color: ${({ theme }) => theme.colors.dark_brown};
      }

      .Card__front {
        background-image: url("/img/cards/square-3.jpg");
        background-size: cover;
        background-position: bottom;
      }

      .Card__front--tint {
        background-color: ${({ theme }) => theme.colors.dark_brown};
      }
    }

    &__4 {
      background-color: rgba(0, 0, 0, 0.5);
      .Card__back {
        background-color: ${({ theme }) => theme.colors.dark_green_grey};
      }

      .Card__front {
        background-image: url("/img/cards/square.jpg");
        background-size: cover;
      }

      .Card__front--tint {
        background-color: ${({ theme }) => theme.colors.dark_green_grey};
      }
    }

    &__5 {
      background-color: rgba(0, 0, 0, 0.6);
      .Card__back {
        background-color: ${({ theme }) => theme.colors.red};
      }

      .Card__front {
        background-image: url("/img/cards/square-2.jpg");
        background-size: cover;
      }

      .Card__front--tint {
        background-color: ${({ theme }) => theme.colors.red};
      }
    }

    &__6 {
      background-color: rgba(0, 0, 0, 0.7);
      .Card__back {
        background-color: ${({ theme }) => theme.colors.pink};
      }

      .Card__front {
        background-image: url("/img/cards/square.jpg");
        background-size: cover;
      }

      .Card__front--tint {
        background-color: ${({ theme }) => theme.colors.pink};
      }
    }

    &__7 {
      background-color: rgba(0, 0, 0, 0.8);
      .Card__back {
        background-color: ${({ theme }) => theme.colors.dark_blue};
      }

      .Card__front {
        background-image: url("/img/cards/flowers.jpg");
        background-size: cover;
      }

      .Card__front--tint {
        background-color: ${({ theme }) => theme.colors.dark_blue};
      }
    }
  }

  ${mediumOnly} {
    grid-template-columns: 30% 20% 50%;
    .card {
      &__1 {
        grid-row: span 3;
      }
      &__2 {
        grid-column: span 2;
        grid-row: span 2;
      }
      &__3 {
        grid-row: span 2;
      }
      &__4 {
        grid-row: span 2;
      }
      &__5 {
        grid-row: span 2;
      }
      &__6 {
        grid-column: span 2;
        grid-row: span 2;
      }
      &__7 {
      }
    }
  }

  ${large} {
    grid-template-columns: 19.3% 10% 30% 19.3% 19.3%;
    grid-template-rows: 40% 20% 40%;
    .card {
      &__1 {
        grid-row: span 2;
      }
      &__2 {
        grid-column: span 2;
        grid-row: span 2;
      }
      &__3 {
        grid-column: span 2;
      }
      &__4 {
        grid-row: span 2;
      }
      &__5 {
        grid-row: span 2;
      }
      &__6 {
        grid-column: span 2;
      }
      &__7 {
      }
    }
  }
`

const StoriesPage = () => {
  return (
    <Layout withHero>
      <SEO title="Stories" />
      <StyledCardGrid className="cardgrid">
        <div className="card card__1">
          <StoryCard card={cards[0]} />
        </div>
        <div className="card card__2">
          <StoryCard card={cards[1]} />
        </div>
        <div className="card card__3">
          <StoryCard card={cards[2]} />
        </div>
        <div className="card card__4">
          <StoryCard card={cards[3]} />
        </div>
        <div className="card card__5">
          <StoryCard card={cards[4]} />
        </div>
        <div className="card card__6">
          <StoryCard card={cards[5]} />
        </div>
        <div className="card card__7">
          <StoryCard card={cards[6]} />
        </div>
      </StyledCardGrid>
    </Layout>
  )
}

const cards = [
  {
    heading: "Antique flower illustrations",
    text: () => (
      <p>
        I found a gorgeous antique book on flowers in Oxfam, Marylebone. This
        original image is mounted on FSC birch plywood and finished with a low
        VOC sealant.
      </p>
    ),
    label: "no 1 - Flower illustrations",
  },
  {
    heading: "1937 Daily Mail",
    text: () => (
      <>
        <p>
          1937 Daily Mail linen-backed map purchased for a song at a Devon car
          boot sale.{" "}
        </p>
        <p>FSC birch plywood and finished with a low VOC sealant.</p>
      </>
    ),
    label: "no 2 - 1937 Daily Mail",
  },
  {
    heading: "Mister Spock",
    text: () => (
      <>
        <p>
          I stumbled across a Vintage Star Trek comic whilst visiting a small
          town in North Wales.{" "}
        </p>
        <p>FSC birch plywood and finished with a low VOC sealant.</p>
      </>
    ),
    label: "no 3 - Mister Spock",
  },
  {
    heading: "Mid 20th century map",
    text: () => (
      <>
        <p>
          My favourite maps are ones which show the river Thames and the docks
          in their heyday. The areas of London which have probably changed the
          most are those flanking the river.
        </p>
        <p>FSC birch plywood and finished with a low VOC sealant.</p>
      </>
    ),
    label: "no 4 - Mid 20th century map",
  },
  {
    heading: "Antique flower illustrations",
    text: () => (
      <p>
        I found a gorgeous antique book on flowers in Oxfam, Marylebone. I used
        this image on FSC birch plywood and finished it with a low VOC sealant.
      </p>
    ),
    label: "no 5 - Flower illustrations",
  },
  {
    heading: "Mid 20th century map",
    text: () => (
      <>
        <p>
          My favourite maps are ones which show the river Thames and the docks
          in their heyday. The areas of London which have probably changed the
          most are those flanking the river.
        </p>
        <p>FSC birch plywood and finished with a low VOC sealant.</p>
      </>
    ),
    label: "no 6 - Mid 20th century map",
  },

  {
    heading: "Wild Flowers",
    text: () => (
      <>
        <p>
          Cut from a book on wild flowers I had as a child, my flower coasters
          are popular on Mothers Day, and as valentine and birthday gifts for
          garden-lovers.
        </p>
        <p> FSC birch plywood and finished with a low VOC sealant.</p>
      </>
    ),
    label: "no 7 - Wild flowers",
  },
]

export default StoriesPage
