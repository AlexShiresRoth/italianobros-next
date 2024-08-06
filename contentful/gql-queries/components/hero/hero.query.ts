export const heroQuery = (id: string) => `query {
  componentHeroBanner(id: "${id}") {
    sys {
      id
    }
    __typename
    headline
    bodyText {
      json
    }
    ctaText
    externalLink
    targetPage {
      ... on Page {
        slug
      }
    }
    image {
      ... on Asset {
          url(transform :{
            format: WEBP
            width: 1000
            quality: 90
  })
        title
        description 
      }
    }
      imagesCollection {
      items {
        ... on Asset {
          url(transform :{
            format: WEBP
            width: 1000
            quality: 90
      })
          title
          description 
        }
      } 
    }
  }
}
`;
