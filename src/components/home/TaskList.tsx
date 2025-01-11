import { BookOpen } from "lucide-react"

export const TaskList = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">A FAZER HOJE</h2>
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8E8E8] text-sm font-medium">
              1
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">MICROBIOLOGIA MÉDICA</span>
                </div>
                <span className="text-xs text-gray-500">VER ONDE PAREI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}