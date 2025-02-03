import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, GraduationCap, School, User2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const UniversitarioPerfil = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState(user?.user_metadata?.full_name || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || "")
  const [curso, setCurso] = useState("engenharia")
  const [periodo, setPeriodo] = useState("1")
  const [universidade, setUniversidade] = useState("")

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          username,
          curso,
          periodo,
          universidade
        })
        .eq('id', user?.id)

      if (profileError) throw profileError

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao atualizar suas informações.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsLoading(true)
      const fileExt = file.name.split('.').pop()
      const filePath = `${user?.id}/avatar.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      })

      if (updateError) throw updateError

      setAvatarUrl(publicUrl)
      toast({
        title: "Foto atualizada",
        description: "Sua foto de perfil foi atualizada com sucesso.",
      })
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast({
        variant: "destructive",
        title: "Erro ao atualizar foto",
        description: "Ocorreu um erro ao atualizar sua foto de perfil.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro ao alterar senha",
        description: "As senhas não coincidem.",
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      })
      
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("Error updating password:", error)
      toast({
        variant: "destructive",
        title: "Erro ao alterar senha",
        description: "Ocorreu um erro ao alterar sua senha.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-6xl py-6">
      <h1 className="text-2xl font-bold mb-6">MINHA CONTA</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User2 className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <label htmlFor="avatar" className="cursor-pointer">
                      <div className="flex items-center space-x-2 text-[#F2CED0] hover:text-pink-400 transition-colors">
                        <Camera className="h-4 w-4" />
                        <span>Alterar foto</span>
                      </div>
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                        disabled={isLoading}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={user?.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome Completo</label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Curso</label>
                  <Select value={curso} onValueChange={setCurso}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engenharia">Engenharia</SelectItem>
                      <SelectItem value="medicina">Medicina</SelectItem>
                      <SelectItem value="direito">Direito</SelectItem>
                      <SelectItem value="administracao">Administração</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Período</label>
                  <Select value={periodo} onValueChange={setPeriodo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu período" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(12)].map((_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {i + 1}º Período
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Universidade</label>
                  <Input
                    value={universidade}
                    onChange={(e) => setUniversidade(e.target.value)}
                    placeholder="Ex: USP, UFRJ, etc"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-[#F2CED0] hover:bg-pink-300 text-black"
                >
                  Atualizar Informações
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Alterar Senha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Senha Atual</label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nova Senha</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirmação Nova Senha</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-[#F2CED0] hover:bg-pink-300 text-black"
                >
                  Alterar Senha
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Estatísticas Acadêmicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="semestre" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="semestre">Este Semestre</TabsTrigger>
                  <TabsTrigger value="total">Total</TabsTrigger>
                </TabsList>
                <TabsContent value="semestre">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm font-medium">Média Geral</p>
                      <p className="text-2xl font-bold">8.5</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm font-medium">Disciplinas Cursando</p>
                      <p className="text-2xl font-bold">6</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm font-medium">Horas Estudadas</p>
                      <p className="text-2xl font-bold">120h</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm font-medium">Trabalhos Entregues</p>
                      <p className="text-2xl font-bold">15/18</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="total">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm font-medium">CR Acumulado</p>
                      <p className="text-2xl font-bold">8.2</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm font-medium">Disciplinas Concluídas</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm font-medium">Total de Horas</p>
                      <p className="text-2xl font-bold">1840h</p>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-lg">
                      <p className="text-sm font-medium">Progresso do Curso</p>
                      <p className="text-2xl font-bold">45%</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UniversitarioPerfil