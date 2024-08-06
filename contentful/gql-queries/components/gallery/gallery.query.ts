export const galleryQuery = (id: string): string => `query {
  gallerySection(id: "${id}") {
    sys {
      id
    }
    ctaText
    ctaPage {
      slug
    }
    useImageOverlay
    imagesCollection {
      items {
        sys {
          id
        }
        width
        height
        url(transform: { width: 500, height: 300, format: WEBP, quality: 85 })
        title
      }
    }
  }
}
`;
