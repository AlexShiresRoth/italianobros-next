import Link from "next/link";

type Props = {
  text: string;
  slug?: string;
  url?: string;
  altButton?: boolean;
};

const LinkClassNames =
  "px-4 py-2 rounded border border-black hover:bg-black hover:text-white transition-colors dark:border-white dark:hover:bg-white dark:text-white dark:hover:text-black";
const altLinkClassNames =
  "px-4 py-4 border-2 uppercase font-sans font-semibold border-primary bg-transparent text-white hover:bg-primary hover:text-white dark:bg-transparent dark:text-white transition-colors dark:hover:bg-primary ";

const CtaButton = ({ text, slug, altButton = false }: Props) => {
  return (
    <Link
      href={slug ?? "/"}
      className={altButton ? altLinkClassNames : LinkClassNames}
    >
      {text}
    </Link>
  );
};

export const ExternalCTAButton = ({ text, url, altButton = false }: Props) => {
  return (
    <a href={url} className={altButton ? altLinkClassNames : LinkClassNames}>
      {text}
      <i className='ri-external-link-line'></i>
    </a>
  );
};

export default CtaButton;
