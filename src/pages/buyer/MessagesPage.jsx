import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Users, 
  Star,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile
} from 'lucide-react';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Aminata Diallo',
      type: 'vendor',
      lastMessage: 'Merci beaucoup pour votre soutien ! Grâce à vous, j\'ai pu acheter de nouveaux matériaux.',
      timestamp: '14:30',
      unread: 2,
      avatar: '/api/placeholder/40/40',
      online: true
    },
    {
      id: 2,
      name: 'Mentor Ubuntu - Fatou',
      type: 'mentor',
      lastMessage: 'Félicitations pour vos contributions ! Voulez-vous que nous discutions de nouvelles façons d\'aider ?',
      timestamp: '12:15',
      unread: 0,
      avatar: '/api/placeholder/40/40',
      online: false
    },
    {
      id: 3,
      name: 'Kofi Asante',
      type: 'vendor',
      lastMessage: 'Votre commande de tissu Wax est prête ! Quand souhaitez-vous la récupérer ?',
      timestamp: 'Hier',
      unread: 1,
      avatar: '/api/placeholder/40/40',
      online: true
    },
    {
      id: 4,
      name: 'Support UmoKet',
      type: 'support',
      lastMessage: 'Votre badge "Champion Ubuntu" a été débloqué ! 🎉',
      timestamp: 'Hier',
      unread: 0,
      avatar: '/api/placeholder/40/40',
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Aminata Diallo',
      content: 'Bonjour ! J\'ai vu que vous avez contribué à ma tirelire Ubuntu. Je vous remercie infiniment !',
      timestamp: '14:25',
      isOwn: false
    },
    {
      id: 2,
      sender: 'Vous',
      content: 'Bonjour Aminata ! C\'est avec plaisir. Comment allez-vous utiliser cette aide ?',
      timestamp: '14:27',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Aminata Diallo',
      content: 'Je vais acheter de nouveaux matériaux pour mes paniers. Cela va me permettre de diversifier mes créations et d\'augmenter ma production.',
      timestamp: '14:30',
      isOwn: false
    },
    {
      id: 4,
      sender: 'Aminata Diallo',
      content: 'Merci beaucoup pour votre soutien ! Grâce à vous, j\'ai pu acheter de nouveaux matériaux.',
      timestamp: '14:30',
      isOwn: false
    }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Fatou Sow',
      speciality: 'Entrepreneuriat Social',
      rating: 4.9,
      sessions: 156,
      avatar: '/api/placeholder/60/60',
      available: true
    },
    {
      id: 2,
      name: 'Mamadou Ba',
      speciality: 'Finance Solidaire',
      rating: 4.8,
      sessions: 203,
      avatar: '/api/placeholder/60/60',
      available: false
    },
    {
      id: 3,
      name: 'Aïcha Traoré',
      speciality: 'Impact Social',
      rating: 4.9,
      sessions: 89,
      avatar: '/api/placeholder/60/60',
      available: true
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logique d'envoi de message
      setNewMessage('');
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'vendor': return 'bg-orange-100 text-orange-800';
      case 'mentor': return 'bg-purple-100 text-purple-800';
      case 'support': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'vendor': return 'Vendeur';
      case 'mentor': return 'Mentor';
      case 'support': return 'Support';
      default: return 'Autre';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Communiquez avec les vendeurs et mentors de la communauté Ubuntu</p>
        </div>

        <Tabs defaultValue="conversations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
          </TabsList>

          {/* Conversations */}
          <TabsContent value="conversations">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Liste des conversations */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Conversations
                    </CardTitle>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher une conversation..."
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                          selectedConversation?.id === conversation.id ? 'bg-orange-50 border-orange-200' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            {conversation.online && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {conversation.name}
                              </p>
                              <div className="flex items-center space-x-1">
                                <Badge className={getTypeColor(conversation.type)} variant="secondary">
                                  {getTypeLabel(conversation.type)}
                                </Badge>
                                {conversation.unread > 0 && (
                                  <Badge className="bg-orange-500 text-white">
                                    {conversation.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 truncate mt-1">
                              {conversation.lastMessage}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {conversation.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Zone de conversation */}
              <Card className="lg:col-span-2">
                {selectedConversation ? (
                  <>
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            {selectedConversation.online && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{selectedConversation.name}</h3>
                            <p className="text-sm text-gray-500">
                              {selectedConversation.online ? 'En ligne' : 'Hors ligne'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col h-96">
                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.isOwn
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.isOwn ? 'text-orange-100' : 'text-gray-500'
                              }`}>
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Zone de saisie */}
                      <div className="border-t p-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Input
                            placeholder="Tapez votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button variant="ghost" size="sm">
                            <Smile className="h-4 w-4" />
                          </Button>
                          <Button onClick={handleSendMessage} className="bg-orange-500 hover:bg-orange-600">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Mentors */}
          <TabsContent value="mentors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="relative mx-auto mb-4">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
                        {mentor.available && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{mentor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{mentor.speciality}</p>
                      
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{mentor.rating}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {mentor.sessions} sessions
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-orange-500 hover:bg-orange-600"
                          disabled={!mentor.available}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {mentor.available ? 'Contacter' : 'Indisponible'}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Voir le profil
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MessagesPage;

