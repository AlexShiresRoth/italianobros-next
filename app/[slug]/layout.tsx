import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { fetchGraphQL } from "@/contentful/api";
import { appQuery } from "@/contentful/gql-queries";
import type { AppQueryResponse } from "@/types/app";
import { Suspense } from "react";
async function getAppData(domain: string) {
  try {
    const res = await fetchGraphQL<AppQueryResponse>(appQuery(domain));

    const app = res.data.appCollection.items[0];

    return app;
  } catch (error) {
    console.error("Error fetching app data:", error);
    return null;
  }
}
export default async function DynamicLayout({ children, params }: any) {
  const app = await getAppData(process.env.DOMAIN as string);
  if (!app) return null;
  return (
    <>
      <Suspense>
        <Header data={app.header} slug={params.slug || ""} />
      </Suspense>
      {children}
      <Footer data={app.footer} />
    </>
  );
}
