import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { 
  Image, 
  Video, 
  FileText, 
  Send, 
  X, 
  Upload,
  AlertCircle,
  Crown,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useSubscription } from '../hooks/useSubscription.jsx';
import { socialUtils } from '../data/socialData.js';

const CreatePost = ({ onPostCreated, onClose }) => {
  const { user } = useAuth();
  const { hasFeature, requestUpgrade } = useSubscription();
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaType, setMediaType] = useState('text');
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // Obtenir les limites de contenu pour le plan de l'utilisateur
  const contentLimits = socialUtils.getContentLimits(user?.subscription || 'standard');

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    if (newContent.length <= contentLimits.textLimit) {
      setContent(newContent);
      setError('');
    } else {
      setError(`Limite de ${contentLimits.textLimit} caractères atteinte`);
    }
  };

  const handleMediaUpload = (type) => {
    // Vérifier les permissions selon le plan
    switch (type) {
      case 'image':
        if (!contentLimits.canUploadImages) {
          requestUpgrade('upload_images', 'Téléchargement d\'images');
          return;
        }
        fileInputRef.current?.click();
        break;
      case 'video':
        if (!contentLimits.canUploadVideos) {
          requestUpgrade('upload_videos', 'Téléchargement de vidéos');
          return;
        }
        videoInputRef.current?.click();
        break;
      case 'pdf':
        if (!contentLimits.canUploadPDFs) {
          requestUpgrade('upload_pdfs', 'Téléchargement de PDF');
          return;
        }
        pdfInputRef.current?.click();
        break;
    }
  };

  const handleFileSelect = (e, type) => {
    const files = Array.from(e.target.files);
    
    if (type === 'image' && files.length > contentLimits.maxImages) {
      setError(`Vous ne pouvez télécharger que ${contentLimits.maxImages} image(s) maximum`);
      return;
    }

    if (type === 'video') {
      // Vérifier la durée de la vidéo (simulation)
      const file = files[0];
      if (file && file.size > 50 * 1024 * 1024) { // 50MB comme limite approximative pour 1 minute
        setError('La vidéo ne doit pas dépasser 1 minute');
        return;
      }
    }

    if (type === 'pdf') {
      const file = files[0];
      if (file && file.size > contentLimits.maxPDFSize * 1024 * 1024) {
        setError(`Le PDF ne doit pas dépasser ${contentLimits.maxPDFSize}MB`);
        return;
      }
    }

    setMediaFiles(files);
    setMediaType(type);
    setError('');
  };

  const removeMediaFile = (index) => {
    const newFiles = mediaFiles.filter((_, i) => i !== index);
    setMediaFiles(newFiles);
    if (newFiles.length === 0) {
      setMediaType('text');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && mediaFiles.length === 0) {
      setError('Veuillez ajouter du contenu ou des médias');
      return;
    }

    setIsPosting(true);
    setError('');

    try {
      // Simuler la création du post
      const newPost = {
        id: Date.now(),
        userId: user.id,
        userType: user.type,
        userName: user.name,
        userAvatar: user.avatar || '/api/placeholder/40/40',
        userPlan: user.subscription || 'standard',
        content: content.trim(),
        mediaType: mediaType,
        mediaUrls: mediaFiles.map(file => URL.createObjectURL(file)),
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        reposts: 0,
        isLiked: false,
        isReposted: false
      };

      // Simuler un délai d'upload
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (onPostCreated) {
        onPostCreated(newPost);
      }

      // Réinitialiser le formulaire
      setContent('');
      setMediaFiles([]);
      setMediaType('text');
      
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError('Erreur lors de la publication. Veuillez réessayer.');
    } finally {
      setIsPosting(false);
    }
  };

  const renderMediaPreview = () => {
    if (mediaFiles.length === 0) return null;

    return (
      <div className="mt-4 space-y-2">
        {mediaFiles.map((file, index) => (
          <div key={index} className="relative">
            {mediaType === 'image' && (
              <div className="relative">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Aperçu" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeMediaFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {mediaType === 'video' && (
              <div className="relative bg-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Video className="w-8 h-8 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => removeMediaFile(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            
            {mediaType === 'pdf' && (
              <div className="relative bg-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-red-500" />
                  <div className="flex-1">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => removeMediaFile(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderMediaButton = (type, icon, label, isAllowed) => (
    <button
      type="button"
      onClick={() => handleMediaUpload(type)}
      disabled={isPosting}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
        isAllowed 
          ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' 
          : 'text-gray-400 cursor-not-allowed'
      }`}
      title={isAllowed ? `Ajouter ${label}` : `${label} - Upgrade requis`}
    >
      {icon}
      {!isAllowed && <Lock className="w-3 h-3" />}
    </button>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <span>Créer une publication</span>
          {user?.subscription !== 'standard' && (
            <Crown className="w-5 h-5 text-yellow-500" />
          )}
        </CardTitle>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Zone de texte */}
          <div>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Quoi de neuf ?"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={4}
              disabled={isPosting}
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${
                content.length > contentLimits.textLimit * 0.9 
                  ? 'text-red-500' 
                  : 'text-gray-500'
              }`}>
                {content.length}/{contentLimits.textLimit} caractères
              </span>
              
              {user?.subscription === 'standard' && (
                <span className="text-xs text-gray-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Plan gratuit
                </span>
              )}
            </div>
          </div>

          {/* Aperçu des médias */}
          {renderMediaPreview()}

          {/* Erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Barre d'outils média */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-1">
              {renderMediaButton(
                'image', 
                <Image className="w-5 h-5" />, 
                'une image',
                contentLimits.canUploadImages
              )}
              
              {renderMediaButton(
                'video', 
                <Video className="w-5 h-5" />, 
                'une vidéo',
                contentLimits.canUploadVideos
              )}
              
              {renderMediaButton(
                'pdf', 
                <FileText className="w-5 h-5" />, 
                'un PDF',
                contentLimits.canUploadPDFs
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isPosting || (!content.trim() && mediaFiles.length === 0)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isPosting ? (
                <>
                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                  Publication...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Publier
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Inputs cachés pour les fichiers */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e, 'image')}
          className="hidden"
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={(e) => handleFileSelect(e, 'video')}
          className="hidden"
        />
        <input
          ref={pdfInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileSelect(e, 'pdf')}
          className="hidden"
        />

        {/* Informations sur les limites du plan */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Votre plan : {user?.subscription || 'Standard'} 
            {user?.subscription !== 'standard' && <Crown className="w-4 h-4 inline ml-1 text-yellow-500" />}
          </h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• Texte : {contentLimits.textLimit} caractères max</p>
            {contentLimits.canUploadImages && (
              <p>• Images : {contentLimits.maxImages} max</p>
            )}
            {contentLimits.canUploadVideos && (
              <p>• Vidéos : {contentLimits.maxVideoLength}s max</p>
            )}
            {contentLimits.canUploadPDFs && (
              <p>• PDF : {contentLimits.maxPDFSize}MB max</p>
            )}
            {user?.subscription === 'standard' && (
              <p className="text-orange-600">• Upgrade pour plus de fonctionnalités</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;

