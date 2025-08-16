import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Star, MapPin, Users, TrendingUp, Award, ChefHat } from 'lucide-react'
import apiService from '../services/api.js'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('pubblico')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data come fallback
  const mockRestaurants = {
    pubblico: [
      {
        id: 1,
        name: 'FERMENTO Care & Passion - Pizzeria e Pizza Gourmet Torino',
        address: 'Via della Sforzesca, 1, 10131 Torino TO, Italia',
        city: 'Torino',
        iosoai_score: 9.5,
        google_rating: 4.9,
        review_count: 1019,
        cuisine_type: 'Pizzeria',
        price_range: '€€',
        popular_dishes: [
          { name: 'Pizza Margherita', mentions: 18 },
          { name: 'Impasto Speciale', mentions: 9 },
          { name: 'Tiramisu', mentions: 6 }
        ]
      },
      {
        id: 2,
        name: 'A Casa di Pulcinella',
        address: 'Via Principe Tommaso, 15, 10125 Torino TO, Italia',
        city: 'Torino',
        iosoai_score: 9.3,
        google_rating: 4.7,
        review_count: 856,
        cuisine_type: 'Napoletana',
        price_range: '€€',
        popular_dishes: [
          { name: 'Pizza Napoletana', mentions: 15 },
          { name: 'Babà', mentions: 8 }
        ]
      },
      {
        id: 3,
        name: 'Master Sandwich',
        address: 'Via Garibaldi, 45, 10122 Torino TO, Italia',
        city: 'Torino',
        iosoai_score: 8.9,
        google_rating: 4.6,
        review_count: 623,
        cuisine_type: 'Fast Food Gourmet',
        price_range: '€',
        popular_dishes: [
          { name: 'Master Burger', mentions: 12 },
          { name: 'Panino Pulled Pork', mentions: 8 }
        ]
      }
    ],
    esperti: [
      {
        id: 1,
        name: 'FERMENTO Care & Passion - Pizzeria e Pizza Gourmet Torino',
        address: 'Via della Sforzesca, 1, 10131 Torino TO, Italia',
        city: 'Torino',
        expert_score: 9.2,
        expert_reviews: 3,
        cuisine_type: 'Pizzeria',
        price_range: '€€',
        top_blogger: 'Marco Rossi',
        blogger_credibility: 9
      },
      {
        id: 2,
        name: 'Osteria del Borgo',
        address: 'Via Po, 23, 10124 Torino TO, Italia',
        city: 'Torino',
        expert_score: 8.8,
        expert_reviews: 2,
        cuisine_type: 'Piemontese',
        price_range: '€€€',
        top_blogger: 'Giulia Bianchi',
        blogger_credibility: 8
      },
      {
        id: 3,
        name: 'Sushi Zen',
        address: 'Corso Vittorio Emanuele II, 78, 10121 Torino TO, Italia',
        city: 'Torino',
        expert_score: 8.5,
        expert_reviews: 1,
        cuisine_type: 'Giapponese',
        price_range: '€€€',
        top_blogger: 'Luca Verdi',
        blogger_credibility: 7
      }
    ]
  }

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Prova a chiamare l'API reale
        const response = await apiService.getRestaurantRankings(activeTab === 'pubblico' ? 'public' : 'expert')
        setRestaurants(response.restaurants || [])
      } catch (err) {
        console.warn('API non disponibile, uso dati mock:', err)
        // Fallback ai dati mock
        setRestaurants(mockRestaurants[activeTab])
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [activeTab])

  const ScoreCircle = ({ score, size = 'large' }) => {
    const circleClass = size === 'large' ? 'score-circle' : 'score-circle-small'
    return (
      <div className={circleClass}>
        {score}
      </div>
    )
  }

  const RestaurantCard = ({ restaurant, type }) => (
    <Card className="iosoai-card hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {restaurant.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{restaurant.address}</span>
            </div>
            <div className="flex items-center space-x-4 mb-3">
              <Badge variant="secondary">{restaurant.cuisine_type}</Badge>
              <span className="text-sm font-medium">{restaurant.price_range}</span>
            </div>
          </div>
          <div className="ml-4">
            <ScoreCircle 
              score={type === 'pubblico' ? restaurant.iosoai_score : restaurant.expert_score} 
            />
            <p className="text-xs text-center mt-1 text-gray-600">
              {type === 'pubblico' ? 'Punteggio IosoAI' : 'Punteggio Esperti'}
            </p>
          </div>
        </div>

        {type === 'pubblico' ? (
          <div>
            <div className="flex items-center mb-3">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{restaurant.google_rating}</span>
              <span className="text-gray-600 ml-2">({restaurant.review_count} recensioni)</span>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Piatti Popolari:</p>
              <div className="flex flex-wrap gap-2">
                {restaurant.popular_dishes?.map((dish, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {dish.name} ({dish.mentions})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-3">
              <Users className="h-4 w-4 text-purple-600 mr-1" />
              <span className="font-medium">{restaurant.expert_reviews} recensioni esperti</span>
            </div>
            <div className="flex items-center">
              <ChefHat className="h-4 w-4 text-purple-600 mr-1" />
              <span className="text-sm">Top Blogger: <strong>{restaurant.top_blogger}</strong></span>
              <Badge variant="secondary" className="ml-2 text-xs">
                Credibilità {restaurant.blogger_credibility}/10
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen iosoai-bg">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 iosoai-text">
            Monitoraggio settimanale intelligente delle recensioni
          </h1>
          <p className="text-xl md:text-2xl mb-8 iosoai-text max-w-3xl mx-auto">
            Scopri i nostri piani tariffari chiari e vantaggiosi, progettati per massimizzare 
            il valore del tuo investimento e potenziare la crescita del tuo ristorante.
          </p>
          <Button className="iosoai-button text-lg px-8 py-3 hover:bg-purple-700">
            Scopri come funziona
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="iosoai-card text-center p-6">
              <CardHeader>
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <CardTitle>Report settimanali personalizzati</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ricevi report dettagliati che evidenziano punti di forza e aspetti da migliorare per ottimizzare l'esperienza dei clienti.</p>
              </CardContent>
            </Card>

            <Card className="iosoai-card text-center p-6">
              <CardHeader>
                <Award className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <CardTitle>Analisi automatizzata multi-piattaforma</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Integra feedback da Google, TripAdvisor e TheFork per una visione completa e strategica delle recensioni online.</p>
              </CardContent>
            </Card>

            <Card className="iosoai-card text-center p-6">
              <CardHeader>
                <ChefHat className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <CardTitle>Strategie di miglioramento mirate</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Identifica con facilità le aree critiche e ricevi consigli pratici per elevare il livello del servizio offerto.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rankings Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 iosoai-text">
            Trasforma le recensioni in vantaggio competitivo
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 inline-flex">
              <Button
                variant={activeTab === 'pubblico' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('pubblico')}
                className={activeTab === 'pubblico' ? 'iosoai-button' : 'text-gray-600'}
              >
                Classifica Pubblico
              </Button>
              <Button
                variant={activeTab === 'esperti' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('esperti')}
                className={activeTab === 'esperti' ? 'iosoai-button' : 'text-gray-600'}
              >
                Classifica Esperti
              </Button>
            </div>
          </div>

          {/* Restaurant List */}
          <div className="grid gap-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Caricamento classifiche...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Errore nel caricamento dei dati</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                  className="border-purple-600 text-purple-600"
                >
                  Riprova
                </Button>
              </div>
            ) : restaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Nessun ristorante trovato per questa categoria</p>
              </div>
            ) : (
              restaurants.map((restaurant, index) => (
                <div key={restaurant.id} className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-purple-600 w-12 text-center">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <RestaurantCard restaurant={restaurant} type={activeTab} />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              Vedi tutte le classifiche
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 iosoai-text">
            Ottimizza le recensioni, potenzia il tuo ristorante
          </h2>
          <p className="text-xl mb-8 iosoai-text">
            iosolai.com analizza automaticamente le recensioni da Google, TripAdvisor e TheFork, 
            offrendo report chiari per migliorare il servizio e far crescere il tuo business.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span>✓</span>
              <span>Report settimanali facili da interpretare</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span>✓</span>
              <span>Analisi dettagliata dei punti di forza</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span>✓</span>
              <span>Identificazione rapida delle aree da migliorare</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span>✓</span>
              <span>Supporto per aumentare la soddisfazione del cliente</span>
            </div>
          </div>
          <div className="mt-12">
            <Button className="iosoai-button text-lg px-8 py-3 hover:bg-purple-700">
              Scopri come funziona
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

