import { fetchGraphQL } from "@/contentful/api";
import { infoBlockQuery } from "@/contentful/gql-queries/components/info-block";
import { UnknownComponent } from "@/types/component";
import { InfoBlockdata } from "@/types/info-block";
import cs from "classnames";
import Image from "next/image";
import SectionContainer from "../containers/section-container";
import RichTextRender from "../rendering/rich-text-render";

interface InfoBlockResponseData {
  data: {
    componentInfoBlock: InfoBlockdata;
  };
}

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<InfoBlockResponseData>(infoBlockQuery(id));

    return res.data.componentInfoBlock;
  } catch (error) {
    console.error("Error fetching info block data:", error);
    return null;
  }
}

const InfoBlock = async (component: UnknownComponent) => {
  const data = await getComponent(component.sys.id);

  if (!data) return null;

  return (
    <SectionContainer>
      {" "}
      <div
        data-component-type='info-block'
        className='flex flex-col md:grid md:grid-cols-3 gap-4'
      >
        {data.blocksCollection.items.map((block, index) => {
          return (
            <div
              className='flex flex-col items-center justify-center p-4 rounded  gap-6'
              key={block.sys.id}
            >
              {block.image && (
                <div
                  className={cs(
                    "rounded-lg p-2  self-start flex justify-center items-center"
                  )}
                >
                  <Image
                    src={block.image.url}
                    alt={block.image.title}
                    width={40}
                    height={40}
                  />
                </div>
              )}
              {block.heading && (
                <>
                  <h3 className='text-3xl font-semibold text-gray-500'>
                    {block.heading}
                  </h3>
                  <span className='h-0.5 w-12 bg-primary block my-2' />
                </>
              )}
              {block.text && (
                <RichTextRender
                  content={block.text}
                  classNames='text-gray-400 gap-2'
                />
              )}
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};

export default InfoBlock;
