import type { SVGProps } from "react";

/**
 * Hand-rolled 16px icons. Inline SVG keeps the admin bundle free of an icon
 * dependency and lets every glyph inherit currentColor.
 */
function Svg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M4 6l4 4 4-4" />
    </Svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M6 4l4 4-4 4" />
    </Svg>
  );
}

export function ArrowUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M8 13V3" />
      <path d="M4 7l4-4 4 4" />
    </Svg>
  );
}

export function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M8 3v10" />
      <path d="M4 9l4 4 4-4" />
    </Svg>
  );
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M13 8H3" />
      <path d="M7 4L3 8l4 4" />
    </Svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </Svg>
  );
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M8 3v10M3 8h10" />
    </Svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M3 8.5l3.5 3.5L13 5" />
    </Svg>
  );
}

export function AlertIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 5v3.5" />
      <path d="M8 11h.01" />
    </Svg>
  );
}

export function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <rect x="2.25" y="3.25" width="11.5" height="9.5" rx="1.5" />
      <circle cx="6" cy="6.5" r="1" />
      <path d="M3 11l3-2.5 2.5 2 2-1.5L13 11" />
    </Svg>
  );
}

export function FilmIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <rect x="2.25" y="3.25" width="11.5" height="9.5" rx="1.5" />
      <path d="M6.5 3.25v9.5M9.5 3.25v9.5M2.25 8h11.5" />
    </Svg>
  );
}

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <rect x="3.25" y="7" width="9.5" height="6" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
    </Svg>
  );
}

export function SpinnerIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <Svg className={`animate-spin ${className}`} {...props}>
      <circle cx="8" cy="8" r="6" opacity="0.25" />
      <path d="M14 8a6 6 0 00-6-6" />
    </Svg>
  );
}
