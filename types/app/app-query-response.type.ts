import { SEOMetadata } from "../page.type";

export interface AppQueryResponse {
  data: {
    appCollection: {
      items: {
        seoMetadata: SEOMetadata;
        sys: {
          id: string;
        };
        header: {
          sys: {
            id: string;
          };
          __typename: string;
        };
        footer: {
          sys: {
            id: string;
          };
          __typename: string;
        };
        homePage: {
          sys: {
            id: string;
          };
        };
      }[];
    };
  };
}
