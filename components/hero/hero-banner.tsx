import { fetchGraphQL } from "@/contentful/api";
import { heroQuery } from "@/contentful/gql-queries/components/hero/hero.query";
import { HeroBannerResponseData, UnknownComponent } from "@/types/component";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MoveDown } from "lucide-react";
import Image from "next/image";
import CtaButton, { ExternalCTAButton } from "../buttons/cta-button";
import SectionContainer from "../containers/section-container";
import AnimatedText from "./animated-text";
import HeroGallery from "./hero-gallery";

async function getComponent(id: string) {
  try {
    const res = await fetchGraphQL<HeroBannerResponseData>(heroQuery(id), 60, [
      "componentHeroBanner",
    ]);

    return res.data.componentHeroBanner;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
}

// TODO animate text on enter
const HeroBanner = async (props: UnknownComponent) => {
  const hero = await getComponent(props.sys.id);

  if (!hero) return null;

  return (
    <div className='relative w-full flex justify-center'>
      {hero.imagesCollection.items.length > 0 && (
        <div className='h-[85vh]'>
          <HeroGallery images={hero.imagesCollection.items} />
        </div>
      )}
      {hero.imagesCollection.items.length === 0 && hero.image && (
        <Image
          src={hero.image.url}
          alt={hero.image.title}
          fill
          className='object-center object-cover h-[85vh] w-full absolute top-0 left-0 z-0 rounded opacity-70'
        />
      )}
      <SectionContainer>
        <div className='relative flex w-full'>
          <div className='flex flex-col items-center justify-between mt-36 md:mt-24 w-full gap-4 z-10'>
            {hero.headline && (
              <AnimatedText>
                <h1 className='font-light leading-relaxed'>{hero.headline}</h1>
              </AnimatedText>
            )}
            {hero.bodyText && (
              <AnimatedText speed={1.2}>
                <div className='text-center'>
                  {documentToReactComponents(hero.bodyText.json)}
                </div>
              </AnimatedText>
            )}
            <div className='flex gap-4 items-center mt-10'>
              {hero.externalLink && (
                <AnimatedText speed={1.4}>
                  <ExternalCTAButton
                    text={hero.ctaText}
                    url={hero.externalLink}
                  />
                </AnimatedText>
              )}
              {hero.targetPage && (
                <AnimatedText speed={1.4}>
                  <CtaButton
                    text={hero.ctaText}
                    slug={hero.targetPage.slug}
                    altButton
                  />
                </AnimatedText>
              )}
            </div>
            <AnimatedText speed={1.6}>
              <div className='flex flex-col items-center mt-20'>
                <p className='text-sm italic text-white/90'>Scroll</p>
                <MoveDown color='white' size={12} />
              </div>
            </AnimatedText>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default HeroBanner;
