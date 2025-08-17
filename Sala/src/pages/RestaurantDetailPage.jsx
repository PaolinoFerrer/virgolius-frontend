import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Star, MapPin, ArrowLeft, Clock, Phone, Globe, Users, ChefHat } from 'lucide-react'
import apiService from '../services/api.js'

const RestaurantDetailPage = () => {
  const { slug } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data come fallback per sviluppo
  const mockRestaurant = {
    id: 1,
    name: 'FERMENTO Care & Passion - Pizzeria e Pizza Gourmet Torino',
    slug: 'fermento-care-passion-pizzeria-torino',
    address: 'Via della Sforzesca, 1, 10131 Torino TO, Italia',
    city: 'Torino',
    phone: '+39 011 123 4567',
    website: 'https://fermentotorino.it',
    iosoai_score: 9.5,
    google_rating: 4.9,
    review_count: 1019,
    cuisine_type: 'Pizzeria',
    price_range: '€€',
    opening_hours: 'Lun-Dom: 18:00-24:00',
    description: 'Pizzeria gourmet nel cuore di Torino, specializzata in impasti speciali e ingredienti di alta qualità. Un\'esperienza culinaria unica che unisce tradizione e innovazione.',
    popular_dishes: [
      { name: 'Pizza Margherita', mentions: 18, description: 'La classica con pomodoro San Marzano e mozzarella di bufala' },
      { name: 'Impasto Speciale', mentions: 9, description: 'Impasto con farine selezionate e lievitazione 48h' },
      { name: 'Tiramisu', mentions: 6, description: 'Tiramisu della casa con mascarpone artigianale' }
    ],
    specialties: ['Pizza Gourmet', 'Impasti Speciali', 'Ingredienti Biologici'],
    expert_score: 9.2,
    expert_reviews: 3,
    top_blogger: 'Marco Rossi',
    blogger_credibility: 9
  }

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Prova prima con slug, poi con ID come fallback
        let response
        try {
          response = await apiService.getRestaurantBySlug(slug)
        } catch (slugError) {
          // Fallback: prova con ID se slug non funziona
          response = await apiService.getRestaurant(slug)
        }
        setRestaurant(response.restaurant || response)
      } catch (err) {
        console.warn('API non disponibile, uso dati mock:', err)
        // Fallback ai dati mock se lo slug corrisponde
        if (slug === 'fermento-care-passion-pizzeria-torino' || 
            slug === 'fermento-care--passion---pizzeria-e-pizza-gourmet-torino' ||
            slug === '1') {
          setRestaurant(mockRestaurant)
        } else {
          setError('Ristorante non trovato')
        }
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchRestaurant()
    }
  }, [slug])

  const ScoreCircle = ({ score, label, size = 'large' }) => {
    const circleClass = size === 'large' ? 'score-circle' : 'score-circle-small'
    return (
      <div className="text-center">
        <div className={circleClass}>
          {score}
        </div>
        <p className="text-xs mt-1 text-gray-600">{label}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen iosoai-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento dettagli ristorante...</p>
        </div>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen iosoai-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold iosoai-text mb-4">Ristorante Non Trovato</h1>
          <p className="text-lg iosoai-text mb-8">
            Il ristorante che stai cercando non esiste o è stato rimosso.
          </p>
          <Link to="/">
            <Button className="iosoai-button">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen iosoai-bg">
      {/* Header con breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna alle classifiche
          </Link>
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header ristorante */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold iosoai-text mb-4">
            {restaurant.name}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{restaurant.address}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {restaurant.cuisine_type}
              </Badge>
              <span className="text-lg font-medium">{restaurant.price_range}</span>
            </div>
          </div>

          {/* Punteggi */}
          <div className="flex flex-wrap gap-8 mb-6">
            <ScoreCircle 
              score={restaurant.iosoai_score} 
              label="Punteggio IosoAI"
            />
            {restaurant.expert_score && (
              <ScoreCircle 
                score={restaurant.expert_score} 
                label="Punteggio Esperti"
              />
            )}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-yellow-500 mr-1" />
                <span className="text-2xl font-bold">{restaurant.google_rating}</span>
              </div>
              <p className="text-xs text-gray-600">
                {restaurant.review_count} recensioni Google
              </p>
            </div>
          </div>
        </div>

        {/* Grid contenuti */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonna principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrizione */}
            {restaurant.description && (
              <Card className="iosoai-card">
                <CardHeader>
                  <CardTitle>Descrizione</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {restaurant.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Piatti Popolari */}
            <Card className="iosoai-card">
              <CardHeader>
                <CardTitle>Piatti Popolari</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restaurant.popular_dishes?.map((dish, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{dish.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {dish.mentions} menzioni
                        </Badge>
                      </div>
                      {dish.description && (
                        <p className="text-gray-600 text-sm">{dish.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specialità */}
            {restaurant.specialties && (
              <Card className="iosoai-card">
                <CardHeader>
                  <CardTitle>Specialità</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar informazioni */}
          <div className="space-y-6">
            {/* Informazioni di contatto */}
            <Card className="iosoai-card">
              <CardHeader>
                <CardTitle>Informazioni</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {restaurant.opening_hours && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Orari</p>
                      <p className="text-sm text-gray-600">{restaurant.opening_hours}</p>
                    </div>
                  </div>
                )}
                
                {restaurant.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Telefono</p>
                      <a 
                        href={`tel:${restaurant.phone}`}
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        {restaurant.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {restaurant.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Sito Web</p>
                      <a 
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        Visita il sito
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recensioni Esperti */}
            {restaurant.expert_reviews > 0 && (
              <Card className="iosoai-card">
                <CardHeader>
                  <CardTitle>Recensioni Esperti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="font-medium">
                        {restaurant.expert_reviews} recensioni esperti
                      </span>
                    </div>
                    
                    {restaurant.top_blogger && (
                      <div className="flex items-center">
                        <ChefHat className="h-5 w-5 text-purple-600 mr-2" />
                        <div>
                          <p className="text-sm">Top Blogger:</p>
                          <p className="font-medium">{restaurant.top_blogger}</p>
                          {restaurant.blogger_credibility && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              Credibilità {restaurant.blogger_credibility}/10
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetailPage

