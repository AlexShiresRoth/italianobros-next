export default function PostTag({ tag }: { tag: string }) {
  return (
    <div className="py-1 px-2 md:px-4 md:py-1 bg-stone-100 rounded-full">
      <p className="text-xs text-stone-500">{tag}</p>
    </div>
  );
}
