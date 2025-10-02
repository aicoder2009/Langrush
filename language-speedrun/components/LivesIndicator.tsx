export default function LivesIndicator({ lives }: { lives: number }) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: lives }).map((_, i) => (
        <span key={i} className="text-2xl">❤️</span>
      ))}
      {Array.from({ length: 3 - lives }).map((_, i) => (
        <span key={i} className="text-2xl opacity-30">💔</span>
      ))}
    </div>
  );
}
