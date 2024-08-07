// TODO use instagram api to get the feed

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionContainer from "../containers/section-container";

async function getInstagramFeed(token: string) {
  try {
    const res = await fetch(
      `https://graph.instagram.com/v11.0/4421706784515534/media/?fields=media_url,permalink,media_type,caption&access_token=${token}`
    );
    // console.log("res.data", res.data)
    console.log("res", res.status);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error:", error);
  }
}
export default async function InstagramDisplay() {
  const feed = await getInstagramFeed(process.env.INSTAGRAM_TOKEN as string);
  console.log("feed", feed);
  return (
    <SectionContainer bgColor='bg-primary/10'>
      <div className='flex items-center justify-between'>
        <Link
          href='/our-work'
          className='uppercase text-xl text-gray-500 flex items-center'
        >
          VIEW THE GALLERY <ArrowRight className='inline-block' />
        </Link>
        <a
          className='uppercase text-xl text-gray-500'
          href='https://www.instagram.com/italianobros.enterprise/'
        >
          Follow us on Instagram
        </a>
      </div>
    </SectionContainer>
  );
}
