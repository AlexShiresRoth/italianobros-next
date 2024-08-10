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
        url(transform: { width: 1000, height: 1000, format: WEBP, quality: 95 })
        title
      }
    }
  }
}
`;
