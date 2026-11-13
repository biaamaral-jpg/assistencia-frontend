import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import PHome from './Pages/Phome/PHome'
import PLogin from './Pages/PLogin/PLogin'
import PDetalhesEquipamento from './Pages/PDetalhes/PDetalhesEquipamento/PDetalhesEquipamento'
import PDetalhesAgendamento from './Pages/PDetalhes/PDetalhesAgendamento/PDetalhesAgendamento'
import PDetalhesCliente from './Pages/PDetalhes/PDetalhesCliente/PDetalhesCliente'


import ListagemEquipamentos from './components/Listagens/ListagemEquipamento/ListagemEquipamento'
import ListagemAgendamentos from './components/Listagens/ListagemAgendamento/ListagemAgendamento'
import ListagemClientes from './components/Listagens/ListagemCliente/ListagemCliente'

import ProtectedRoute from './components/Rotas/ProtectedRoutes'

import PCadastroEquipamento from './Pages/PCadastro/PCadastroEquipamento/PCadastroEquipamento'
import PCadastroAgendamento from './Pages/PCadastro/PCadastroAgendamento/PCadastroAgendamento'
import PCadastroCliente from './Pages/PCadastro/PCadastroCliente/PCadastroCliente'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute element={<PHome />} />} />
        <Route path='/login' element={<PLogin />} />

        <Route path='/lista/agendamentos' element={<ProtectedRoute element={<ListagemAgendamentos />} />} />
        <Route path='/lista/clientes' element={<ProtectedRoute element={<ListagemClientes />} />} />
        <Route path='/lista/equipamentos' element={<ProtectedRoute element={<ListagemEquipamentos />} />} />
       

        <Route path='/detalhes/agendamento/:id_agendamento' element={<ProtectedRoute element={<PDetalhesAgendamento />} />} />
        <Route path='/detalhes/cliente/:id_cliente' element={<ProtectedRoute element={<PDetalhesCliente />} />} />
        <Route path='/detalhes/equipamento/:id_equipamento' element={<ProtectedRoute element={<PDetalhesEquipamento />} />} />

        <Route path='/cadastro/agendamento' element={<ProtectedRoute element={<PCadastroAgendamento />} />} />
        <Route path='/cadastro/cliente' element={<ProtectedRoute element={<PCadastroCliente />} />} />
        <Route path='/cadastro/equipamento' element={<ProtectedRoute element={<PCadastroEquipamento />} />} />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
