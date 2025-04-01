import { Eye, EyeOff } from 'lucide-react';

import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo({ isVisible, toggleVisibility }) {
  return (
    <Toggle onClick={toggleVisibility} aria-label="Toggle password" className=" absolute inset-y-8 right-2 flex items-center">
      {isVisible ? <Eye className="h-1 w-1" /> : <EyeOff className="h-1 w-1" />}
    </Toggle>
  )
}
