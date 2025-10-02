export default function QuestionDisplay({ text }: { text: string }) {
  return (
    <div className="my-12 text-center">
      <div className="text-4xl font-serif leading-relaxed text-gray-900 px-4">
        &quot;{text}&quot;
      </div>
    </div>
  );
}
