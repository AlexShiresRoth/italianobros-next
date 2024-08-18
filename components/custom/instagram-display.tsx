import { InstagramMedia } from "@/types";
import { createClient } from "@vercel/kv";
import { ArrowRight } from "lucide-react";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import SectionContainer from "../containers/section-container";

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const getRestTokenFromDB = unstable_cache(
  async function (): Promise<string | null> {
    const token = await kv.get("token");

    return token as string;
  },
  ["token"],
  { revalidate: 600, tags: ["token"] }
);

async function getInstagramFeed(token: string): Promise<InstagramMedia[]> {
  try {
    const res = await fetch(
      `https://graph.instagram.com/v11.0/4421706784515534/media/?fields=media_url,permalink,media_type,caption&access_token=${token}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch Instagram feed");
    const feed = await res.json();

    return feed.data;
  } catch (error) {
    console.error("error:", error);
    return [];
  }
}

export default async function InstagramDisplay() {
  const token = await getRestTokenFromDB();

  if (!token) return null;

  const feed = await getInstagramFeed(token);

  const feedWithoutVideos = feed.filter(
    (media) => media.media_type !== "VIDEO"
  );

  if (!feedWithoutVideos.length) return null;

  return (
    <SectionContainer bgColor='bg-primary/10'>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <Link
          href='/our-work'
          className='uppercase text-sm md:text-xl text-gray-500 flex items-center'
        >
          VIEW THE GALLERY <ArrowRight className='inline-block size-4' />
        </Link>
        <a
          className='uppercase text-sm md:text-xl text-gray-500'
          href='https://www.instagram.com/italianobros.enterprise/'
        >
          Follow us on Instagram
        </a>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {feedWithoutVideos.slice(0, 18).map((media) => (
          <div
            key={media.id}
            className='flex flex-col items-center justify-center w-full'
          >
            <a href={media.permalink} target='_blank' className='w-full'>
              <div className='relative w-full h-96 col-span-1 overflow-hidden flex flex-1'>
                <Image
                  src={media.media_url}
                  alt={media.caption}
                  width={600}
                  height={600}
                  className='object-cover object-center'
                />
                <div className='absolute flex justify-center items-center p-10 bottom-0 left-0 right-0 w-full h-full hover:bg-gradient-to-t from-transparent to-primary/50 hover:backdrop-blur-sm transition-all opacity-0 hover:opacity-100'>
                  <div className='text-white'>{`${media.caption.substring(
                    0,
                    100
                  )}...`}</div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center mt-10'>
        <a
          href='https://www.instagram.com/italianobros.enterprise/'
          target='_blank'
          className='px-8 py-4 text-white text-lg font-bold font-sans uppercase bg-primary hover:text-white'
        >
          View on Instagram
        </a>
      </div>
    </SectionContainer>
  );
}
