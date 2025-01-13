import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { motion } from "framer-motion"

export function TransactionsList() {
  const { data: transactions } = useQuery({
    queryKey: ['point-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('point_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      return data
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Últimas Transações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions?.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.transaction_type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(transaction.created_at), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {transaction.points} pts
                  </span>
                  <span className="text-xs text-muted-foreground">
                    R$ {transaction.cash_value.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            {!transactions?.length && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma transação encontrada
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}