"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, MapPin, Newspaper, Music2, Home } from "lucide-react";

const links = [
  { href: "/", label: "Início", icon: Home },
  { href: "/agenda", label: "Agenda", icon: Calendar },
  { href: "/mapa", label: "Mapa", icon: MapPin },
  { href: "/locais", label: "Locais", icon: Music2 },
  { href: "/feed", label: "Feed", icon: Newspaper },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(10,10,10,0.97)",
        borderTop: "1px solid #2a2a2a",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {links.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.2rem",
              padding: "0.6rem 0",
              minHeight: "56px",
              textDecoration: "none",
              color: isActive ? "#c9a84c" : "#555",
              transition: "color 0.15s",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.5 : 1.8}
              style={{ flexShrink: 0 }}
            />
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: isActive ? 700 : 400,
                letterSpacing: "0.03em",
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
