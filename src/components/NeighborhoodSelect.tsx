"use client";

interface Props {
  neighborhoods: string[];
  current?: string;
  buildHref: (neighborhood: string | undefined) => string;
}

export default function NeighborhoodSelect({ neighborhoods, current, buildHref }: Props) {
  return (
    <select
      defaultValue={current ?? ""}
      onChange={(e) => {
        const v = e.target.value;
        window.location.href = buildHref(v || undefined);
      }}
      style={{
        padding: "0.35rem 0.75rem",
        borderRadius: "6px",
        fontSize: "0.78rem",
        background: "#1a1a1a",
        color: current ? "#c9a84c" : "#666",
        border: `1px solid ${current ? "rgba(201,168,76,0.3)" : "#2a2a2a"}`,
        cursor: "pointer",
        outline: "none",
      }}
    >
      <option value="">Todos os bairros</option>
      {neighborhoods.map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  );
}
