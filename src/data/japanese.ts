import type { Course, VocabularyWord, GrammarRule } from '../types';

export const japaneseCourses: Course[] = [
  {
    id: 'ja_n5',
    language: 'ja',
    level: 'A1',
    title: '日语 N5 入门',
    description: '学习日语假名（五十音图）和基础对话',
    units: [
      {
        id: 'ja_n5_u1',
        title: '五十音图',
        description: '学习日语平假名和片假名',
        lessons: [
          { id: 'ja_n5_u1_l1', title: 'あ行、か行', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ja_n5_u1_l2', title: 'さ行、た行', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ja_n5_u1_l3', title: 'な行、は行', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ja_n5_u1_l4', title: 'ま行、や行、ら行、わ行', type: 'vocabulary', duration: 20, xpReward: 30 },
        ],
      },
      {
        id: 'ja_n5_u2',
        title: '基础问候',
        description: '学习日常问候语',
        lessons: [
          { id: 'ja_n5_u2_l1', title: 'おはようございます', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'ja_n5_u2_l2', title: 'こんにちは', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'ja_n5_u2_l3', title: 'こんばんは', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'ja_n5_u2_l4', title: '初次见面句型', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'ja_n5_u2_l5', title: '跟读练习', type: 'speaking', duration: 10, xpReward: 25 },
        ],
      },
      {
        id: 'ja_n5_u3',
        title: '自我表达',
        description: '学习介绍自己和家人',
        lessons: [
          { id: 'ja_n5_u3_l1', title: '私は〜です', type: 'vocabulary', duration: 10, xpReward: 20 },
          { id: 'ja_n5_u3_l2', title: '家族介绍', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ja_n5_u3_l3', title: '指示代词', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'ja_n5_u3_l4', title: '听力练习', type: 'listening', duration: 10, xpReward: 25 },
        ],
      },
    ],
  },
  {
    id: 'ja_n4',
    language: 'ja',
    level: 'A2',
    title: '日语 N4 初级',
    description: '掌握基础语法和更多日常用语',
    units: [
      {
        id: 'ja_n4_u1',
        title: '动词变形',
        description: '学习日语动词的基本变形',
        lessons: [
          { id: 'ja_n4_u1_l1', title: '动词分类', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ja_n4_u1_l2', title: 'て形变化', type: 'grammar', duration: 20, xpReward: 35 },
          { id: 'ja_n4_u1_l3', title: 'た形变化', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'ja_n4_u1_l4', title: '口语练习', type: 'speaking', duration: 10, xpReward: 25 },
        ],
      },
      {
        id: 'ja_n4_u2',
        title: '时间与频率',
        description: '表达时间和动作频率',
        lessons: [
          { id: 'ja_n4_u2_l1', title: '时间词汇', type: 'vocabulary', duration: 15, xpReward: 25 },
          { id: 'ja_n4_u2_l2', title: '频率表达', type: 'grammar', duration: 15, xpReward: 30 },
          { id: 'ja_n4_u2_l3', title: '听力训练', type: 'listening', duration: 10, xpReward: 25 },
        ],
      },
    ],
  },
];

export const japaneseVocabulary: VocabularyWord[] = [
  {
    id: 'ja_v1',
    word: 'こんにちは',
    pronunciation: 'konnichiwa',
    meaning: '你好',
    example: 'こんにちは、田中さん。',
    exampleMeaning: '你好，田中先生。',
  },
  {
    id: 'ja_v2',
    word: 'おはよう',
    pronunciation: 'ohayou',
    meaning: '早上好',
    example: 'おはようございます。',
    exampleMeaning: '早上好。',
  },
  {
    id: 'ja_v3',
    word: 'ありがとう',
    pronunciation: 'arigatou',
    meaning: '谢谢',
    example: 'ありがとうございます。',
    exampleMeaning: '非常感谢。',
  },
  {
    id: 'ja_v4',
    word: 'すみません',
    pronunciation: 'sumimasen',
    meaning: '对不起/请问',
    example: 'すみません、駅はどこですか？',
    exampleMeaning: '请问，车站在哪里？',
  },
  {
    id: 'ja_v5',
    word: 'はい',
    pronunciation: 'hai',
    meaning: '是的',
    example: 'はい、わかりました。',
    exampleMeaning: '是的，我明白了。',
  },
  {
    id: 'ja_v6',
    word: 'いいえ',
    pronunciation: 'iie',
    meaning: '不，不是',
    example: 'いいえ、違います。',
    exampleMeaning: '不，不对。',
  },
  {
    id: 'ja_v7',
    word: '水',
    pronunciation: 'mizu',
    meaning: '水',
    example: '水をください。',
    exampleMeaning: '请给我水。',
  },
  {
    id: 'ja_v8',
    word: 'ご飯',
    pronunciation: 'gohan',
    meaning: '米饭/饭',
    example: 'ご飯を食べます。',
    exampleMeaning: '吃饭。',
  },
  {
    id: 'ja_v9',
    word: '家族',
    pronunciation: 'kazoku',
    meaning: '家人',
    example: '家族は4人です。',
    exampleMeaning: '家里有4口人。',
  },
  {
    id: 'ja_v10',
    word: '友達',
    pronunciation: 'tomodachi',
    meaning: '朋友',
    example: '友達と映画を見ます。',
    exampleMeaning: '和朋友看电影。',
  },
  {
    id: 'ja_v11',
    word: '本',
    pronunciation: 'hon',
    meaning: '书',
    example: '本を読みます。',
    exampleMeaning: '读书。',
  },
  {
    id: 'ja_v12',
    word: '学校',
    pronunciation: 'gakkou',
    meaning: '学校',
    example: '学校に行きます。',
    exampleMeaning: '去学校。',
  },
];

export const japaneseGrammar: GrammarRule[] = [
  {
    id: 'ja_g1',
    title: 'は的用法',
    explanation: 'は是助词，用于提示主题。跟在名词后面，表示这句话的主题是什么。',
    examples: [
      { sentence: '私は学生です。', translation: '我是学生。' },
      { sentence: '彼女は日本人です。', translation: '她是日本人。' },
      { sentence: '今日は晴天です。', translation: '今天是晴天。' },
    ],
  },
  {
    id: 'ja_g2',
    title: 'です的用法',
    explanation: 'です是判断词，相当于汉语的"是"，用于名词句的谓语部分。',
    examples: [
      { sentence: 'これは本です。', translation: '这是书。' },
      { sentence: '今日は火曜日です。', translation: '今天是星期二。' },
      { sentence: 'あの人は先生です。', translation: '那个人是老师。' },
    ],
  },
  {
    id: 'ja_g3',
    title: '指示代词 これ/それ/あれ',
    explanation: 'これ是指离说话人近的东西，それ是指离听话人近的东西，あれ是指离两者都远的东西。',
    examples: [
      { sentence: 'これは私の傘です。', translation: '这是我的伞。' },
      { sentence: 'それは何ですか？', translation: '那是什么？' },
      { sentence: 'あれは山です。', translation: '那是山。' },
    ],
  },
  {
    id: 'ja_g4',
    title: '动词て形',
    explanation: '动词て形是日语中非常重要的语法点，可以表示动作的先后、并列、请求等。',
    examples: [
      { sentence: '朝起きて、歯を磨きます。', translation: '早上起床后刷牙。' },
      { sentence: 'ご飯を食べて、映画を見ます。', translation: '吃完饭后看电影。' },
      { sentence: '待ってください。', translation: '请等我。' },
    ],
  },
];
