import { Github, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex items-start justify-center md:justify-around  md:flex-row md:gap-12">
        {/* Left Section */}
        <div className="flex-1 md:flex-initial">
          <h2 className="text-xl font-bold mb-2">Work Manager</h2>
          <p className="text-sm text-gray-400">
            Manage your tasks efficiently and stay productive every day.
          </p>
        </div>

        {/* Right Section - Important Links */}
        <div className="flex-1 md:flex-initial ml-3 md:ml-0">
          <h3 className="text-lg font-semibold mb-4 md:mb-2 text-left">
            Important Links
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 items-start">
            <a
              href="https://shovon-chowdhury-portfolio.netlify.app/"
              target="_blank"
              className="hover:text-gray-300 text-sm flex items-center gap-2"
            >
              <Globe size={16} /> Portfolio
            </a>
            <a
              href="https://www.linkedin.com/in/shovon-das-chowdhury-431aa7250/"
              target="_blank"
              className="hover:text-gray-300 text-sm flex items-center gap-2"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="https://github.com/shovonchowdhury"
              target="_blank"
              className="hover:text-gray-300 text-sm flex items-center gap-2"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Shovon Das Chowdhury. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
