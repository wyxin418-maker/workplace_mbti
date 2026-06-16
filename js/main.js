(function () {
  'use strict';

  var quizDrafts = {
    direction: '保留标准MBTI四维度，只选择性吸收“纯职场场景、强冲突二选一、打工人黑话”的表达方式。',
    rejected: '不改成自创W/M/R/K/G/X/Z/L体系，不直接使用过激或攻击性人格标签。',
    final: '正式版采用12题，结果仍输出标准E/I、S/N、T/F、J/P，并搭配原创工位人格称号。'
  };

  var questions = [
    {
      tag: '会议开麦',
      meme: '谁来救场',
      text: '全员大会突然冷场，领导眼神开始扫射，你的真实反应是？',
      options: [
        { text: '先开麦把空气救活，观点可以再修，场子不能死。', dimension: 'E' },
        { text: '低头研究文档，祈祷摄像头和领导都忘了我。', dimension: 'I' }
      ]
    },
    {
      tag: '跨部门拉扯',
      meme: '这锅谁背',
      text: '跨部门丢来一个“不归你管但很急”的活，你会？',
      options: [
        { text: '拉群对齐边界，谁负责、谁排期、谁拍板一次说清。', dimension: 'E' },
        { text: '先私下梳理影响，再找最少的人把事情谈明白。', dimension: 'I' }
      ]
    },
    {
      tag: '露脸机会',
      meme: '上台还是下线',
      text: '有对外宣讲/汇报露脸机会，你的身体会？',
      options: [
        { text: '冲，曝光就是职场经验条，不刷白不刷。', dimension: 'E' },
        { text: '能推就推，最怕聚光灯照出我的工位阴影。', dimension: 'I' }
      ]
    },
    {
      tag: '方案落地',
      meme: '饼别太大',
      text: '领导给两套方案：一个立刻见效，一个长期创新但风险高，你先看？',
      options: [
        { text: '能不能落地、多久见效、资源够不够，先别拿愿景盖坑。', dimension: 'S' },
        { text: '有没有新机会、能不能破局、未来空间多大，先把天花板掀开。', dimension: 'N' }
      ]
    },
    {
      tag: '工作报告',
      meme: '数据还是故事',
      text: '写工作报告时，你最想让老板看到什么？',
      options: [
        { text: '完成数据、交付成果、风险闭环，少讲虚的。', dimension: 'S' },
        { text: '趋势判断、创新路径、下一阶段想象空间，格局打开。', dimension: 'N' }
      ]
    },
    {
      tag: '项目卡壳',
      meme: '补洞还是拆楼',
      text: '项目卡住时，你脑内第一条弹幕是？',
      options: [
        { text: '先找现成办法把洞补上，别让问题继续漏水。', dimension: 'S' },
        { text: '干脆重构底层逻辑，不然下次还在同一坑摔倒。', dimension: 'N' }
      ]
    },
    {
      tag: '追责现场',
      meme: '锅别乱飞',
      text: '团队出错，责任一团乱，领导开始追问，你会？',
      options: [
        { text: '按事实切责任，结论不靠嗓门靠证据。', dimension: 'T' },
        { text: '先稳住大家情绪，别让解决问题变成互相伤害。', dimension: 'F' }
      ]
    },
    {
      tag: '晋升撞车',
      meme: '朋友也要卷',
      text: '评优晋升只剩一个名额，你和关系好的同事撞上了，你会？',
      options: [
        { text: '正常展示业绩，公平竞争不是背刺，是成年人规则。', dimension: 'T' },
        { text: '嘴上说公平，心里已经开始不忍心赢得太明显。', dimension: 'F' }
      ]
    },
    {
      tag: '临时请假',
      meme: '别默认我行',
      text: '同事临时请假，大量工作自然滑到你桌上，你的第一反应是？',
      options: [
        { text: '先确认优先级和交接边界，不能默认我无限兜底。', dimension: 'T' },
        { text: '先扛下来，怕对方被为难，也怕事情真的炸。', dimension: 'F' }
      ]
    },
    {
      tag: '截止日期',
      meme: '提前还是压线',
      text: '面对截止日期，你的工位人格更像？',
      options: [
        { text: '提前两天交付，给突发留缓冲，给自己留体面。', dimension: 'J' },
        { text: '截止日前集中爆发，灵魂压线但结果不掉线。', dimension: 'P' }
      ]
    },
    {
      tag: '假装加班',
      meme: '人设还是下班',
      text: '下班前没紧急任务，但周围都在表演忙碌，你会？',
      options: [
        { text: '再整理点明天计划，收尾做漂亮，明天不慌张。', dimension: 'J' },
        { text: '本职做完就撤，形式加班不配偷走我的夜晚。', dimension: 'P' }
      ]
    },
    {
      tag: '半夜改需求',
      meme: '私人时间保卫战',
      text: '半夜突然来了句“需求有个小变化”，你的第一反应是？',
      options: [
        { text: '立刻评估影响范围，能闭环就别让明天爆雷。', dimension: 'J' },
        { text: '先判断是否真紧急，非紧急明天上班统一处理。', dimension: 'P' }
      ]
    }
  ];

  var results = {
    ISTJ: ['流程镇魂师', '你不是来上班的，你是来给混乱开追悼会的。', '别人眼里的“差不多”，在你这里会被打回重做三次。只要你坐镇，项目文档像刚军训完一样整齐。', '犀利短板：你看见临时变更就像看见野生 BUG，表面冷静，内心已经把需求方拖进流程审判庭。', '适配项目管理、流程运营、质量把控；合作时请给明确目标和边界，别拿玄学需求考验他。', 'judge'],
    ISFJ: ['工位守护神', '你嘴上说“我没事”，背后已经默默把团队从悬崖边拽回三次。', '你像办公室隐藏血包，哪里漏水补哪里，哪里冒烟扑哪里，还顺手安慰起火的人。', '犀利短板：你的“不麻烦”会被别人听成“可以继续麻烦”，最后工位变成公益服务台。', '适配用户运营、行政支持、客户服务；同事请及时感谢，也别把他的善良当自动续费服务。', 'angel'],
    INFJ: ['人间说明书', '你安静得像在加载，其实已经把全场动机、情绪和潜台词读成了连续剧。', '你能把一团乱麻翻译成人话，还能顺手指出这团麻为什么从源头就拧巴。', '犀利短板：你太会读空气，读到最后空气没事，你先缺氧。', '适配用户研究、组织协同、品牌内容；请讲清意义，不要只派活，不然他会在心里写辞职小作文。', 'mystic'],
    INTJ: ['战略冷启动', '你不是不合群，你是在脑内给公司装一套新操作系统。', '别人讨论下一步，你已经推演到第七步塌方点，并顺手准备了备用宇宙。', '犀利短板：你不是讨厌人类，你只是讨厌没带脑子来开会的人类。', '适配策略规划、产品设计、技术方案；带问题和备选项来聊，别只带一句“你怎么看”。', 'robot'],
    ISTP: ['沉默修Bug侠', '你像办公室里的维修模式，平时隐身，系统炸了才会被全员召唤。', '你不爱喊口号，但真出事时，别人还在截图发群，你已经开始拆炸弹。', '犀利短板：你对废话过敏，会议多讲五分钟，你的灵魂就少一格电。', '适配技术支持、系统运维、工具效率；给他操作空间，少给废话，他会自己把洞补上。', 'tool'],
    ISFP: ['氛围质检员', '你对“不对劲”的感知像烟雾报警器，别人还在鼓掌，你已经闻到糊味。', '你能把粗糙交付物揉出质感，让一个“能用”的东西终于像个人做的。', '犀利短板：你不是难搞，你只是无法对丑东西睁一只眼闭一只眼。', '适配设计、内容、体验优化；给方向和空间，他能把普通任务做出一点灵魂。', 'artist'],
    INFP: ['理想续航站', '你不是想太多，你是在工位废墟里偷偷养一盆名叫“意义”的花。', '你能把冰冷任务讲出人味，也能在一堆 KPI 里找到一点值得坚持的光。', '犀利短板：你最怕任务没有灵魂，但职场最爱发没有灵魂的任务。', '适配内容策划、用户沟通、文化项目；告诉他为什么值得做，他会认真到发光。', 'dream'],
    INTP: ['逻辑拆弹员', '你看似在摸鱼，其实大脑后台正在把需求拆成可疑零件。', '伪逻辑、假共识、拍脑袋方案，在你面前像穿了荧光裤，藏都藏不住。', '犀利短板：你一沉默不是默认，是正在给对方的逻辑写事故报告。', '适配数据分析、策略研究、技术架构；给足上下文和思考时间，他会交出很难反驳的答案。', 'detective'],
    ESTP: ['现场救火队长', '别人还在建群命名，你已经拎着灭火器冲进需求火场。', '你天生适合混乱现场，越紧急越兴奋，越烫手越想亲自摸一下。', '犀利短板：你太爱现场开冲，偶尔会把“先别急”听成发令枪。', '适配商务谈判、现场运营、应急处理；给目标和权限，别用流程把他五花大绑。', 'fire'],
    ESFP: ['气氛续命官', '你一开口，会议室低气压就像被迫下班。', '你能把尴尬从地板缝里抠出来，再包装成“大家继续推进”的台阶。', '犀利短板：没人接梗时，你的快乐会当场离职，还不走交接。', '适配活动运营、社群沟通、前台协同；需要救场时直接说，他能把冷场改成小型综艺。', 'spark'],
    ENFP: ['灵感永动机', '你的脑洞像工作群弹窗，关不掉，但偶尔真的能救命。', '你能把一件普通任务讲成宇宙级企划，把沉闷项目点成烟花。', '犀利短板：你不是没计划，你的计划只是经常在半路长出翅膀飞走。', '适配创意策划、品牌传播、用户增长；先让他发散，再一起把烟花装进发射筒。', 'rocket'],
    ENTP: ['需求反杀王', '你不是杠，你是在给方案做工伤级压力测试。', '任何“大家都这么做”的方案，到了你这里都要先过一遍灵魂拷打。', '犀利短板：你开口前是讨论，开口后像方案上了辩论赛刑场。', '适配创新业务、策略讨论、产品探索；欢迎挑战，但要约定结论时间，不然会议会进化成脱口秀。', 'debate'],
    ESTJ: ['进度条总指挥', '你一出现，散装任务会自动排队，连空气都想写周报。', '你擅长把“差不多”打成“明确负责人+截止时间+验收标准”。', '犀利短板：你不是压迫感强，你只是看不得任务像无主流浪猫一样到处乱跑。', '适配团队管理、项目运营、交付负责人；给事实和节点，他能把烂摊子排成队。', 'commander'],
    ESFJ: ['团队黏合剂', '你嘴上说“我来协调”，背后已经把三个人情绪、两条流程和一个烂摊子缝起来了。', '你像办公室人体胶水，哪里裂开粘哪里，还顺手把气氛擦亮。', '犀利短板：你最容易被“大家都不容易”绑架，绑着绑着发现只有你在搬砖。', '适配团队运营、客户成功、活动统筹；请及时同步变化，别让他最后一个知道还要第一个救火。', 'glue'],
    ENFJ: ['共识发动机', '你能把一群“先别急”的人，带到“那就干吧”，像给团队装了点火器。', '你擅长把目标讲得像集结号，让散装同事临时拥有队形。', '犀利短板：你太想把所有人带上车，最后容易变成一边开车一边修车一边鼓掌。', '适配组织发展、项目统筹、品牌运营；讲清目标和影响，他会把大家从散装拉成整队。', 'leader'],
    ENTJ: ['战役操盘手', '你不是强势，你是看不得机会在流程里慢慢过期。', '你擅长定方向、抢窗口、做取舍，把一地鸡毛排成战术地图。', '犀利短板：你一旦接管现场，连空气都可能被分配 KPI。', '适配管理岗、业务负责人、增长策略；准备数据、方案和风险，他会快速拍板并推动落地。', 'crown']
  };

  var avatarClasses = ['judge', 'angel', 'mystic', 'robot', 'tool', 'artist', 'dream', 'detective', 'fire', 'spark', 'rocket', 'debate', 'commander', 'glue', 'leader', 'crown'];

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
