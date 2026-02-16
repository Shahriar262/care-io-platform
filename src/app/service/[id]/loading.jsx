export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 animate-pulse">
      <div className="w-full h-96 bg-gray-300 rounded-xl"></div>

      <div className="mt-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>

      <div className="mt-6 space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 rounded w-2/3"></div>
        ))}
      </div>

      <div className="h-10 bg-gray-300 rounded w-40 mt-6"></div>
    </div>
  );
}
