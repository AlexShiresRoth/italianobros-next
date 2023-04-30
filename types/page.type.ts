import { EntryFields } from "contentful";
import { Duplex } from "./duplex-component.type";
export type InputItem = {
  sys: {
    id: string;
  };
  label: string;
  showLabel: boolean;
  selectOptions: null;
  inputType: string;
  inputName: string;
  placeholderText: string | null;
};

export type InputItemsCollection = {
  items: InputItem[];
};

export type Form = {
  sys: {
    id: string;
  };
  internalName: string;
  inputsCollection: InputItemsCollection;
  submitButtonText: string;
};

export type ComponentHeroBanner = {
  __typename: "ComponentHeroBanner";
  sys: {
    id: string;
  };
  headline: string;
  ctaText: string;
  image: {
    url: string;
    title: string;
    description: string;
  };
  targetPage: {
    sys: {
      id: string;
    };
    __typename: "Page";
    slug: string;
  };
  bodyText: EntryFields.RichText;
};

export type SignUpBox = {
  __typename: "SignUpBox";
  sys: {
    id: string;
  };
  internalName: string;
  headline: string;
  subline: string;
  form: Form;
};

type TopSectionCollectionItem = ComponentHeroBanner | SignUpBox | Duplex;

export type TopSectionCollection = {
  items: TopSectionCollectionItem[];
};

export type PageCollectionItem = {
  topSectionCollection: TopSectionCollection;
};

export type PageCollection = {
  items: PageCollectionItem[];
};

export type PageJSON = {
  pageCollection: PageCollection;
};
