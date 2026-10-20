
import { Employees } from './components/features/employees/Employees'
import { Organization } from './components/features/organization/Organization'
import { Footer } from './components/layout/footer/Footer'
import { Header } from './components/layout/header/Header'

function App() {
  return (
    <>
      <Header />
      <Employees />
      <Organization />
      <Footer />
    </>
  )
}

export default App
