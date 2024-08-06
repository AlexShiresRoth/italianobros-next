export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col items-center justify-center w-full md:w-11/12  px-8 md:px-0 py-10 md:py-16'>
      {children}
    </section>
  );
}
