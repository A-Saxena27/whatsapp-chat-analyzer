export default function AnimatedBackground() {
  return (
    <>
      {/* Green Blob */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-green-500/20 blur-3xl" />

      {/* Purple Blob */}
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Pink Blob */}
      <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
    </>
  );
}
