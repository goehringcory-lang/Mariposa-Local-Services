interface PhoneButtonProps {
  phone: string;
  size?: "md" | "lg";
}

export default function PhoneButton({ phone, size = "lg" }: PhoneButtonProps) {
  const formatted = formatPhone(phone);

  return (
    <a
      href={`tel:${phone.replace(/\D/g, "")}`}
      className={`inline-flex items-center justify-center gap-3 bg-success hover:bg-success-dark text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-xl ${
        size === "lg"
          ? "text-2xl px-8 py-5 min-h-[64px]"
          : "text-xl px-6 py-4 min-h-[48px]"
      }`}
    >
      <svg
        className={size === "lg" ? "w-8 h-8" : "w-6 h-6"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
      {formatted}
    </a>
  );
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === "1") {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}
