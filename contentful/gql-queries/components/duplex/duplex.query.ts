export const duplexQuery = (id: string): string => `
query {
  componentDuplex(id: "${id}") {
    sys {
      id
    }
    containerLayout
    headline
    bodyText {
    json
    }
  }
}
`;
