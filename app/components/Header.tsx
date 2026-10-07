"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LckrLogo from "@/public/lckr-logo.png";

export default function Header() {
  const pathname = usePathname();
  
  if (pathname === "/login") {
    return null;
  }
  return (
    <header className="border-b border-[#23262c] bg-[#07080a] text-white">
      <div className="mx-auto grid h-[68px] w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src={LckrLogo} alt="" className="h-14 w-auto"  />
          <span className="text-[15px] font-semibold">Gestão LCKR</span>
        </Link>

        <nav>
          <ul className="flex gap-8 text-sm font-medium">
            <li>
              <Link
                href="/"
                className={`relative transition-colors ${
                  pathname === "/" ? "text-[#90C156]" : "text-white/70 hover:text-white"
                }`}
              >
                Início
                {pathname === "/" && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[#90C156]" />
                )}
              </Link>
            </li>

            <li>
              <Link
                href="/coaches"
                className={`relative transition-colors ${
                  pathname.startsWith("/coaches") ? "text-[#90C156]" : "text-white/70 hover:text-white"
                }`}
              >
                Professores
                {pathname.startsWith("/coaches") && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[#90C156]" />
                )}
              </Link>
            </li>

            <li>
              <Link
                href="/horas"
                className={`relative transition-colors ${
                  pathname.startsWith("/horas") ? "text-[#90C156]" : "text-white/70 hover:text-white"
                }`}
              >
                Horas
                {pathname.startsWith("/horas") && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[#90C156]" />
                )}
              </Link>
            </li>

            <li>
              <Link
                href="/folha"
                className={`relative transition-colors ${
                  pathname.startsWith("/folha") ? "text-[#90C156]" : "text-white/70 hover:text-white"
                }`}
              >
                Folha
                {pathname.startsWith("/folha") && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[#90C156]" />
                )}
              </Link>
            </li>
          </ul>
        </nav>

        <div />
      </div>
    </header>
  );
}