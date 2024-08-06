export default function SectionContainer({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) {
  return (
    <section
      className={`${
        bgColor ? bgColor : ""
      } flex flex-col items-center justify-center w-full px-8 md:px-0 py-10 md:py-16`}
    >
      <div className='md:w-11/12'>{children}</div>
    </section>
  );
}
