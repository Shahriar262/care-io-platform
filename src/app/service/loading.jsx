export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-xl animate-pulse">
            <div className="h-52 bg-gray-300 rounded-t-xl"></div>

            <div className="card-body space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>

              <div className="flex justify-between mt-4">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-12"></div>
              </div>

              <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
