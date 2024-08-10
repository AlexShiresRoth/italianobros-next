export const featuredSectionQuery = (id: string) => `query {
  featuredSection(id: "${id}") {
    preHeading
    heading
    text {
      json
    }
    imageSize
    alignText
    ctaText
    ctaPage {
      slug
    }
    image {
      title
      url(transform : {
        width:1000
        height:1000
        format:WEBP
        quality:95
      })
    }
  }
}`;
