export const ReviewSection = () => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">PARA REVISAR HOJE</h2>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#E8E8E8]/30">
            <tr>
              <th className="px-4 py-3 text-left font-medium">DATA</th>
              <th className="px-4 py-3 text-left font-medium">EDITAL</th>
              <th className="px-4 py-3 text-left font-medium">DISCIPLINA/CAPÍTULO</th>
              <th className="px-4 py-3 text-left font-medium">ASSUNTOS</th>
              <th className="px-4 py-3 text-left font-medium">HISTÓRICO DE REVISÕES</th>
              <th className="px-4 py-3 text-left font-medium">PÁG. LIDAS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3" colSpan={6}>
                Nenhuma revisão programada para hoje
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}