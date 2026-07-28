import Link from "next/link";

interface BoardCardProps {
  id: string;
  name: string;
}

export default function BoardCard({ id, name }: BoardCardProps) {
  return (
    <Link
      href={`/boards/${encodeURIComponent(id)}`}
      className="block bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow min-h-[120px]"
    >
      <h3 className="text-lg font-bold">{name}</h3>
    </Link>
  );
}
