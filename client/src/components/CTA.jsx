export default function CTA() {
  return (
    <div className="bg-earthyGreen font-sourGummy">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-earthyCream sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block text-earthyTaupe">
            Join thousands of successful students today.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-earthyGreen bg-earthyCream hover:bg-earthyTaupe transition duration-300"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-earthyCream bg-earthyBrown hover:bg-earthyTaupe transition duration-300"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
