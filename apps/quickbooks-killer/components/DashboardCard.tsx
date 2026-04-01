interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
  variant?: "default" | "success" | "danger" | "warning";
}

const variantStyles = {
  default: "bg-white border-gray-200",
  success: "bg-green-50 border-green-200",
  danger: "bg-red-50 border-red-200",
  warning: "bg-amber-50 border-amber-200",
};

const valueStyles = {
  default: "text-gray-900",
  success: "text-green-700",
  danger: "text-red-700",
  warning: "text-amber-700",
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  variant = "default",
}: DashboardCardProps) {
  return (
    <div
      className={`rounded-xl border p-6 shadow-sm ${variantStyles[variant]}`}
    >
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </p>
      <p className={`text-3xl font-bold mt-2 ${valueStyles[variant]}`}>
        {value}
      </p>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
