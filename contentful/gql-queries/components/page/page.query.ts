export const pageQuery = (slug: string): string => `query {
  pageCollection(where: { slug: "${slug}" }, limit: 1) {
    items {
      seoMetadata {
        name
        title
        description
        image {
          url(transform: { width: 500, height: 500, format: WEBP, quality: 65 })
        }
        noIndex
        noFollow
      }
      pageName
      slug
      sys {
        id
      }
      topSectionCollection {
        items {
          __typename
          ... on ComponentHeroBanner {
            sys {
              id
            }
          }
          ... on FeaturedSection {
            sys {
              id
            }
          }
        }
      }
      pageContent {
        __typename
      }
      extraSectionCollection {
        items {
          __typename
        }
      }
    }
  }
}
`;

export const pageCollectionQuerySlugOnly = (
  limit: number = 100,
  skip: number = 0,
  slug?: string
) => `query {
  pageCollection(limit: ${limit}, skip: ${skip}, where: { slug_exists: true , slug: "${slug}" }) {
    items {
      slug
      sys {
        id
      }
    }
  }
 }`;
