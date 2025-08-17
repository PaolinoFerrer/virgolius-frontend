import { Button } from '@/components/ui/button.jsx'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen iosoai-bg flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold iosoai-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold iosoai-text mb-6">Pagina Non Trovata</h2>
        <p className="text-lg iosoai-text mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link to="/">
          <Button className="iosoai-button">
            Torna alla Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage

