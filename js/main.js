(function () {
  'use strict';

  var quizDrafts = {
    direction: '保留标准MBTI四维度，只选择性吸收“纯职场场景、强冲突二选一、打工人黑话”的表达方式。',
    rejected: '不改成自创W/M/R/K/G/X/Z/L体系，不直接使用过激或攻击性人格标签。',
    final: '正式版采用12题，结果仍输出标准E/I、S/N、T/F、J/P，并搭配原创工位人格称号。'
  };

  var questions = [
    {
      tag: '会议装死',
      meme: '别cue我',
      text: '全员大会突然冷场，领导眼神开始扫射，你的真实反应是？',
      options: [
        { text: '先开麦把空气救活，观点可以再修，场子不能死。', dimension: 'E' },
        { text: '低头研究文档，祈祷摄像头和领导都忘了我。', dimension: 'I' }
      ]
    },
    {
      tag: '跨部门甩锅',
      meme: '锅飞过来',
      text: '隔壁部门把一个“不归你但很急”的锅滑到你桌上，你会？',
      options: [
        { text: '当场拉齐边界：谁的锅谁端，别拿“协同”包装甩锅。', dimension: 'E' },
        { text: '先私下查清来龙去脉，能不正面开战就不把场面撕破。', dimension: 'I' }
      ]
    },
    {
      tag: '露脸诱惑',
      meme: '上台受审',
      text: '有个汇报露脸机会，做得好能被看见，做砸也会被看见，你选？',
      options: [
        { text: '冲，职场没有观众席，只有上桌和被遗忘。', dimension: 'E' },
        { text: '谢邀，我的才华适合幕后发光，不适合公开处刑。', dimension: 'I' }
      ]
    },
    {
      tag: '大饼鉴定',
      meme: '饼太圆了',
      text: '新方案听起来很宏大，但落地路径像失踪人口，你会先问？',
      options: [
        { text: '谁做、何时交、用什么资源？饼再香也得有锅能烙。', dimension: 'S' },
        { text: '它能不能打开新局面？只补小洞，迟早还得塌。', dimension: 'N' }
      ]
    },
    {
      tag: '周报文学',
      meme: '别写散文',
      text: '写周报时，你最受不了哪种要求？',
      options: [
        { text: '明明要结果，却让我写成一篇励志散文。', dimension: 'S' },
        { text: '只准罗列流水账，不让说判断和机会点。', dimension: 'N' }
      ]
    },
    {
      tag: '项目塌方',
      meme: '先救哪边',
      text: '项目上线前突然发现关键功能跑不通，群里没人拍板，你第一反应是？',
      options: [
        { text: '先拉清单：影响范围、负责人、修复时间，别让问题继续扩散。', dimension: 'S' },
        { text: '先追根因：是不是流程、评审、协作机制整体都有问题。', dimension: 'N' }
      ]
    },
    {
      tag: '追责修罗场',
      meme: '锅别乱扣',
      text: '事故复盘会上，有人开始用“大家都有责任”稀释重点，你会？',
      options: [
        { text: '把事实摊开，责任归责任，情绪归情绪，别搅成一锅粥。', dimension: 'T' },
        { text: '先稳住场面，别让复盘变成公开处刑。', dimension: 'F' }
      ]
    },
    {
      tag: '晋升内卷',
      meme: '朋友也卷',
      text: '晋升名额只剩一个，你和关系好的同事正面撞车，你会？',
      options: [
        { text: '该亮成绩亮成绩，职场不是谦让综艺。', dimension: 'T' },
        { text: '嘴上说公平竞争，心里已经开始替对方难受。', dimension: 'F' }
      ]
    },
    {
      tag: '心软背刺自己',
      meme: '又我兜底',
      text: '同事临时请假，活自然滑到你桌上，你第一反应是？',
      options: [
        { text: '先问交接和优先级，我可以帮忙，但不当无限回收站。', dimension: 'T' },
        { text: '算了先扛吧，怕对方被骂，也怕事情真的炸。', dimension: 'F' }
      ]
    },
    {
      tag: '截止日人格',
      meme: '压线心跳',
      text: '面对截止日期，你更像哪种职场生物？',
      options: [
        { text: '提前交付型：我可以累，但不能慌。', dimension: 'J' },
        { text: '压线爆发型：不到最后一刻，灵魂不肯上线。', dimension: 'P' }
      ]
    },
    {
      tag: '加班人设',
      meme: '谁在表演',
      text: '下班前没急事，但旁边都在假装忙碌，你会？',
      options: [
        { text: '再整理点明天计划，至少让自己看起来像有章法。', dimension: 'J' },
        { text: '本职做完就撤，形式加班不是我的职场香水。', dimension: 'P' }
      ]
    },
    {
      tag: '半夜需求',
      meme: '私域保卫战',
      text: '半夜弹出一句“有个小需求”，你的灵魂会？',
      options: [
        { text: '先看影响范围，能闭环就闭环，别让明天开局爆炸。', dimension: 'J' },
        { text: '先判断是否真紧急，不紧急就别来敲我的私人时间。', dimension: 'P' }
      ]
    }
  ];

  var results = {
    ISTJ: ['流程暴君', '你不是来上班的，你是来给混乱判死刑的。', '别人眼里的“差不多”，在你这里会被打回重做三次。只要你坐镇，项目文档像刚军训完一样整齐。', '你最狠的地方是：嘴上配合，心里已经给每个模糊需求判了缓刑。', '别跟他说“差不多就行”，他会立刻听见项目塌方的声音。', 'judge'],
    ISFJ: ['背锅圣母', '你嘴上说“我没事”，其实已经被全团队当成人形安全网。', '你像办公室隐藏血包，哪里漏水补哪里，哪里冒烟扑哪里，还顺手安慰起火的人。', '你最大的问题是太好用，好用到别人忘了你也是个人，不是团队外挂。', '别用“你最好说话”绑架他，心软不是团队公共物资。', 'angel'],
    INFJ: ['读心判官', '你安静得像在加载，其实已经把全场小心思扒到只剩字幕。', '你能把一团乱麻翻译成人话，还能顺手指出这团麻为什么从源头就拧巴。', '你最大的内耗来源：别人演得很烂，你却替他们尴尬到想退场。', '别只丢任务不讲原因，他会一边做一边怀疑人生。', 'mystic'],
    INTJ: ['冷脸军师', '你不是不合群，你是觉得大多数讨论根本没资格进你的系统。', '别人讨论下一步，你已经推演到第七步塌方点，并顺手准备了备用宇宙。', '你真正受不了的是：有人空手进会，还想让你现场替他长脑子。', '别空手进会还想借他的脑子，先带点上下文当门票。', 'robot'],
    ISTP: ['沉默修罗', '你平时像离线插件，系统一炸，全员才想起你是核心依赖。', '你不爱喊口号，但真出事时，别人还在截图发群，你已经开始拆炸弹。', '你最危险的状态是沉默，因为那通常代表你已经把这场会判成无效。', '别在他修问题时围观讲流程，他真的会更想关机。', 'tool'],
    ISFP: ['审美洁癖怪', '别人还在夸“挺好”，你已经看见方案脸上写着“将就”。', '你能把粗糙交付物揉出质感，让一个“能用”的东西终于像个人做的。', '你最难伺候的地方是：糊弄可以过别人眼，但过不了你的精神洁癖。', '别拿粗糙方案逼他夸，他的表情管理会先崩。', 'artist'],
    INFP: ['理想主义怨种', '你不是想太多，你是无法接受自己被无意义任务反复消耗。', '你能把冰冷任务讲出人味，也能在一堆 KPI 里找到一点值得坚持的光。', '你最容易破防的是：一边知道任务很空，一边还要装作它很重要。', '别用“领导要”当唯一理由，他会瞬间失去灵魂 Wi-Fi。', 'dream'],
    INTP: ['逻辑屠夫', '你看似在摸鱼，其实正在把需求拆到对方自己都心虚。', '伪逻辑、假共识、拍脑袋方案，在你面前像穿了荧光裤，藏都藏不住。', '你最冒犯人的地方是：不吵不闹，但能把对方逻辑拆到只剩包装。', '别拿口号当证据，他会把你的逻辑拆到只剩标点。', 'detective'],
    ESTP: ['火场莽夫', '别人还在建群命名，你已经冲进火场，顺便嫌他们挡路。', '你天生适合混乱现场，越紧急越兴奋，越烫手越想亲自摸一下。', '你最大的风险是：别人刚说情况复杂，你已经开始用行动替他们复杂。', '别让他救火还不给水，他会先把流程扔出火场。', 'fire'],
    ESFP: ['社交显眼包', '你一开口，冷场会被迫营业，尴尬会自动退群。', '你能把尴尬从地板缝里抠出来，再包装成“大家继续推进”的台阶。', '你最惨的时候是：你在救气氛，别人以为气氛本来就该你负责。', '别让他热脸贴冷场，没人接梗会让他快乐断电。', 'spark'],
    ENFP: ['脑洞疯批', '你的脑洞像失控弹窗，烦是真的烦，救命也是真的救命。', '你能把一件普通任务讲成宇宙级企划，把沉闷项目点成烟花。', '你最离谱的地方是：计划赶不上你脑洞变脸，PPT 都追不上你。', '别一上来就拿表格框死他，他的脑洞会当场越狱。', 'rocket'],
    ENTP: ['方案杠精', '你不是杠，你是专门让烂方案当众露馅的压力锅。', '任何“大家都这么做”的方案，到了你这里都要先过一遍灵魂拷打。', '你最容易得罪人的地方是：别人想要掌声，你偏要给方案做尸检。', '别说“别问了照做”，这句话会直接点燃辩论副本。', 'debate'],
    ESTJ: ['进度暴君', '你一出现，散装任务开始发抖，连空气都想找负责人。', '你擅长把“差不多”打成“明确负责人+截止时间+验收标准”。', '你最吓人的地方是：任务刚失控三秒，你已经想给每个人贴责任条。', '别把任务丢成无主流浪猫，他会忍不住给全场排班。', 'commander'],
    ESFJ: ['人情保姆', '你嘴上说“我来协调”，实际是在替一群成年人补社交作业。', '你像办公室人体胶水，哪里裂开粘哪里，还顺手把气氛擦亮。', '你最大的问题是太会补位，补着补着大家都默认你就是地板。', '别最后通知他还指望他兜底，他会笑着补洞，心里记账。', 'glue'],
    ENFJ: ['鸡血传销头子', '你能把一群没电的人强行拉起来营业，像团队专用充电桩。', '你擅长把目标讲得像集结号，让散装同事临时拥有队形。', '你最累的地方是：别人负责坐车，你负责开车、修车、喊口号。', '别一边没目标一边要士气，他会像给没电团队人工发电。', 'leader'],
    ENTJ: ['KPI独裁官', '你不是强势，你是看见机会被流程腌入味就想掀桌。', '你擅长定方向、抢窗口、做取舍，把一地鸡毛排成战术地图。', '你最有压迫感的瞬间：你开始分工，连沉默都要有 owner。', '别拿“感觉可以”糊弄他，他会把感觉按进风险清单。', 'crown']
  };

  var avatarClasses = ['judge', 'angel', 'mystic', 'robot', 'tool', 'artist', 'dream', 'detective', 'fire', 'spark', 'rocket', 'debate', 'commander', 'glue', 'leader', 'crown'];

  var resultExtras = {
    ISTJ: [92, '你不是守规矩，你是看见混乱还没死透就想补一刀。', '别让我听见“随便弄弄”，我会当场闻到事故味。'],
    ISFJ: [88, '你的善良有点危险，因为别人真的会拿它当公共资源。', '别再说我好说话，我只是还没学会翻脸。'],
    INFJ: [90, '你不是敏感，你是别人刚开口，你已经读到免责声明。', '我不说话，不代表我没看穿，只是懒得当场拆台。'],
    INTJ: [94, '你不是高冷，你是对无效热闹有生理性排异。', '空话别靠近我，我会自动把你静音。'],
    ISTP: [84, '你不是不合群，你只是觉得很多会开完还不如原地断网。', '平时别找我聊天，出事可以召唤。'],
    ISFP: [82, '你不是挑剔，你是看见糊弄学就想报警。', '别拿糊弄方案给我看，我的眼睛有审核功能。'],
    INFP: [89, '你不是玻璃心，你是对“没有意义但很急”这类话术过敏。', '没有意义的活别硬塞，我会边做边枯萎。'],
    INTP: [93, '你不是在发呆，你是在给这套逻辑写死亡证明。', '“大家都这么觉得”不是证据，是我开拆的信号。'],
    ESTP: [86, '你不是冲动，你是看见火场就觉得终于轮到自己上班。', '越乱我越精神，和平时期反而困。'],
    ESFP: [80, '你不是爱热闹，你是在给已经凉了的场面强行续命。', '我负责救冷场，但不负责替所有人有趣。'],
    ENFP: [91, '你不是不稳定，你是脑洞太吵，工位隔音太差。', '给我一个普通需求，我能脑补出三季连续剧。'],
    ENTP: [95, '你不是抬杠，你是专门让烂方案当众掉漆的人。', '我说话扎心，但烂方案更该疼。'],
    ESTJ: [96, '你最吓人的地方是：任务刚失控三秒，你已经想给每个人贴责任条。', '没人负责的任务别放我面前，我会让全场都有名字。'],
    ESFJ: [87, '你不是爱管事，你是看不得一群人把烂摊子传成接力棒。', '最后通知我，还想让我第一个救火，这很职场。'],
    ENFJ: [90, '你不是鸡血，你是看见团队没电就想人工发电。', '团队没电就找我，找多了我也会漏电。'],
    ENTJ: [97, '你不是强势，你是看见机会被流程腌入味就想掀桌。', '我一接管现场，空气都别想无责飘过。']
  };

  var state = {
    currentIndex: 0,
    answers: []
  };

  var homeScreen = document.getElementById('homeScreen');
  var quizScreen = document.getElementById('quizScreen');
  var resultScreen = document.getElementById('resultScreen');
  var startBtn = document.getElementById('startBtn');
  var backBtn = document.getElementById('backBtn');
  var restartBtn = document.getElementById('restartBtn');
  var progressText = document.getElementById('progressText');
  var progressBar = document.getElementById('progressBar');
  var questionTitle = document.getElementById('questionTitle');
  var questionTag = document.getElementById('questionTag');
  var questionMeme = document.getElementById('questionMeme');
  var options = document.getElementById('options');

  function showScreen(screen) {
    [homeScreen, quizScreen, resultScreen].forEach(function (item) {
      item.classList.remove('is-active');
    });
    screen.classList.add('is-active');
  }

  function renderQuestion() {
    var question = questions[state.currentIndex];
    var progress = ((state.currentIndex + 1) / questions.length) * 100;
    progressText.textContent = String(state.currentIndex + 1).padStart(2, '0') + ' / ' + questions.length;
    progressBar.style.width = progress + '%';
    questionTitle.textContent = question.text;
    questionTag.textContent = question.tag;
    questionMeme.textContent = question.meme;
    backBtn.disabled = state.currentIndex === 0;
    options.textContent = '';

    question.options.forEach(function (option, optionIndex) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'option-btn';
      if (state.answers[state.currentIndex] === option.dimension) {
        button.classList.add('is-selected');
      }
      var marker = document.createElement('span');
      marker.className = 'option-marker';
      marker.textContent = optionIndex === 0 ? 'A' : 'B';
      var label = document.createElement('span');
      label.textContent = option.text;
      button.appendChild(marker);
      button.appendChild(label);
      button.addEventListener('click', function () {
        state.answers[state.currentIndex] = option.dimension;
        button.classList.add('is-selected');
        window.setTimeout(function () {
          if (state.currentIndex < questions.length - 1) {
            state.currentIndex += 1;
            renderQuestion();
          } else {
            renderResult();
          }
        }, 180);
      });
      options.appendChild(button);
    });
  }

  function calculateType() {
    var pairs = [
      ['E', 'I'],
      ['S', 'N'],
      ['T', 'F'],
      ['J', 'P']
    ];
    return pairs.map(function (pair) {
      var first = state.answers.filter(function (answer) { return answer === pair[0]; }).length;
      var second = state.answers.filter(function (answer) { return answer === pair[1]; }).length;
      return first >= second ? pair[0] : pair[1];
    }).join('');
  }

  function renderResult() {
    var type = calculateType();
    var result = results[type] || results.ENFP;
    document.getElementById('resultType').textContent = type;
    document.getElementById('resultName').textContent = result[0];
    document.getElementById('resultPunchline').textContent = result[1];
    document.getElementById('resultPower').textContent = result[2];
    document.getElementById('resultCrash').textContent = result[3];
    document.getElementById('resultManual').textContent = result[4];
    var extra = resultExtras[type] || resultExtras.ENFP;
    document.getElementById('breakScore').textContent = extra[0] + '%';
    document.getElementById('breakBar').style.width = extra[0] + '%';
    document.getElementById('resultVerdict').textContent = extra[1];
    document.getElementById('shareQuote').textContent = extra[2];
    var avatar = document.getElementById('resultAvatar');
    avatar.className = 'result-avatar avatar-' + (avatarClasses.indexOf(result[5]) > -1 ? result[5] : 'spark');
    document.getElementById('resultAvatarCode').textContent = type;
    showScreen(resultScreen);
  }

  startBtn.addEventListener('click', function () {
    state.currentIndex = 0;
    state.answers = [];
    renderQuestion();
    showScreen(quizScreen);
  });

  backBtn.addEventListener('click', function () {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  });

  restartBtn.addEventListener('click', function () {
    state.currentIndex = 0;
    state.answers = [];
    renderQuestion();
    showScreen(quizScreen);
  });

  window.workplaceMbtiDrafts = quizDrafts;
}());
