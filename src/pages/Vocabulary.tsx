import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore, useProgressStore } from '../store';
import { Card, Button } from '../components/common';
import { Header, Footer } from '../components/layout';
import { englishVocabulary, japaneseVocabulary, koreanVocabulary } from '../data';
import { Volume2, RotateCcw, Check, X, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import type { VocabularyWord } from '../types';

export const Vocabulary: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, addXP } = useAuthStore();
  const { updateVocabulary, getProgress } = useProgressStore();
  
  const [language, setLanguage] = useState('en');
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<Set<string>>(new Set());
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const lang = searchParams.get('language') || 'en';
    setLanguage(lang);

    let vocabList: VocabularyWord[] = [];
    switch (lang) {
      case 'en':
        vocabList = englishVocabulary;
        break;
      case 'ja':
        vocabList = japaneseVocabulary;
        break;
      case 'ko':
        vocabList = koreanVocabulary;
        break;
    }
    setWords(vocabList);
  }, [user, navigate, searchParams]);

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = language === 'en' ? 'en-US' : language === 'ja' ? 'ja-JP' : 'ko-KR';
    speechSynthesis.speak(utterance);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    const newKnown = new Set(knownWords);
    newKnown.add(words[currentIndex].id);
    setKnownWords(newKnown);
    
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setReviewMode(true);
    }

    updateVocabulary(language, 1);
    addXP(5);
  };

  const handleDontKnow = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setWords(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownWords(new Set());
    setReviewMode(false);
  };

  const currentWord = words[currentIndex];

  const languageColors: Record<string, string> = {
    en: 'from-blue-500 to-blue-600',
    ja: 'from-pink-500 to-red-500',
    ko: 'from-purple-500 to-violet-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">单词记忆</h1>
            <p className="text-gray-600">
              共 {words.length} 个词汇 · 已掌握 {knownWords.size} 个
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={shuffleCards}>
              <Shuffle className="w-4 h-4 mr-2" />
              随机排序
            </Button>
            <Button variant="outline" size="sm" onClick={resetCards}>
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>学习进度</span>
            <span>{currentIndex + 1} / {words.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${languageColors[language]} h-2 rounded-full transition-all`}
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            />
          </div>
        </div>

        {currentWord && (
          <div className="mb-8">
            <div
              className="relative h-80 cursor-pointer perspective-1000"
              onClick={handleFlip}
            >
              <div
                className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <Card className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white backface-hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentWord.word);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Volume2 className="w-6 h-6 text-gray-600" />
                  </button>

                  <div className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${languageColors[language]} text-white mb-4`}>
                    {language === 'en' ? 'English' : language === 'ja' ? '日本語' : '한국어'}
                  </div>

                  <div className="text-5xl font-bold text-gray-900 mb-4 text-center">
                    {currentWord.word}
                  </div>

                  <div className="text-lg text-gray-500 mb-8">
                    {currentWord.pronunciation}
                  </div>

                  <div className="text-sm text-gray-400">点击卡片查看释义</div>
                </Card>

                <Card className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-gray-50 backface-hidden"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="text-3xl font-bold text-gray-900 mb-4 text-center">
                    {currentWord.meaning}
                  </div>

                  <div className="w-full max-w-md p-4 bg-blue-50 rounded-xl mb-4">
                    <div className="text-sm text-blue-600 mb-1">例句</div>
                    <div className="text-gray-700 mb-2">{currentWord.example}</div>
                    <div className="text-sm text-gray-500">{currentWord.exampleMeaning}</div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentWord.word);
                    }}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>播放发音</span>
                  </button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {!reviewMode && currentWord && (
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDontKnow}
              className="flex-1 max-w-xs"
            >
              <X className="w-5 h-5 mr-2 text-red-500" />
              不认识
            </Button>
            <Button
              size="lg"
              onClick={handleKnow}
              className={`flex-1 max-w-xs bg-gradient-to-r ${languageColors[language]}`}
            >
              <Check className="w-5 h-5 mr-2" />
              认识
            </Button>
          </div>
        )}

        {reviewMode && (
          <Card className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">本轮学习完成！</h2>
            <p className="text-gray-600 mb-6">
              你已掌握 {knownWords.size} / {words.length} 个单词
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" onClick={resetCards}>
                再学一遍
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                className={`bg-gradient-to-r ${languageColors[language]}`}
              >
                返回学习面板
              </Button>
            </div>
          </Card>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">所有词汇</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {words.map((word, index) => (
              <Card
                key={word.id}
                className={`p-4 cursor-pointer transition-all ${
                  knownWords.has(word.id)
                    ? 'bg-green-50 border-green-200'
                    : index === currentIndex
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:shadow-md'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsFlipped(false);
                  setReviewMode(false);
                }}
              >
                <div className="text-lg font-medium text-gray-900">{word.word}</div>
                <div className="text-sm text-gray-500">{word.meaning}</div>
                {knownWords.has(word.id) && (
                  <div className="mt-2 text-xs text-green-600 font-medium">已掌握 ✓</div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
