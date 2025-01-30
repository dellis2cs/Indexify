export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-earthyOffWhite font-sourGummy">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 xl:mt-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-earthyGreen sm:text-5xl md:text-6xl">
                <span className="block xl:inline">
                  Transform Your Study Notes
                </span>{" "}
                <span className="block text-earthyBrown xl:inline">
                  with AI
                </span>
              </h1>
              <p className="mt-3 text-base text-earthyBrown sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                Turn your PDF notes into smart, interactive flashcards. Study
                smarter, not harder.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  <a
                    href="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-earthyCream bg-earthyGreen hover:bg-earthyBrown md:py-4 md:text-lg md:px-10 transition duration-300"
                  >
                    Get Started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#features"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-earthyGreen bg-earthyCream hover:bg-earthyTaupe md:py-4 md:text-lg md:px-10 transition duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
