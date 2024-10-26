// LoadingScreen.js
const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img
          // src="https://cdn-icons-png.flaticon.com/128/11840/11840004.png"
          src="https://cdn-icons-png.flaticon.com/128/9547/9547223.png"
          alt="Loading..."
          className="w-24 h-24 mx-auto mb-4 animate-spin"
        />
        <h2 className="text-xl font-semibold">Loading, please wait...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
