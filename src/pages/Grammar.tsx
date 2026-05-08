import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Card, Button } from '../components/common';
import { Header, Footer } from '../components/layout';
import { englishGrammar, japaneseGrammar, koreanGrammar } from '../data';
import { Check, X, ChevronRight, Volume2, BookOpen } from 'lucide-react';
import type { GrammarRule } from '../types';

export const Grammar: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, addXP } = useAuthStore();

  const [language, setLanguage] = useState('en');
  const [grammarRules, setGrammarRules] = useState<GrammarRule[]>([]);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: '选择正确的be动词：She ___ a student.',
      options: ['am', 'is', 'are', 'be'],
      correct: 'is',
    },
    {
      question: '现在进行时的结构是：',
      options: ['主语 + 动词原形', '主语 + be + 动词-ing', '主语 + 动词+s', '主语 + 动词+ed'],
      correct: '主语 + be + 动词-ing',
    },
    {
      question: '"水"在英语中是：',
      options: ['food', 'water', 'juice', 'milk'],
      correct: 'water',
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const lang = searchParams.get('language') || 'en';
    setLanguage(lang);

    let grammarList: GrammarRule[] = [];
    switch (lang) {
      case 'en':
        grammarList = englishGrammar;
        break;
      case 'ja':
        grammarList = japaneseGrammar;
        break;
      case 'ko':
        grammarList = koreanGrammar;
        break;
    }
    setGrammarRules(grammarList);
  }, [user, navigate, searchParams]);

  const speakSentence = (sentence: string) => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = language === 'en' ? 'en-US' : language === 'ja' ? 'ja-JP' : 'ko-KR';
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
      addXP(10);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const languageColors: Record<string, string> = {
    en: 'from-blue-500 to-blue-600',
    ja: 'from-pink-500 to-red-500',
    ko: 'from-purple-500 to-violet-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">语法练习</h1>
          <p className="text-gray-600">学习核心语法规则，完成练习测试</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">语法规则</h2>
            </div>

            <div className="space-y-4">
              {grammarRules.map((rule) => (
                <Card key={rule.id} className="overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">{rule.title}</h3>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedRule === rule.id ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {expandedRule === rule.id && (
                    <div className="p-4 border-t bg-gray-50">
                      <p className="text-gray-700 mb-4">{rule.explanation}</p>

                      <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-600 mb-2">例句：</div>
                        {rule.examples.map((example, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="text-gray-900 mb-1">{example.sentence}</div>
                                <div className="text-sm text-gray-500">{example.translation}</div>
                              </div>
                              <button
                                onClick={() => speakSentence(example.sentence)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <Volume2 className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-2xl">✏️</div>
              <h2 className="text-xl font-bold text-gray-900">练习测试</h2>
            </div>

            <Card className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>题目 {currentQuestion + 1} / {questions.length}</span>
                  <span className="text-green-600 font-medium">得分: {score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${languageColors[language]} h-2 rounded-full`}
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === questions[currentQuestion].correct;
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
                  {currentQuestion < questions.length - 1 ? (
                    <Button onClick={handleNext}>
                      下一题
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setCurrentQuestion(0);
                        setScore(0);
                        setSelectedAnswer(null);
                        setShowResult(false);
                      }}
                      className={`bg-gradient-to-r ${languageColors[language]}`}
                    >
                      完成！查看结果
                    </Button>
                  )}
                </div>
              )}
            </Card>

            <Card className="p-6 mt-6 bg-gradient-to-r from-yellow-50 to-orange-50">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">📊</div>
                <div>
                  <div className="text-sm text-gray-600">本次练习</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {score} / {questions.length} 正确
                  </div>
                  <div className="text-sm text-gray-500">
                    {score === questions.length
                      ? '太棒了！全部正确！🎉'
                      : score >= questions.length / 2
                      ? '做得不错，继续加油！💪'
                      : '多复习一下语法规则吧 📚'}
                  </div>
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
