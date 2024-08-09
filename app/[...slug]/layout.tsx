import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { getAppData } from "@/contentful/gql-queries";

export default async function PageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const app = await getAppData(process.env.DOMAIN as string);

  if (!app) return null;
  const slugs = params.slug;
  const slug = slugs[slugs.length - 1];
  return (
    <>
      <Header data={app.header} slug={slug} />
      {children}
      <Footer data={app.footer} />
    </>
  );
}
