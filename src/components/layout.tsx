import type { PropsWithChildren } from "react";
import { Header } from "./header";
import { FaGithub, FaLinkedin, FaDiscord, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className=" bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <p className="text-gray-700 dark:text-gray-300 text-sm ">&copy; {new Date().getFullYear()} <span className="font-semibold">Camagwinii</span>. All rights reserved.</p>
        
       <div className="flex justify-center gap-6 mt-6 text-gray-700 dark:text-gray-300 text-xl">
          <a href="https://github.com/Camagwinii" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-125 hover:text-gray-900">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/asithandile-fini-96978031b" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-125 hover:text-blue-600">
            <FaLinkedin />
          </a>
          <a href="https://wa.me/+27697847058" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-125 hover:text-green-600">
            <FaWhatsapp />
          </a>
          <a href="https://discord.com/users/1362429186492465435" target="_blank" rel="noopener noreferrer " className="transition transform hover:scale-125 hover:text-indigo-600">
            <FaDiscord />
          </a>
          <a href="mailto:asithandilefini70@gmail.com" target="_blank" rel="noopener noreferrer" className="transition transform hover:scale-125 hover:text-red-600">
            <FaEnvelope />
          </a>
        </div>
        </div>
      </footer>
    </div>
  );
}
