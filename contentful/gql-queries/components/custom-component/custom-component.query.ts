export const customComponentQuery = (id: string): string => `query {
  customComponent( id: "${id}") {
      sys {
        id
      }
     title
     componentName
  }
}
`;
