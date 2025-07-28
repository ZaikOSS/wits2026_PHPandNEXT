import {
  Calendar,
  MapPin,
  Users,
  Award,
  Camera,
  FileText,
  Mail,
  Phone,
  Clock,
  Coffee,
  Utensils,
  CreditCard,
  Send,
  Plane,
  Hotel,
} from "lucide-react"

const iconMap = {
  Calendar,
  MapPin,
  Users,
  Award,
  Camera,
  FileText,
  Mail,
  Phone,
  Clock,
  Coffee,
  Utensils,
  CreditCard,
  Send,
  Plane,
  Hotel,
}

interface IconProps {
  name: string
  className?: string
}

export function Icon({ name, className = "w-4 h-4" }: IconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap]

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={className} />
}
