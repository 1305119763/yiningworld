import type { Course, VocabularyWord, GrammarRule } from '../types';

export const englishCourses: Course[] = [
  {
    id: 'en_a1',
    language: 'en',
    level: 'A1',
    title: '英语 A1 基础级',
    description: '从零开始学习基础英语，掌握日常交流所需的核心词汇和语法',
    units: [
      {
        id: 'en_a1_u1',
        title: '问候与介绍',
        description: '学习如何用英语打招呼和介绍自己',
        lessons: [
          { id: 'en_a1_u1_l1', title: 'Hello!', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'en_a1_u1_l2', title: 'My name is...', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'en_a1_u1_l3', title: '基础句型', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'en_a1_u1_l4', title: '跟读练习', type: 'speaking', duration: 10, xpReward: 25 },
        ],
      },
      {
        id: 'en_a1_u2',
        title: '数字与时间',
        description: '学习数字、时间和日期的表达',
        lessons: [
          { id: 'en_a1_u2_l1', title: 'Numbers 1-100', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'en_a1_u2_l2', title: 'What time is it?', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'en_a1_u2_l3', title: '时间表达', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'en_a1_u2_l4', title: '听力练习', type: 'listening', duration: 10, xpReward: 25 },
        ],
      },
      {
        id: 'en_a1_u3',
        title: '家庭与朋友',
        description: '学习描述家庭成员和朋友',
        lessons: [
          { id: 'en_a1_u3_l1', title: 'Family Members', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'en_a1_u3_l2', title: 'My Family', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'en_a1_u3_l3', title: '所有格和代词', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'en_a1_u3_l4', title: '口语练习', type: 'speaking', duration: 10, xpReward: 25 },
        ],
      },
    ],
  },
  {
    id: 'en_a2',
    language: 'en',
    level: 'A2',
    title: '英语 A2 初级',
    description: '扩展词汇量，能够进行简单的日常对话',
    units: [
      {
        id: 'en_a2_u1',
        title: '日常生活',
        description: '描述日常活动和作息时间',
        lessons: [
          { id: 'en_a2_u1_l1', title: 'Daily Routine', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'en_a2_u1_l2', title: 'Time Expressions', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'en_a2_u1_l3', title: '现在进行时', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'en_a2_u1_l4', title: '听力训练', type: 'listening', duration: 10, xpReward: 25 },
        ],
      },
      {
        id: 'en_a2_u2',
        title: '购物与餐饮',
        description: '在商店和餐厅进行基本交流',
        lessons: [
          { id: 'en_a2_u2_l1', title: 'Shopping Vocabulary', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'en_a2_u2_l2', title: 'Food and Drinks', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'en_a2_u2_l3', title: '可数与不可数名词', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'en_a2_u2_l4', title: '情景对话', type: 'speaking', duration: 10, xpReward: 25 },
        ],
      },
    ],
  },
];

export const englishVocabulary: VocabularyWord[] = [
  {
    id: 'en_v1',
    word: 'hello',
    pronunciation: '/həˈloʊ/',
    meaning: '你好',
    example: 'Hello, my name is John.',
    exampleMeaning: '你好，我叫约翰。',
  },
  {
    id: 'en_v2',
    word: 'goodbye',
    pronunciation: '/ɡʊdˈbaɪ/',
    meaning: '再见',
    example: 'Goodbye, see you tomorrow!',
    exampleMeaning: '再见，明天见！',
  },
  {
    id: 'en_v3',
    word: 'thank you',
    pronunciation: '/θæŋk juː/',
    meaning: '谢谢',
    example: 'Thank you for your help.',
    exampleMeaning: '谢谢你的帮助。',
  },
  {
    id: 'en_v4',
    word: 'please',
    pronunciation: '/pliːz/',
    meaning: '请',
    example: 'Please pass me the salt.',
    exampleMeaning: '请把盐递给我。',
  },
  {
    id: 'en_v5',
    word: 'yes',
    pronunciation: '/jes/',
    meaning: '是的',
    example: 'Yes, I agree with you.',
    exampleMeaning: '是的，我同意你的观点。',
  },
  {
    id: 'en_v6',
    word: 'no',
    pronunciation: '/noʊ/',
    meaning: '不',
    example: 'No, I don\'t understand.',
    exampleMeaning: '不，我不理解。',
  },
  {
    id: 'en_v7',
    word: 'water',
    pronunciation: '/ˈwɔːtər/',
    meaning: '水',
    example: 'I would like a glass of water.',
    exampleMeaning: '我想要一杯水。',
  },
  {
    id: 'en_v8',
    word: 'food',
    pronunciation: '/fuːd/',
    meaning: '食物',
    example: 'The food here is delicious.',
    exampleMeaning: '这里的食物很美味。',
  },
  {
    id: 'en_v9',
    word: 'family',
    pronunciation: '/ˈfæməli/',
    meaning: '家庭',
    example: 'My family lives in Beijing.',
    exampleMeaning: '我的家人住在北京。',
  },
  {
    id: 'en_v10',
    word: 'friend',
    pronunciation: '/frend/',
    meaning: '朋友',
    example: 'She is my best friend.',
    exampleMeaning: '她是我最好的朋友。',
  },
  {
    id: 'en_v11',
    word: 'book',
    pronunciation: '/bʊk/',
    meaning: '书',
    example: 'I like to read books.',
    exampleMeaning: '我喜欢看书。',
  },
  {
    id: 'en_v12',
    word: 'school',
    pronunciation: '/skuːl/',
    meaning: '学校',
    example: 'The school is near my home.',
    exampleMeaning: '学校在我家附近。',
  },
];

export const englishGrammar: GrammarRule[] = [
  {
    id: 'en_g1',
    title: 'Be动词的用法',
    explanation: 'Be动词（am/is/are）用于构成英语的进行时和被动语态，也可用于表达身份和状态。',
    examples: [
      { sentence: 'I am a student.', translation: '我是一名学生。' },
      { sentence: 'She is from China.', translation: '她来自中国。' },
      { sentence: 'They are learning English.', translation: '他们正在学习英语。' },
    ],
  },
  {
    id: 'en_g2',
    title: '一般现在时',
    explanation: '一般现在时用于描述经常性或习惯性的动作，以及客观事实和普遍真理。',
    examples: [
      { sentence: 'I drink coffee every morning.', translation: '我每天早上喝咖啡。' },
      { sentence: 'The sun rises in the east.', translation: '太阳从东方升起。' },
      { sentence: 'She works at a bank.', translation: '她在银行工作。' },
    ],
  },
  {
    id: 'en_g3',
    title: '现在进行时',
    explanation: '现在进行时用于描述正在进行的动作，由"be + 动词-ing"构成。',
    examples: [
      { sentence: 'I am reading a book now.', translation: '我现在正在读书。' },
      { sentence: 'They are playing football.', translation: '他们正在踢足球。' },
      { sentence: 'She is cooking dinner.', translation: '她正在做晚饭。' },
    ],
  },
  {
    id: 'en_g4',
    title: '可数名词与不可数名词',
    explanation: '可数名词有单复数形式，不可数名词没有复数形式，需要用量词修饰。',
    examples: [
      { sentence: 'I have two apples.', translation: '我有两个苹果。' },
      { sentence: 'I need some water.', translation: '我需要一些水。' },
      { sentence: 'There is a lot of information.', translation: '有很多信息。' },
    ],
  },
];
