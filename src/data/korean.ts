import type { Course, VocabularyWord, GrammarRule } from '../types';

export const koreanCourses: Course[] = [
  {
    id: 'ko_level1',
    language: 'ko',
    level: 'A1',
    title: '韩语 TOPIK 1 入门',
    description: '学习韩语基础发音和日常用语',
    units: [
      {
        id: 'ko_level1_u1',
        title: '韩语发音',
        description: '学习韩语四十音和基本发音规则',
        lessons: [
          { id: 'ko_level1_u1_l1', title: '子音 ㄱㄴㄷㄹ', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ko_level1_u1_l2', title: '母音 ㅏㅓㅗㅜ', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ko_level1_u1_l3', title: '收音规则', type: 'grammar', duration: 20, xpReward: 35 },
          { id: 'ko_level1_u1_l4', title: '发音练习', type: 'speaking', duration: 10, xpReward: 25 },
        ],
      },
      {
        id: 'ko_level1_u2',
        title: '基础问候',
        description: '学习日常问候和自我介绍',
        lessons: [
          { id: 'ko_level1_u2_l1', title: '안녕하세요', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'ko_level1_u2_l2', title: '初次见面', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'ko_level1_u2_l3', title: '입니다/입니까?', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'ko_level1_u2_l4', title: '跟读练习', type: 'speaking', duration: 10, xpReward: 25 },
        ],
      },
      {
        id: 'ko_level1_u3',
        title: '数字与时间',
        description: '学习韩语数字和时间表达',
        lessons: [
          { id: 'ko_level1_u3_l1', title: '基数词 1-100', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ko_level1_u3_l2', title: '时间表达', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'ko_level1_u3_l3', title: '量词', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'ko_level1_u3_l4', title: '听力训练', type: 'listening', duration: 10, xpReward: 25 },
        ],
      },
    ],
  },
  {
    id: 'ko_level2',
    language: 'ko',
    level: 'A2',
    title: '韩语 TOPIK 2 初级',
    description: '掌握基础语法和日常交流',
    units: [
      {
        id: 'ko_level2_u1',
        title: '动词活用',
        description: '学习动词的不同时态变化',
        lessons: [
          { id: 'ko_level2_u1_l1', title: '现在时', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ko_level2_u1_l2', title: '过去时', type: 'grammar', duration: 20, xpReward: 35 },
          { id: 'ko_level2_u1_l3', title: '将来时', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'ko_level2_u1_l4', title: '口语练习', type: 'speaking', duration: 10, xpReward: 25 },
        ],
      },
      {
        id: 'ko_level2_u2',
        title: '场所与位置',
        description: '表达位置和方向',
        lessons: [
          { id: 'ko_level2_u2_l1', title: '场所名词', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ko_level2_u2_l2', title: '에/에서', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'ko_level2_u2_l3', title: '听力训练', type: 'listening', duration: 10, xpReward: 25 },
        ],
      },
    ],
  },
];

export const koreanVocabulary: VocabularyWord[] = [
  {
    id: 'ko_v1',
    word: '안녕하세요',
    pronunciation: 'annyeonghaseyo',
    meaning: '你好',
    example: '안녕하세요, 김철수입니다.',
    exampleMeaning: '你好，我是金哲洙。',
  },
  {
    id: 'ko_v2',
    word: '감사합니다',
    pronunciation: 'gamsahamnida',
    meaning: '谢谢',
    example: '도와줘서 감사합니다.',
    exampleMeaning: '谢谢你的帮助。',
  },
  {
    id: 'ko_v3',
    word: '对不起',
    pronunciation: 'mianhaeyo',
    meaning: '对不起',
    example: '늦어서 미안합니다.',
    exampleMeaning: '对不起，我来晚了。',
  },
  {
    id: 'ko_v4',
    word: '네',
    pronunciation: 'ne',
    meaning: '是的',
    example: '네, 알겠습니다.',
    exampleMeaning: '是的，我明白了。',
  },
  {
    id: 'ko_v5',
    word: '아니요',
    pronunciation: 'aniyo',
    meaning: '不，不是',
    example: '아니요, 괜찮습니다.',
    exampleMeaning: '不，没关系。',
  },
  {
    id: 'ko_v6',
    word: '물',
    pronunciation: 'mul',
    meaning: '水',
    example: '물을 주세요.',
    exampleMeaning: '请给我水。',
  },
  {
    id: 'ko_v7',
    word: '밥',
    pronunciation: 'bap',
    meaning: '饭',
    example: '밥을 먹었습니다.',
    exampleMeaning: '吃了饭。',
  },
  {
    id: 'ko_v8',
    word: '가족',
    pronunciation: 'gajok',
    meaning: '家人',
    example: '가족이 많습니다.',
    exampleMeaning: '家人很多。',
  },
  {
    id: 'ko_v9',
    word: '친구',
    pronunciation: 'chingu',
    meaning: '朋友',
    example: '친구와 같이 갑니다.',
    exampleMeaning: '和朋友一起去。',
  },
  {
    id: 'ko_v10',
    word: '책',
    pronunciation: 'chaek',
    meaning: '书',
    example: '책을 읽습니다.',
    exampleMeaning: '读书。',
  },
  {
    id: 'ko_v11',
    word: '학교',
    pronunciation: 'hakgyo',
    meaning: '学校',
    example: '학교에 갑니다.',
    exampleMeaning: '去学校。',
  },
  {
    id: 'ko_v12',
    word: '시간',
    pronunciation: 'sigan',
    meaning: '时间',
    example: '시간이 많습니다.',
    exampleMeaning: '时间很多。',
  },
];

export const koreanGrammar: GrammarRule[] = [
  {
    id: 'ko_g1',
    title: '입니다/입니까? 的用法',
    explanation: '입니다是判断句的终结词尾，相当于"是"。입니까是其疑问形式，相当于"是...吗？"',
    examples: [
      { sentence: '저는 학생입니다.', translation: '我是学生。' },
      { sentence: '한국어 교실이 어디입니까?', translation: '韩语教室在哪里？' },
      { sentence: '이것은 책입니다.', translation: '这是书。' },
    ],
  },
  {
    id: 'ko_g2',
    title: '은/는 的用法',
    explanation: '은/는是主格助词，用于提示主题。名词以子音结尾用은，以母音结尾用는。',
    examples: [
      { sentence: '나는 한국어를 배웁니다.', translation: '我学韩语。' },
      { sentence: '오늘은 날씨가 좋습니다.', translation: '今天天气好。' },
      { sentence: '가족은 모두 건강합니다.', translation: '家人都健康。' },
    ],
  },
  {
    id: 'ko_g3',
    title: '을/를 的用法',
    explanation: '을/를是宾格助词，表示宾语。名词以子音结尾用을，以母音结尾用를。',
    examples: [
      { sentence: '밥을 먹습니다.', translation: '吃饭。' },
      { sentence: '영화를 봅니다.', translation: '看电影。' },
      { sentence: '책을 읽습니다.', translation: '读书。' },
    ],
  },
  {
    id: 'ko_g4',
    title: '아/어/여요 终结语尾',
    explanation: '动词/形容词后接아/어/여요表示柔和的陈述或疑问，是日常口语中最常用的格式。',
    examples: [
      { sentence: '한국어가 재미있어요.', translation: '韩语很有趣。' },
      { sentence: '오늘 기분이 좋아요?', translation: '今天心情好吗？' },
      { sentence: '잘 지내요.', translation: '过得好。' },
    ],
  },
];
