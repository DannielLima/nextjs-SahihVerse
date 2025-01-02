const Loading = () => {
    const arabicText = "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ";
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
        <div className="text-black text-4xl font-bold animate-fadeInRotate">
          <div className="flex justify-center">
            {arabicText.split("").map((char, index) => (
              <span
                key={index}
                className="text-3xl md:text-5xl lg:text-6xl animate-fadeInMove"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  