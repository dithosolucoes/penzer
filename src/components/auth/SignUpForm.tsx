import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profileType, setProfileType] = useState("concurseiro")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
      })
      return
    }

    setIsLoading(true)

    try {
      await signUp(email, password, { profile_type: profileType })
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à Penzer.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Verifique suas informações e tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base">Selecione seu perfil</Label>
        <RadioGroup
          value={profileType}
          onValueChange={setProfileType}
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="concurseiro" id="concurseiro" />
            <Label htmlFor="concurseiro">Concurseiro</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vestibulando" id="vestibulando" />
            <Label htmlFor="vestibulando">Vestibulando</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="universitario" id="universitario" />
            <Label htmlFor="universitario">Universitário</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Cadastrando..." : "Criar conta"}
      </Button>
    </form>
  )
}