import { EntryFields, EntrySys } from "contentful";

export interface ImageFields {
  title: EntryFields.Symbol;
  description: EntryFields.Symbol;
  url: EntryFields.Symbol;
}

export interface Duplex {
  __typename: "ComponentDuplex";
  sys: EntrySys;
  containerLayout: EntryFields.Boolean;
  headline: EntryFields.Text;
  bodyText: {
    json: EntryFields.RichText;
  };
}
