import { getAppData } from "@/contentful/gql-queries";
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
