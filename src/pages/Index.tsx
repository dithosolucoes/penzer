const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#E8E8E8]/10">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-black to-[#F2CED0] bg-clip-text text-transparent">
          Bem-vindo ao Penzer
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Sua plataforma personalizada para organização e otimização dos estudos
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
            <h2 className="text-xl font-semibold mb-2">Organize seus Estudos</h2>
            <p className="text-gray-600">Gerencie seu tempo e conteúdo de forma eficiente</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border hover:border-[#F2CED0] transition-colors">
            <h2 className="text-xl font-semibold mb-2">Acompanhe seu Progresso</h2>
            <p className="text-gray-600">Visualize seu desenvolvimento ao longo do tempo</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index