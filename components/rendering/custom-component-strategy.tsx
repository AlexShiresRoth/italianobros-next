import { fetchGraphQL } from "@/contentful/api";
import { customComponentQuery } from "@/contentful/gql-queries";
import { CustomComponentResponseData } from "@/types/component/custom-component.type";
import { PossibleComponentType } from "@/types/page.type";
import InstagramEmbed from "../custom/instagram-display";

async function getCustomComponent(id: string) {
  try {
    const res = await fetchGraphQL<CustomComponentResponseData>(
      customComponentQuery(id)
    );
    return res.data.customComponent;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}

export default async function CustomComponentStrategy(
  component: PossibleComponentType
) {
  const customComponentData = await getCustomComponent(component.sys.id);

  if (!customComponentData) return null;

  switch (customComponentData.componentName) {
    case "Instagram Feed Display":
      return <InstagramEmbed />;
    default:
      return null;
  }
}
