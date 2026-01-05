import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

function SvgIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-4 w-4"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function DashboardNavIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M3 13h8V3H3v10z" />
      <path d="M13 21h8V11h-8v10z" />
      <path d="M13 3h8v6h-8V3z" />
      <path d="M3 17h8v4H3v-4z" />
    </SvgIcon>
  );
}

export function ChecklistNavIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M9 6h12" />
      <path d="M9 12h12" />
      <path d="M9 18h12" />
      <path d="M3.5 6l1.5 1.5L7.5 5" />
      <path d="M3.5 12l1.5 1.5L7.5 11" />
      <path d="M3.5 18l1.5 1.5L7.5 17" />
    </SvgIcon>
  );
}

export function AccountNavIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
    </SvgIcon>
  );
}

export function SettingsNavIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 15.5a3.5 3.5 0 1 0-3.5-3.5 3.5 3.5 0 0 0 3.5 3.5z" />
      <path d="M19.4 15a7.8 7.8 0 0 0 .1-1l2-1.2-2-3.4-2.3.7a7.2 7.2 0 0 0-1.7-1l-.3-2.4H11l-.3 2.4a7.2 7.2 0 0 0-1.7 1l-2.3-.7-2 3.4L6.7 14a7.8 7.8 0 0 0 .1 1l-2 1.2 2 3.4 2.3-.7a7.2 7.2 0 0 0 1.7 1l.3 2.4h4.2l.3-2.4a7.2 7.2 0 0 0 1.7-1l2.3.7 2-3.4-2-1.2z" />
    </SvgIcon>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </SvgIcon>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </SvgIcon>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </SvgIcon>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M19 12H5" />
      <path d="M11 18l-6-6 6-6" />
    </SvgIcon>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M21 12a9 9 0 0 1-15 6" />
      <path d="M3 12a9 9 0 0 1 15-6" />
      <path d="M3 16v2h2" />
      <path d="M21 8V6h-2" />
    </SvgIcon>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </SvgIcon>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M20 6L9 17l-5-5" />
    </SvgIcon>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </SvgIcon>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 18a6 6 0 1 0-6-6 6 6 0 0 0 6 6z" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </SvgIcon>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z" />
    </SvgIcon>
  );
}
