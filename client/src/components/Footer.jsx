export default function Footer() {
  return (
    <footer className="bg-earthyBrown font-sourGummy">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="#"
            className="text-earthyCream hover:text-earthyOffWhite transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-earthyCream hover:text-earthyOffWhite transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-earthyCream hover:text-earthyOffWhite transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-earthyCream">
            &copy; {new Date().getFullYear()} Indexify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
