import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Card, Button } from '../components/common';
import { Header, Footer } from '../components/layout';
import { Play, Pause, Volume2, RotateCcw, Check, X } from 'lucide-react';

export const Listening: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, addXP } = useAuthStore();

  const [language, setLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const listeningMaterials = [
    {
      title: '日常对话：购物',
      level: 'A1',
      duration: '0:30',
      transcript: language === 'en' 
        ? 'Shopkeeper: Good morning! Can I help you?\nCustomer: Yes, I would like to buy a shirt.\nShopkeeper: What color would you like?\nCustomer: Blue, please.\nShopkeeper: Here you are. That will be twenty dollars.'
        : language === 'ja'
        ? '店主人：おはようございます！有什么需要帮助的吗？\n客：はい、シャツを買いたいです。\n店主人：どんな色为您为您为您为您为您？\n客：青をお願いします。\n店主人：给您。二千元です。'
        : '점원：안녕하세요! 무엇을 도와드릴까요?\n고객：네,-shirts을 사고 싶습니다.\n점원：무슨 색상인가요?\n고객：파란색으로 해주세요.\n점원：여기 있습니다. 이만 원입니다.',
      questions: [
        {
          question: '顾客想买什么？',
          options: ['衬衫', '裤子', '鞋子', '帽子'],
          correct: '衬衫',
        },
        {
          question: '顾客选择的是什么颜色？',
          options: ['红色', '蓝色', '绿色', '黑色'],
          correct: '蓝色',
        },
      ],
    },
    {
      title: '餐厅点餐',
      level: 'A1',
      duration: '0:25',
      transcript: language === 'en'
        ? 'Waiter: Welcome! What would you like to order?\nCustomer: I would like the pasta, please.\nWaiter: Would you like anything to drink?\nCustomer: Yes, a glass of water, please.\nWaiter: Sure, coming right up!'
        : 'ウェイター：いらっしゃいませ！ご注文は何ですか？\n客：パスタをお願いします。\nウェイター：飲み物はいかがですか？\n客：水をください。\nウェイター：かしこまりました！',
      questions: [
        {
          question: '顾客点了什么？',
          options: ['披萨', '意大利面', '沙拉', '牛排'],
          correct: '意大利面',
        },
        {
          question: '顾客喝什么？',
          options: ['可乐', '果汁', '水', '茶'],
          correct: '水',
        },
      ],
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const lang = searchParams.get('language') || 'en';
    setLanguage(lang);
  }, [user, navigate, searchParams]);

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : language === 'ja' ? 'ja-JP' : 'ko-KR';
    utterance.rate = playbackSpeed === 1 ? 0.9 : playbackSpeed === 1.5 ? 1.1 : 0.7;
    speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (!audioRef.current) {
      speakText(listeningMaterials[currentQuestion].transcript);
    }
    setIsPlaying(!isPlaying);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === listeningMaterials[currentQuestion].questions[currentQuestion].correct) {
      setScore(score + 1);
      addXP(10);
    }
  };

  const handleNext = () => {
    if (currentQuestion < listeningMaterials.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetExercise = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const languageColors: Record<string, string> = {
    en: 'from-blue-500 to-blue-600',
    ja: 'from-pink-500 to-red-500',
    ko: 'from-purple-500 to-violet-600',
  };

  const currentMaterial = listeningMaterials[currentQuestion];
  const currentQ = currentMaterial.questions[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">听力训练</h1>
          <p className="text-gray-600">提高听力理解能力</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">听力材料</h2>
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1} / {listeningMaterials.length}
                </span>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{currentMaterial.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${languageColors[language]} text-white`}>
                    {currentMaterial.level}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-4">时长: {currentMaterial.duration}</div>

                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePlay}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        暂停
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        播放
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => speakText(currentMaterial.transcript)}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    朗读
                  </Button>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">播放速度:</span>
                  {[0.5, 1, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-3 py-1 rounded-full transition-colors ${
                        playbackSpeed === speed
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">听力原文</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(currentMaterial.transcript)}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-4 rounded-xl max-h-48 overflow-y-auto">
                  {currentMaterial.transcript}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">听力理解测试</h2>

              <div className="mb-6">
                <div className="text-xl font-bold text-gray-900 mb-4">
                  {currentQ.question}
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQ.correct;
                    const showCorrect = showResult && isCorrect;
                    const showWrong = showResult && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={showResult}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          showCorrect
                            ? 'bg-green-100 border-2 border-green-500 text-green-700'
                            : showWrong
                            ? 'bg-red-100 border-2 border-red-500 text-red-700'
                            : isSelected
                            ? 'bg-blue-100 border-2 border-blue-500'
                            : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showCorrect && <Check className="w-5 h-5 text-green-500" />}
                          {showWrong && <X className="w-5 h-5 text-red-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {showResult && (
                <div className="flex justify-end">
                  {currentQuestion < listeningMaterials.length - 1 ? (
                    <Button onClick={handleNext}>
                      下一题
                    </Button>
                  ) : (
                    <Button
                      onClick={resetExercise}
                      className={`bg-gradient-to-r ${languageColors[language]}`}
                    >
                      重新练习
                    </Button>
                  )}
                </div>
              )}

              <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                <div className="text-sm text-yellow-800">
                  <strong>💡 提示：</strong> 
                  {currentQ.correct === '衬衫' 
                    ? ' 仔细听顾客要的商品和颜色' 
                    : ' 注意顾客点的食物和饮料'}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
