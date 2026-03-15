export default function FloatingGlow() {
  return (
    <>
      <div className="absolute top-20 left-20 w-72 h-72 
                      bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 
                      bg-green-500/30 rounded-full blur-[120px]" />
    </>
  );
}