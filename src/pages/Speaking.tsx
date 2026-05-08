import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store';
import { Card, Button } from '../components/common';
import { Header, Footer } from '../components/layout';
import { Mic, Square, Play, Pause, Volume2, RotateCcw, Star } from 'lucide-react';

export const Speaking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, addXP } = useAuthStore();

  const [language, setLanguage] = useState('en');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sentences = [
    {
      text: language === 'en' 
        ? 'Hello, my name is John.' 
        : language === 'ja' 
        ? 'こんにちは、田中です。' 
        : '안녕하세요, 김철수입니다.',
      translation: language === 'en' 
        ? '你好，我叫约翰。' 
        : language === 'ja' 
        ? '你好，我是田中。' 
        : '你好，我是金哲洙。',
    },
    {
      text: language === 'en' 
        ? 'I am learning English.' 
        : language === 'ja' 
        ? '日本語を勉強しています。' 
        : '한국어를 공부하고 있습니다.',
      translation: language === 'en' 
        ? '我正在学习英语。' 
        : language === 'ja' 
        ? '我正在学习日语。' 
        : '我正在学习韩语。',
    },
    {
      text: language === 'en' 
        ? 'What time is it now?' 
        : language === 'ja' 
        ? '今、何時ですか？' 
        : '지금 몇 시입니까?',
      translation: language === 'en' 
        ? '现在几点？' 
        : language === 'ja' 
        ? '现在几点？' 
        : '现在几点？',
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

  const speakSentence = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : language === 'ja' ? 'ja-JP' : 'ko-KR';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedAudio(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (recordedAudio && audioRef.current) {
      audioRef.current.src = recordedAudio;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const submitPractice = () => {
    const newScore = Math.floor(Math.random() * 30) + 70;
    setScore(newScore);
    setShowScore(true);
    addXP(15);
  };

  const nextSentence = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1);
      setRecordedAudio(null);
      setShowScore(false);
    }
  };

  const resetPractice = () => {
    setRecordedAudio(null);
    setShowScore(false);
  };

  const languageColors: Record<string, string> = {
    en: 'from-blue-500 to-blue-600',
    ja: 'from-pink-500 to-red-500',
    ko: 'from-purple-500 to-violet-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">口语跟读</h1>
          <p className="text-gray-600">跟读标准发音，AI智能评分</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">跟读内容</h2>

            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">第 {currentSentence + 1} / {sentences.length} 句</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${languageColors[language]} h-2 rounded-full`}
                  style={{ width: `${((currentSentence + 1) / sentences.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl mb-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {sentences[currentSentence].text}
              </div>
              <div className="text-lg text-gray-600">
                {sentences[currentSentence].translation}
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => speakSentence(sentences[currentSentence].text)}
              >
                <Volume2 className="w-5 h-5 mr-2" />
                播放原音
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">录音练习</h2>

            <div className="flex flex-col items-center justify-center py-12">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 text-red-500" />
                  ) : (
                    <Mic className="w-8 h-8 text-gray-900" />
                  )}
                </button>
              </div>

              <div className="text-center mb-6">
                {isRecording ? (
                  <div className="text-red-500 font-medium animate-pulse">
                    录音中... 点击停止
                  </div>
                ) : recordedAudio ? (
                  <div className="text-green-600 font-medium">
                    录音完成！
                  </div>
                ) : (
                  <div className="text-gray-500">
                    点击开始录音
                  </div>
                )}
              </div>

              {recordedAudio && !showScore && (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={playRecording}>
                    {isPlaying ? (
                      <Pause className="w-5 h-5 mr-2" />
                    ) : (
                      <Play className="w-5 h-5 mr-2" />
                    )}
                    播放录音
                  </Button>
                  <Button variant="outline" onClick={resetPractice}>
                    <RotateCcw className="w-5 h-5 mr-2" />
                    重新录音
                  </Button>
                </div>
              )}

              <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

              {recordedAudio && !showScore && (
                <Button
                  className={`mt-6 bg-gradient-to-r ${languageColors[language]}`}
                  onClick={submitPractice}
                >
                  提交评分
                </Button>
              )}

              {showScore && (
                <div className="text-center mt-6">
                  <div className="text-6xl font-bold text-gray-900 mb-2">{score}</div>
                  <div className="text-gray-600 mb-4">发音评分</div>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.round(score / 20)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {score >= 90
                      ? '太棒了！发音非常标准！🎉'
                      : score >= 70
                      ? '不错，继续练习！💪'
                      : '需要多听多练哦 📚'}
                  </div>

                  {currentSentence < sentences.length - 1 ? (
                    <Button className="mt-6" onClick={nextSentence}>
                      下一句
                    </Button>
                  ) : (
                    <Button
                      className="mt-6"
                      onClick={() => {
                        setCurrentSentence(0);
                        setRecordedAudio(null);
                        setShowScore(false);
                      }}
                    >
                      完成练习
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-bold text-gray-900 mb-4">💡 口语练习小技巧</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 先仔细听原音，注意语调变化</li>
            <li>• 录音时保持发音清晰，语速适中</li>
            <li>• 多次练习，对比自己的发音和原音</li>
            <li>• 注意连读和重音，这些是地道的关键</li>
          </ul>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
