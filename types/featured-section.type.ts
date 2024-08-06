import { Document } from "@contentful/rich-text-types";

export interface FeaturedSectionResponseData {
  data: {
    featuredSection: FeaturedSection;
  };
}

export interface FeaturedSection {
  text: { json: Document };
  preHeading: string;
  heading: string;
  imageSize: "full" | "half";
  alignText: "left" | "right";
  ctaText: string;
  ctaPage: {
    slug: string;
  };
  image: {
    title: string;
    url: string;
  };
}
