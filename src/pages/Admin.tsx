import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/UserManagement"
import { Statistics } from "@/components/admin/Statistics"

export default function Admin() {
  const { user } = useAuth()
  
  // Verificar se o usuário é admin (mock por enquanto)
  const isAdmin = user?.email === "admin@example.com"

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Área Administrativa</h1>
      
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <Statistics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}