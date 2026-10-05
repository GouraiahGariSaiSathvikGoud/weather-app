function Skeleton() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <div className="skeleton h-96" />
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-24" />
        ))}
      </div>
      <div className="skeleton h-64" />
    </div>
  );
}

export default Skeleton;
