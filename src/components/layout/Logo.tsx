import { BookOpen } from "lucide-react"

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="p-1 bg-[#F2CED0] rounded">
        <BookOpen className="w-6 h-6 text-black" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-black to-[#F2CED0] bg-clip-text text-transparent">
        Penzer
      </span>
    </div>
  )
}