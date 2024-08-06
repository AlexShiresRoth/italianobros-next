export interface GallerySection {
  sys: { id: string };
  ctaText: string;
  ctaPage: { slug: string };
  useImageOverlay: boolean;
  imagesCollection: {
    items: {
      url: string;
      width: number;
      height: number;
      title: string;
    }[];
  };
}

export interface GalleryResponseData {
  data: {
    gallerySection: GallerySection;
  };
}
