import React, { useState, useContext } from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import {
  Magnifier,
  SideBySideMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers"
import AddToCart from "../components/Cart/AddToCart"
import Layout from "../components/layout"
import { formatPrice } from "../utils/formatPrice"
import theme from "../theme/theme"

const {
  mq: { small, tabletLandscapeUp },
} = theme

const StyledProduct = styled.div`
  width: calc(100% - 2rem);
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: ${({ theme }) => theme.spacing.section};

  img {
    max-width: none;
  }

  .column {
    width: 100%;
  }

  ${tabletLandscapeUp} {
    display: flex;
    .column {
      width: 50%;
      &.product__details {
        padding-left: ${({ theme }) => theme.spacing.gridGap};
      }
    }
  }

  .product__images {
    ${small} {
      width: 90%;
      margin: 2rem auto;
    }

    .main__image {
      margin-bottom: 1rem;
      max-width: 500px;
    }
  }

  .product__desc,
  .product__price {
    margin-bottom: 1rem;
  }

  .product__price {
    font-weight: bold;
  }
`

const StyledThumbnailNav = styled.nav`
  ul {
    display: flex;
    padding: 0;
  }

  li {
    list-style: none;
    margin-right: 0.5rem;
    &:last-of-type {
      padding-right: 40px;
    }
    ${tabletLandscapeUp} {
      &:hover {
        cursor: pointer;
      }
    }
  }

  img {
    width: 100px;
    height: 100px;
  }

  ${small} {
    width: 100%;
    height: 60px;
    overflow: hidden;
    margin: 0 auto 1rem auto;
    position: relative;

    ul {
      width: 100%;
      padding-bottom: 100px;
      overflow-x: scroll;
      overflow-y: hidden;
      margin: 0 auto;
    }

    img {
      width: 60px;
      height: 60px;
    }
  }

  img {
    border: 2px solid ${({ theme }) => theme.colors.bgColor};
    &.active {
      border-color: ${({ theme }) => theme.colors.slate};
    }
  }
`

const ProductTemplate = ({ data: { strapiProduct: data } }) => {
  const {
    name,
    description,
    price,
    images,
    images: [firstImage],
    thumbnail,
  } = data

  const firstSet = {
    small: firstImage.imageFile.childImageSharp.small.src,
    large: firstImage.imageFile.childImageSharp.large.src,
  }
  const [activeImage, setActiveImage] = useState(firstSet)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  return (
    <Layout bgColor="dark">
      <StyledProduct className="product">
        <div className="column product__images">
          <div className="main__image">
            <Magnifier
              imageSrc={activeImage.small}
              imageAlt="Example"
              largeImageSrc={activeImage.large}
              mouseActivation={MOUSE_ACTIVATION.CLICK}
              touchActivation={TOUCH_ACTIVATION.SINGLE_TAP}
            />
          </div>
          <StyledThumbnailNav>
            <ul>
              {images.map((image, index) => {
                const isActiveClass = index === activeImageIndex ? "active" : ""
                return (
                  <li
                    onClick={() => {
                      const newImage = {
                        small:
                          images[index].imageFile.childImageSharp.small.src,
                        large:
                          images[index].imageFile.childImageSharp.large.src,
                      }
                      setActiveImage(newImage)
                      setActiveImageIndex(index)
                    }}
                    key={index}
                  >
                    <img
                      className={isActiveClass}
                      src={image.imageFile.childImageSharp.small.src}
                      alt=""
                    />
                  </li>
                )
              })}
            </ul>
          </StyledThumbnailNav>
        </div>
        <div className="column product__details">
          <h1 className="product__title">{name}</h1>
          <p className="product__price">{formatPrice(price)}</p>
          <p className="product__desc">{description}</p>
          <AddToCart bgColor="dark" {...{ data }} />
        </div>
      </StyledProduct>
    </Layout>
  )
}

export const query = graphql`
  query ProductQuery($id: String!) {
    strapiProduct(id: { eq: $id }) {
      id
      strapiId
      name
      description
      price
      images {
        imageFile {
          id
          childImageSharp {
            small: fluid(maxWidth: 500) {
              src
            }
            large: fluid(maxWidth: 1000) {
              src
            }
          }
        }
      }
    }
  }
`

export default ProductTemplate
