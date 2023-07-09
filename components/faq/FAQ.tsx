import { fetchGraphQL } from "@/contentful/api";
import { faqQuery } from "@/contentful/gql-queries/components/faq";
import { UnknownComponent } from "@/types/component";
import { Faq } from "@/types/faq/faq.type";
import React from "react";
import ThreeQuarterContainer from "../containers/three-quarter-container";
import FaqItem from "./faq-item";

async function getComponent(id: string): Promise<Faq> {
  const res = await fetchGraphQL(faqQuery(id));

  if (res.errors) console.error("ERROR RETRIEVING FAQ COMPONENT", res.errors);

  if (!res.data) throw new Error("ERROR RETRIEVING FAQ COMPONENT");

  return res.data.faq;
}

const FAQ = async (data: UnknownComponent) => {
  const faqData = await getComponent(data.sys.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.faQsCollection.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <ThreeQuarterContainer containerClassNames='my-10 flex-col gap-4'>
      <h2 className="self-start z-10 relative text-4xl font-bold text-blue-500 before:block before:bg-yellow-200 before:content-[' '] before:w-full before:h-2 before:absolute before:-z-10 before:bottom-1 ">
        FAQ
      </h2>
      <div>
        {faqData.faQsCollection.items.map((faq) => (
          <FaqItem key={faq.question} {...faq} />
        ))}
      </div>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
    </ThreeQuarterContainer>
  );
};

export default FAQ;
