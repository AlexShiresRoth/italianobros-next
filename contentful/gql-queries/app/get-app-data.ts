import { fetchGraphQL } from "@/contentful/api";
import { AppQueryResponse } from "@/types/app";
import { appQuery } from "./app.query";

export async function getAppData(domain: string) {
  try {
    const res = await fetchGraphQL<AppQueryResponse>(appQuery(domain));

    const app = res.data.appCollection.items[0];

    return app;
  } catch (error) {
    console.error("Error fetching app data:", error);
    return null;
  }
}
