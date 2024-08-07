export interface CustomComponent {
  sys: {
    id: string;
  };
  title: string;
  // TODO - add componentNames for each component
  componentName: "Instagram Feed Display";
}

export interface CustomComponentResponseData {
  data: {
    customComponent: CustomComponent;
  };
}
