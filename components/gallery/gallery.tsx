import { fetchGraphQL } from "@/contentful/api";
import { galleryQuery } from "@/contentful/gql-queries/components/gallery";
import { GalleryResponseData } from "@/types";
import { PossibleComponentType } from "@/types/page.type";
import Image from "next/image";
import Link from "next/link";
import SectionContainer from "../containers/section-container";

async function getGallery(id: string) {
  try {
    const res = await fetchGraphQL<GalleryResponseData>(galleryQuery(id), 60, [
      "galleryCollection",
    ]);

    if (!res.data) throw new Error("Could not locate gallery data");

    return res.data.gallerySection;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return null;
  }
}

export default async function Gallery(props: PossibleComponentType) {
  const gallery = await getGallery(props.sys.id);

  if (!gallery) return null;
  return (
    <SectionContainer bgColor='bg-primary/10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {gallery.imagesCollection.items.length > 0 &&
          gallery.imagesCollection.items.map((image, index) => (
            <div
              key={index}
              className='flex flex-col justify-center items-center relative'
            >
              <Image
                src={image.url}
                alt={image.title}
                className='w-full h-full object-cover'
                width={image.width}
                height={image.height}
                unoptimized
              />
              {gallery.useImageOverlay && (
                <Link
                  href={gallery.ctaPage.slug || ""}
                  className='absolute top-0 left-0 w-full h-full bg-gray-500/40 flex flex-col justify-center items-center hover:bg-primary/40 transition-colors'
                >
                  <h3 className='text-white text-2xl md:text-4xl uppercase font-garamond'>
                    {image.title}
                  </h3>
                </Link>
              )}
            </div>
          ))}
      </div>
      {gallery.ctaPage && gallery.ctaText && (
        <div className='w-full flex justify-center items-center mt-8'>
          <Link
            href={gallery.ctaPage.slug}
            className='font-sans uppercase font-semibold border-2 border-primary py-3 px-8 bg-primary text-white transition-all hover:text-white hover:shadow-md'
          >
            {gallery.ctaText}
          </Link>
        </div>
      )}
    </SectionContainer>
  );
}
