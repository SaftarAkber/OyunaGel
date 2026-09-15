import { Player } from "@/lib/types";

export default function Avatar({
  player,
  className = "",
}: {
  player: Player;
  className?: string;
}) {
  const initials = player.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (player.avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={player.avatarUrl}
        alt={player.name}
        className={`h-8 w-8 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-indigo-800 text-xs font-semibold text-white ${className}`}
    >
      {initials}
    </div>
  );
}
