import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ban, CheckCircle } from "lucide-react"

export function UserManagement() {
  const [users] = useState([
    { id: 1, name: "João Silva", email: "joao@example.com", status: "active", profile: "concurseiro" },
    { id: 2, name: "Maria Santos", email: "maria@example.com", status: "inactive", profile: "vestibulando" },
  ])

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Perfil</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "default" : "destructive"}>
                  {user.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </TableCell>
              <TableCell>{user.profile}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {user.status === "active" ? (
                    <Button variant="destructive" size="sm">
                      <Ban className="h-4 w-4 mr-1" />
                      Bloquear
                    </Button>
                  ) : (
                    <Button variant="default" size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Ativar
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}