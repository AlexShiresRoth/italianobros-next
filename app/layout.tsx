import { fetchGraphQL } from "@/contentful/api";
import { appQuery } from "@/contentful/gql-queries";
import { AppQueryResponse } from "@/types/app";
import { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: ["300", "400", "500", "600", "700"],
});

type Props = {
  children: React.ReactNode;
};

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

export async function generateMetadata(): Promise<Metadata> {
  const app = await getAppData(process.env.DOMAIN as string);

  if (!app) {
    return {
      title: `Blog Starter`,
      description:
        "Starting Template For a Blog Site, using contentful and NextJS 14",
    };
  }

  return {
    title: app.seoMetadata.title,
    description: app.seoMetadata.description,
    openGraph: {
      images: [app.seoMetadata.image.url],
      title: app.seoMetadata.title,
      description: app.seoMetadata.description,
    },
  };
}

export default async function RootLayout({ children }: Props) {
  const app = await getAppData(process.env.DOMAIN as string);
  if (!app) return null;

  return (
    <>
      <html lang='en' className={`${garamond.className}`}>
        <body>
          <>{children}</>
        </body>
      </html>
    </>
  );
}
