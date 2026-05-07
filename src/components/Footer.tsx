import Link from "next/link";
import { Music2, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c9a84c]/40">
                <Music2 className="h-3.5 w-3.5 text-[#c9a84c]" />
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Jazz <span className="text-[#c9a84c]">BH</span>
              </span>
            </div>
            <p className="text-sm text-[#888] leading-relaxed">
              A agenda da cena jazzística de Belo Horizonte. Shows, artistas,
              locais e tudo que acontece na capital do jazz mineiro.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-4">
              Navegar
            </h4>
            <ul className="space-y-2 text-sm text-[#888]">
              {[
                ["Agenda", "/agenda"],
                ["Mapa de Locais", "/mapa"],
                ["Casas e Bares", "/locais"],
                ["Feed Cultural", "/feed"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#c9a84c] mb-4">
              Contribuir
            </h4>
            <ul className="space-y-2 text-sm text-[#888]">
              <li>
                <Link
                  href="/admin"
                  className="hover:text-[#c9a84c] transition-colors"
                >
                  Painel Admin
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#c9a84c] transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1e1e1e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555]">
          <span>© {new Date().getFullYear()} Portal Jazz BH. Feito com amor pela cena.</span>
          <span className="flex items-center gap-1">
            Feito com <Heart className="h-3 w-3 text-[#c9a84c]" /> em BH
          </span>
        </div>
      </div>
    </footer>
  );
}
