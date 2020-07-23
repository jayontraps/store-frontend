require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require("path")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const API_URL = process.env.GATSBY_API_URL || "http://localhost:1337"

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const products = await graphql(`
    {
      allStrapiProduct {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
  products.data.allStrapiProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/product/${node.slug}`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        id: node.id,
      },
    })
  })

  const ranges = await graphql(`
    query {
      allStrapiRange {
        nodes {
          slug
          id
          strapiId
        }
      }
    }
  `)

  ranges.data.allStrapiRange.nodes.forEach(({ id, slug, strapiId }) => {
    createPage({
      path: `/range/${slug}`,
      component: path.resolve("./src/templates/RangeTemplate.js"),
      context: {
        id,
        slug,
        strapiId,
      },
    })
  })
  ranges.data.allStrapiRange.nodes.forEach(({ id, slug, strapiId }) => {
    createPage({
      path: `/catalog/${slug}`,
      component: path.resolve("./src/templates/CatalogTemplate.js"),
      context: {
        id,
        slug,
        strapiId,
      },
    })
  })
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions
  createResolvers({
    StrapiProductImages: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: `${API_URL}${source.url}`, // for S3 upload. For local: `http://localhost:1337${source.url}`,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
    StrapiRangeProductsImages: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: `${API_URL}${source.url}`, // for S3 upload. For local: `http://localhost:1337${source.url}`,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
