import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import RichTextAsset from "./rich-text-asset";
import RichTextEntry from "./rich-text-entry";

const customMarkdownOptions = (content: any) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
      <RichTextAsset id={node.data.target.sys.id} />
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => (
      <RichTextEntry entryId={node.data.target.sys.id} />
    ),
    [BLOCKS.HEADING_1]: (node: any) => (
      <h1 className='text-3xl md:text-5xl font-bold text-gray-900'>
        {node.content[0].value}
      </h1>
    ),
    [BLOCKS.HEADING_3]: (node: any) => (
      <h3 className='text-2xl font-bold text-gray-700'>
        {node.content[0].value}
      </h3>
    ),

    [BLOCKS.PARAGRAPH]: (node: any) => {
      const foundHyperlink = node.content.find(
        (content: { nodeType: string }) =>
          content.nodeType === INLINES.HYPERLINK
      );

      if (foundHyperlink) {
        return (
          <a className='my-2 text-primary block' href={foundHyperlink.data.uri}>
            {foundHyperlink.content[0].value}
          </a>
        );
      }
      return <p className='my-2'>{node.content[0].value}</p>;
    },
  },
});

const RichTextRender = ({
  content,
  classNames,
}: {
  content: {
    json: Document;
  };
  classNames?: string;
}) => {
  return (
    <div className={classNames}>
      {documentToReactComponents(content.json, customMarkdownOptions(content))}
    </div>
  );
};

export default RichTextRender;
