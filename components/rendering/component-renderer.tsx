import { PossibleComponentType } from "@/types/page.type";
import DuplexComponent from "../duplex/duplex-component";
import FeaturedSection from "../featured-section/featured-section";
import SignupBox from "../forms/sign-up/sign-up-box";
import Gallery from "../gallery/gallery";
import HeroBanner from "../hero/hero-banner";
import ComponentWrapper from "../wrappers/component-wrapper";
import CustomComponentStrategy from "./custom-component-strategy";

type Props = {
  itemsToRender: PossibleComponentType[];
  slug?: string;
};

const ComponentRenderer = ({ itemsToRender, slug }: Props) => {
  if (!itemsToRender) return null;
  return (
    <>
      {itemsToRender.map((component) => {
        if (!component?.sys?.id) {
          console.error("Component is missing sys.id", component);
          return null;
        }
        if (component.__typename === "ComponentHeroBanner") {
          return <HeroBanner {...component} key={component.sys.id} />;
        }
        if (component.__typename === "SignUpBox") {
          return (
            <ComponentWrapper key={component.sys.id} fullWidth={true}>
              <SignupBox {...component} />
            </ComponentWrapper>
          );
        }
        if (component.__typename === "FeaturedSection") {
          return <FeaturedSection key={component.sys.id} {...component} />;
        }
        if (component.__typename === "GallerySection") {
          return <Gallery key={component.sys.id} {...component} />;
        }
        if (component.__typename === "ComponentDuplex") {
          return <DuplexComponent key={component.sys.id} {...component} />;
        }
        if (component.__typename === "CustomComponent") {
          return (
            <CustomComponentStrategy
              key={component.sys.id}
              {...component}
              slug={slug}
            />
          );
        }
        console.log("Component not found", component);
      })}
    </>
  );
};

export default ComponentRenderer;
