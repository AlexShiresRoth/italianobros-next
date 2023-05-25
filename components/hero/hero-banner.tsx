import Image from "next/image";
import React from "react";
import CtaButton from "../buttons/cta-button";
import RichTextRender from "../rendering/rich-text-render";
import { ComponentHeroBanner } from "@/types/page.type";

const HeroBanner = ({ hero }: { hero: ComponentHeroBanner }) => {
  return (
    <div className='w-full   flex gap-4 justify-center  items-center  bg-blue-700 py-14'>
      <div className='w-3/4  flex gap-4 justify-between items-center '>
        <div className='w-1/2 relative z-0 flex flex-col gap-6  h-full py-12 my-8'>
          <span className='h-[400px] w-[400px] rounded-full block absolute -z-10 top-0 -left-20 border-2 border-white/20'></span>
          <h1 className='lg:text-6xl  font-extrabold leading-relaxed  text-white  flex flex-col '>
            {hero.headline}
          </h1>
          <RichTextRender
            content={hero.bodyText}
            classNames='text-white/80 w-3/4'
          />
          <div>
            <CtaButton text={hero.ctaText ?? "Learn More"} slug={``} />
          </div>
        </div>
        <div className='relative'>
          <span className='w-[60px] h-[60px] rounded-full -top-10 -right-10 absolute z-20 rounded bg-blue-600 block skew-y-3 -translate-x-2 p-4'></span>
          <div className='relative lg:w-[400px] lg:h-[350px] xl:w-[550px] xl:h-[400px]'>
            <Image
              src={hero?.image?.url}
              alt={hero?.image?.title}
              className='object-cover object-center rounded  z-10 ring-2 ring-white'
              quality={75}
              priority
              sizes=''
              fill
            />
          </div>
          <span className='w-full h-full top-10 absolute rounded bg-yellow-300 block skew-y-3 -translate-x-2 p-4'></span>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
