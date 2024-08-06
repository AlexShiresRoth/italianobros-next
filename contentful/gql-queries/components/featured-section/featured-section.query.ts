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
        width:800,
        height:600
        format:WEBP
        quality:85
      })
    }
  }
}`;
