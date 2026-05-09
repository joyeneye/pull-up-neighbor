import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  DollarSign,
  Globe,
  Handshake,
  Heart,
  Home,
  Layers,
  Lightbulb,
  Megaphone,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  DollarSign,
  Globe,
  Handshake,
  Heart,
  Home,
  Layers,
  Lightbulb,
  Megaphone,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Vote,
};

interface IconProps {
  name: string | undefined | null;
  className?: string;
  size?: number;
  fallback?: LucideIcon;
}

export default function Icon({ name, className, size, fallback }: IconProps) {
  const Component = (name && ICONS[name]) || fallback || Layers;
  return <Component className={className} size={size} />;
}
