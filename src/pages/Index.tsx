import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Index() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate("/auth")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Button onClick={handleLogout}>
        Fazer Logout
      </Button>
    </div>
  )
}