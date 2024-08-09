import { fetchGraphQL } from "@/contentful/api";
import { duplexQuery } from "@/contentful/gql-queries/components/duplex";
import { UnknownComponent } from "@/types/component";
import { Duplex } from "@/types/duplex-component.type";
import cs from "classnames";
import SectionContainer from "../containers/section-container";
import ThreeQuarterContainer from "../containers/three-quarter-container";
import RichTextRender from "../rendering/rich-text-render";

interface DuplexResponseData {
  data: {
    componentDuplex: Duplex;
  };
}

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<DuplexResponseData>(duplexQuery(id));

    if (!res.data) throw new Error("Could not locate duplex data");

    return res.data.componentDuplex;
  } catch (error) {
    console.error("Error fetching duplex data:", error);
    return null;
  }
}

const DuplexComponent = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);
  if (!data) return null;
  return (
    <SectionContainer>
      <ThreeQuarterContainer
        containerClassNames={cs("gap-12 justify-between ", {
          "flex-col md:flex-row ": !data.containerLayout,
          "flex-col items-center": data.containerLayout,
        })}
      >
        {data.headline && (
          <div className='flex flex-col items-center gap-8'>
            <h2 className='text-center text-2xl md:text-4xl font-semibold text-gray-500'>
              {data.headline}
            </h2>
            <span className='bg-primary w-20 h-1' />
          </div>
        )}
        {data.bodyText && (
          <div className='max-w-2xl'>
            <RichTextRender content={data.bodyText} />
          </div>
        )}
      </ThreeQuarterContainer>
    </SectionContainer>
  );
};

export default DuplexComponent;
