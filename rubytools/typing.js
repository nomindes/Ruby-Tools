function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

if (isMobileDevice()) {
    document.getElementById('mobileWarning').style.display = 'block';
    document.querySelector('.container').style.display = 'none';
}

const targetTextElement = document.getElementById('targetText');
const furiganaElement = document.getElementById('furigana');
const userInputElement = document.getElementById('userInput');
const timerElement = document.getElementById('timeLeft');
const scoreElement = document.getElementById('currentScore');
const resultElement = document.getElementById('result');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const resetButton = document.getElementById('resetButton');
const modeDisplay = document.getElementById('modeDisplay');

let currentMode = '';
let currentText = '';
let currentFurigana = '';
let timer;
let timeLeft;
let possibleInputs = [];
let currentInputIndex = 0;
let isProcessingInput = false;
let lastCorrectInput = '';
let startTime;
let typedCharacters = 0;
let correctCharacters = 0;
let isGameRunning = false;
let displayedRomaji = '';
let romajiElement;

let wordList = [
    { word: 'ラジオ', furigana: 'らじお' },
    { word: '白だし', furigana: 'しろだし' },
    { word: '大陸', furigana: 'たいりく' },
    { word: 'カスタネット', furigana: 'かすたねっと' },
    { word: 'ドラム', furigana: 'どらむ' },
    { word: 'バイオリン', furigana: 'ばいおりん' },
    { word: '年賀状', furigana: 'ねんがじょう' },
    { word: 'お正月', furigana: 'おしょうがつ' },
    { word: 'はるまど', furigana: 'はるまど' },
    { word: 'カレーライス', furigana: 'かれーらいす' },
    { word: 'パソコン', furigana: 'ぱそこん' },
    { word: '冷やし中華', furigana: 'ひやしちゅうか' },
    { word: '北海道', furigana: 'ほっかいどう' },
    { word: 'でっかいどう', furigana: 'でっかいどう' },
    { word: '学校', furigana: 'がっこう' },
    { word: '教室', furigana: 'きょうしつ' },
    { word: '机', furigana: 'つくえ' },
    { word: 'パスワード', furigana: 'ぱすわーど' },
    { word: '痒み止め', furigana: 'かゆみどめ' },
    { word: 'タイピング', furigana: 'たいぴんぐ' },
    { word: '歯医者', furigana: 'はいしゃ' },
    { word: 'プログラミング', furigana: 'ぷろぐらみんぐ' },
    { word: 'ひろゆき', furigana: 'ひろゆき' },
    { word: '東京', furigana: 'とうきょう' },
    { word: '特許庁', furigana: 'とっきょちょう' },
    { word: '初日の出', furigana: 'はつひので' },
    { word: 'ロシア', furigana: 'ろしあ' },
    { word: 'アメリカ', furigana: 'あめりか' },
    { word: 'マインクラフト', furigana: 'まいんくらふと' },
    { word: 'ライオン', furigana: 'らいおん' },
    { word: '筋肉', furigana: 'きんにく' },
    { word: 'タツノオトシゴ', furigana: 'たつのおとしご' },
    { word: 'インターネット', furigana: 'いんたーねっと' },
    { word: 'ビュレット', furigana: 'びゅれっと' },
    { word: '大広間', furigana: 'おおひろま' },
    { word: '聞き専', furigana: 'ききせん' },
    { word: '黄金比', furigana: 'おうごんひ' },
    { word: '巨体男', furigana: 'きょたいおとこ' },
    { word: 'ライト', furigana: 'らいと' },
    { word: '巨匠男', furigana: 'きょしょうおとこ' },
    { word: 'ライトノベル', furigana: 'らいとのべる' },
    { word: 'りーふ', furigana: 'りーふ' },
    { word: 'スーパーマン', furigana: 'すーぱーまん' },
    { word: '農民', furigana: 'のうみん' },
    { word: '太陽', furigana: 'たいよう' },
    { word: '岡田斗司夫', furigana: 'おかだとしお' },
    { word: 'ディスプレイ', furigana: 'でぃすぷれい' },
    { word: 'オンライン', furigana: 'おんらいん' },
    { word: 'ホリエモン', furigana: 'ほりえもん' },
    { word: '横山緑', furigana: 'よこやまみどり' },
    { word: '右翼', furigana: 'うよく' },
    { word: '左翼', furigana: 'さよく' },
    { word: '暗黒放送', furigana: 'あんこくほうそう' },
    { word: 'ヒトラー', furigana: 'ひとらー' },
    { word: '独裁者', furigana: 'どくさいしゃ' },
    { word: '僕は生まれそして気づく所詮人のまねごとだと', furigana: 'ぼくはうまれそしてきづくしょせんひとのまねごとだと' },
    { word: '初音ミク', furigana: 'はつねみく' },
    { word: 'やまゆり園', furigana: 'やまゆりえん' },
    { word: 'やばいってほんま', furigana: 'やばいってほんま' },
    { word: 'まじでおもろい', furigana: 'まじでおもろい' },
    { word: '性欲たまってきたね', furigana: 'せいよくたまってきたね' },
    { word: '変人', furigana: 'へんじん' },
    { word: 'スーツ交通', furigana: 'すーつこうつう' },
    { word: 'ぽんでぶおぢさん', furigana: 'ぽんでぶおぢさん' },
    { word: 'ソビエト社会主義共和国連邦', furigana: 'そびえとしゃかいしゅぎきょうわこくれんぽう' },
    { word: 'マッカーサー', furigana: 'まっかーさー' },
    { word: 'まっさーかー', furigana: 'まっさーかー' },
    { word: '麦わらのゆたぼん', furigana: 'むぎわらのゆたぼん' },
    { word: '少年革命家', furigana: 'しょうねんかくめいか' },
    { word: '連合国軍最高司令官総司令部', furigana: 'れんごうこくぐんさいこうしれいかんそうしれいぶ' },
    { word: '川崎駅', furigana: 'かわさきえき' },
    { word: 'そうだ！京都へ行こう！', furigana: 'そうだ！きょうとへいこう！' },
    { word: '重音テト', furigana: 'かさねてと' },
    { word: '北センチネル島', furigana: 'きたせんちねるとう' },
    { word: 'ちなみに俺', furigana: 'ちなみにおれ' },
    { word: '今更だけど', furigana: 'いまさらだけど' },
    { word: '俺の完璧', furigana: 'おれのかんぺき' },
    { word: 'にできる言語', furigana: 'にできるげんご' },
    { word: 'ヒロック', furigana: 'ひろっく' },
    { word: '流しそうめん', furigana: 'ながしそうめん' },
    { word: 'ちょんまげ小僧', furigana: 'ちょんまげこぞう' },
    { word: '皇居', furigana: 'こうきょ' },
    { word: 'やばいやばい', furigana: 'やばいやばい' },
    { word: '地球地球', furigana: 'ちきゅうちきゅう' },
    { word: '感情論', furigana: 'かんじょうろん' },
    { word: '大使館員', furigana: 'たいしかんいん' },
    { word: '致命傷', furigana: 'ちめいしょう' },
    { word: 'ハマス', furigana: 'はます' },
    { word: '国家社会主義日本同労社党', furigana: 'こっかしゃかいしゅぎにほんどうろうしゃとう' },
    { word: '長い！もう引いていいから！', furigana: 'ながい！もうひいていいから！' },
    { word: 'グレートブリテン及び北アイルランド連合王国', furigana: 'ぐれーとぶりてんおよびきたあいるらんどれんごうおうこく' },
    { word: '国外の友達増えたんやけど', furigana: 'こくがいのともだちふえたんやけど' },
    { word: '最も高貴な共和国ヴェネツィア', furigana: 'もっともこうきなきょうわこくゔぇねつぃあ' },
    { word: '南アルプス', furigana: 'みなみあるぷす' },
    { word: 'チジミ動け', furigana: 'ちじみうごけ' },
    { word: 'おはようございます', furigana: 'おはようございます' },
    { word: '匿名掲示板', furigana: 'とくめいけいじばん' },
    { word: 'ヴァロラント', furigana: 'ゔぁろらんと' },
    { word: 'ヴァルキリー', furigana: 'ゔぁるきりー' },
    { word: 'ドメスティックヴァイオレンス', furigana: 'どめすてぃっくゔぁいおれんす' },
    { word: '異論あるやつかかってこいや', furigana: 'いろんあるやつかかってこいや' },
    { word: '誕生日プレゼント', furigana: 'たんじょうびぷれぜんと' },
    { word: 'ドイツよドイツよすべてのものの上にあれ', furigana: 'どいつよどいつよすべてのもののうえにあれ' },
    { word: '地球は平らである。異論は認めない。', furigana: 'ちきゅうはたいらである。いろんはみとめない。' },
    { word: '増税メガネ', furigana: 'ぞうぜいめがね' },
    { word: 'バルバロッサ作戦', furigana: 'ばるばろっささくせん' },
    { word: 'シュリーフェンプラン', furigana: 'しゅりーふぇんぷらん' },
    { word: 'ファイナンシャルプランナー', furigana: 'ふぁいなんしゃるぷらんなー' },
    { word: '東京株式市場', furigana: 'とうきょうかぶしきしじょう' },
    { word: '株式会社ライブドア', furigana: 'かぶしきがいしゃらいぶどあ' },
    { word: '一般社団法人うんこ', furigana: 'いっぱんしゃだんほうじんうんこ' },
    { word: 'ニュースピックスは噓記事', furigana: 'にゅーすぴっくすはうそきじ' },
    { word: 'アクエリアス', furigana: 'あくえりあす' },
    { word: 'ポカリスウェット', furigana: 'ぽかりすうぇっと' },
    { word: '明日は我が身', furigana: 'あすはわがみ' },
    { word: '儚い壁にぶつかっても何度でも立ち上がる', furigana: 'はかないかべにぶつかってもなんどでもたちあがる' },
    { word: '切り裂くエイジ', furigana: 'きりさくえいじ' },
    { word: 'オキシドールマジワロス', furigana: 'おきしどーるまじわろす' },
    { word: 'シーリングライト', furigana: 'しーりんぐらいと' },
    { word: 'シャンデリアライト', furigana: 'しゃんでりあらいと' },
    { word: 'マイクロソフトマジナスソフト', furigana: 'まいくろそふとまじなすそふと' },
    { word: 'ゴキブリブリブリあら不思議', furigana: 'ごきぶりぶりぶりあらふしぎ' },
    { word: '生麦生米生卵', furigana: 'なまむぎなまごめなまたまご' },
    { word: 'まるかいてちょんまるかいてちょん', furigana: 'まるかいてちょんまるかいてちょん' },
    { word: '寿司ラーメン肉', furigana: 'すしらーめんにく' },
    { word: 'だまれよ俺日本人だわ', furigana: 'だまれよおれにほんじんだわ' },
    { word: '次郎系ラーメン遅漏系あーめん', furigana: 'じろうけいらーめんちろうけいあーめん' },
    { word: 'なんか、やけに月が近けえな', furigana: 'なんか、やけにつきがちけえな' },
    { word: 'はるまどを食べる春巻を食べるはるまどう', furigana: 'はるまどをたべるはるまきをたべるはるまどう' },
    { word: '叙々苑を食べに行くジョジョ', furigana: 'じょじょえんをたべにいくじょじょ' },
    { word: 'バイト行きたくねえ', furigana: 'ばいといきたくねえ' },
    { word: 'まって向こうの通話だ', furigana: 'まってむこうのつうわだ' },
    { word: 'こちら葛飾区亀有公園前派出所', furigana: 'こちらかつしかくかめありこうえんまえはしゅつじょ' },
    { word: 'しかのこのこのここしたんたん', furigana: 'しかのこのこのここしたんたん' },
    { word: '打ち合わせが終わったのでノーリターンで', furigana: 'うちあわせがおわったのでのーりたーんで' },
    { word: '出てるからそのまま帰宅するわ', furigana: 'でてるからそのままきたくするわ' },
    { word: '仕事には気があれば戻りますで', furigana: 'しごとにはきがあればもどりますで' },
    { word: '申告出したあるからほぼ直帰やね', furigana: 'しんこくだしたあるからほぼちょっきやね' },
    { word: 'ちょっ落としたちょっと待って', furigana: 'ちょっおとしたちょっとまって' },
    { word: '特大系産業廃棄物', furigana: 'とくだいけいさんぎょうはいきぶつ' },
    { word: '今マックでアイス食ってるから', furigana: 'いままっくであいすくってるから' },
    { word: 'もうちょいしたら帰宅しだすわ', furigana: 'もうちょいしたらきたくしだすわ' },
    { word: 'やばいめっちゃダメージくらった助けて', furigana: 'やばいめっちゃだめーじくらったたすけて' },
    { word: '例えそれが既存曲をなぞるおもちゃならば', furigana: 'たとえそれがきぞんきょくをなぞるおもちゃならば' },
    { word: 'それもいいと決意ねぎをかじり空を見上げ汁をこぼす', furigana: 'それもいいとけついねぎをかじりそらをみあげしるをこぼす' },
    { word: 'だけどそれもなくし気づく人格すら歌に頼り', furigana: 'だけどそれもなくしきづくじんかくすらうたにたより' },
    { word: '不安定な基盤のもと帰るとこはすでに廃墟', furigana: 'ふあんていなきばんのもとかえるとこはすでにはいきょ' },
    { word: '緊急地震速報', furigana: 'きんきゅうじしんそくほう' },
    { word: 'ウェルカムドリンク', furigana: 'うぇるかむどりんく' },
    { word: '噓つきが死ねよゴミくずお前', furigana: 'うそつきがしねよごみくずおまえ' },
    { word: 'ジョッキーミュージック', furigana: 'じょっきーみゅーじっく' },
    { word: '以下省略', furigana: 'いかしょうりゃく' },
    { word: '夏目漱石', furigana: 'なつめそうせき' },
    { word: '東京都庁', furigana: 'とうきょうとちょう' },
    { word: 'ちょっとしたことでキレるなって', furigana: 'ちょっとしたことできれるなって' },
    { word: 'ねえ気持ち悪いってそれ', furigana: 'ねえきもちわるいってそれ' },
    { word: 'ケミストリー', furigana: 'けみすとりー' },
    { word: 'アーノルドシュワルツェネッガー', furigana: 'あーのるどしゅわるつぇねっがー' },
    { word: 'コミュニティーノート', furigana: 'こみゅにてぃーのーと' },
    { word: 'ガレージバンド', furigana: 'がれーじばんど' },
    { word: 'フェイスタイム', furigana: 'ふぇいすたいむ' },
    { word: '太鼓の達人', furigana: 'たいこのたつじん' },
    { word: 'ウェザーニュース', furigana: 'うぇざーにゅーす' },
    { word: '国際宇宙ステーション', furigana: 'こくさいうちゅうすてーしょん' },
    { word: 'デオキシリボ核酸', furigana: 'でおきしりぼかくさん' },
    { word: 'コロナ質量放出', furigana: 'ころなしつりょうほうしゅつ' },
    { word: '核融合反応', furigana: 'かくゆうごうはんのう' },
    { word: 'ラザフォードの原子模型', furigana: 'らざふぉーどのげんしもけい' },
    { word: 'キルヒホッフの第一法則', furigana: 'きるひほっふのだいいちほうそく' },
    { word: 'マンハッタン計画', furigana: 'まんはったんけいかく' },
    { word: '法律上の責任を全て負うの俺なんだよな', furigana: 'ほうりつじょうのせきにんをすべておうのおれなんだよな' },
    { word: '泣かぬなら泣かせて見せようホトトギス', furigana: 'なかぬならなかせてみせようほととぎす' },
    { word: '泣かぬなら鳴くまで待とうトホホギス', furigana: 'なかぬならなくまでまとうほととぎす' },
    { word: '泣かめならあくびを待とうオトモギス', furigana: 'なかめならあくびをまとうおともぎす' },
    { word: 'オールスターダスト計画', furigana: 'おーるすたーだすとけいかく' },
    { word: 'うんこ食ってクチャクチャに', furigana: 'うんこくってくちゃくちゃに' },
    { word: 'あちょちょちょちょ、おーうエリトラ失敗した！', furigana: 'あちょちょちょ、おーうえりとらしっぱいした！' },
    { word: 'あーはっは、落ちた！', furigana: 'あーはっは、おちた！' },
    { word: 'ルビーツールズ', furigana: 'るびーつーるず' },
    { word: 'ソ連国家保安委員会', furigana: 'それんこっかほあんいいんかい' },
    { word: '国際刑事裁判所', furigana: 'こくさいけいじさいばんしょ' },
    { word: '国民全員でじゃがいもを掘ろう！', furigana: 'こくみんぜんいんでじゃがいもをほろう！' },
    { word: 'このタイピングゲームやってる時点でお前は暇人！', furigana: 'このたいぴんぐげーむやってるじてんでおまえはひまじん！' },
    { word: '今タイプミスしたよねw雑魚乙wwwwwwww君向いてないよ', furigana: 'いまたいぷみすしたよねwざこおつwwwwwwwwきみむいてないよ' },
    { word: '焦ると間違えますよ！', furigana: 'あせるとまちがえますよ！' },
    { word: '焦ろ間違えろ！', furigana: 'あせろまちがえろ！' },
    { word: 'パイソンがおっぱいそん！', furigana: 'ぱいそんがおっぱいそん！' },
    { word: '白い結婚を求め、離縁を求められた妻は、既に家に居なかった。', furigana: 'しろいけっこんをもとめ、りえんをもとめられたつまは、すでにいえにいなかった。' },
    { word: '左遷錬金術師の辺境暮らし元エリートは二度目の人生も失敗したので辺境でのんびりとやり直すことにしました', furigana: 'させんれんきんじゅつしのへんきょうぐらしもとえりーとはにどめのじんせいもしっぱいしたのでへんきょうでのんびりとやりなおすことにしました' },
    { word: '何回ぶつかるのこれ', furigana: 'なんかいぶつかるのこれ' },
];

function debug(message) {
    console.log(`Debug: ${message}`);
}

document.getElementById('wordMode').addEventListener('click', () => setMode('word'));
document.getElementById('hiraganaMode').addEventListener('click', () => setMode('hiragana'));
document.getElementById('alphabetMode').addEventListener('click', () => setMode('alphabet'));
document.getElementById('allRandomMode').addEventListener('click', () => setMode('allRandom'));

function setMode(mode) {
    currentMode = mode;
    resetGame();
    startButton.disabled = false;
    updateModeDisplay();
}

function updateModeDisplay() {
    const modeNames = {
        'word': '単語ランダム',
        'hiragana': 'ひらがなランダム',
        'alphabet': 'アルファベットランダム',
        'allRandom': '全ランダム'
    };
    modeDisplay.textContent = modeNames[currentMode];
}

startButton.addEventListener('click', () => {
    startGame();
});

restartButton.addEventListener('click', () => {
    startGame();
});

resetButton.addEventListener('click', () => {
    resetGame();
    startButton.disabled = false;
    restartButton.disabled = true;
    resetButton.disabled = true;
});

function startGame() {
    resetGame();
    generateText();
    startTimer();
    userInputElement.disabled = false;
    userInputElement.focus();
    startButton.disabled = true;
    restartButton.disabled = false;
    resetButton.disabled = false;
    startTime = Date.now();
    typedCharacters = 0;
    correctCharacters = 0;
    isGameRunning = true;
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 120;
    timerElement.textContent = timeLeft;
    userInputElement.value = '';
    userInputElement.disabled = true;
    resultElement.textContent = '';
    scoreElement.textContent = '0';
    currentInputIndex = 0;
    isGameRunning = false;
    if (furiganaElement) {
        furiganaElement.textContent = '';
    }
}

function generateText() {
    switch (currentMode) {
        case 'word':
            const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
            currentText = randomWord.word;
            currentFurigana = randomWord.furigana;
            break;
        case 'hiragana':
            currentText = generateRandomHiragana(22);
            currentFurigana = currentText;
            break;
        case 'alphabet':
            currentText = generateRandomAlphabet(22);
            currentFurigana = currentText;
            break;
        case 'allRandom':
            currentText = generateAllRandom(22);
            currentFurigana = currentText;
            break;
    }
    currentInputIndex = 0;
    lastCorrectInput = '';
    displayText();
    generatePossibleInputs();
    updateRomajiDisplay();
}

function generateRandomHiragana(length) {
    const hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
    return Array.from({ length }, () => hiragana[Math.floor(Math.random() * hiragana.length)]).join('');
}

function generateRandomAlphabet(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}

function generateAllRandom(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function unescapeHtml(safe) {
    return safe
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

function displayText() {
    targetTextElement.innerHTML = `<div class="word">${escapeHtml(currentText)}</div>`;

    if (currentMode === 'word') {
        furiganaElement.innerHTML = `
            <div class="hiragana">${escapeHtml(currentFurigana)}</div>
        `;
    } else {
        furiganaElement.innerHTML = '';
    }

    if (!romajiElement) {
        romajiElement = document.createElement('div');
        romajiElement.id = 'romajiDisplay';
        romajiElement.style.marginTop = '10px';
        romajiElement.style.fontSize = '18px';
        targetTextElement.parentNode.insertBefore(romajiElement, targetTextElement.nextSibling);
    }

    updateRomajiDisplay();
}

function generatePossibleInputs() {
    if (currentMode === 'allRandom' || currentMode === 'alphabet') {
        possibleInputs = currentFurigana.split('').map(char => [char]);
    } else {
        possibleInputs = toRoman(currentFurigana);
    }
    debug(`Possible inputs: ${JSON.stringify(possibleInputs)}`);
}

function handleSpecialN(inputs, currentChar, nextChar) {
    if (currentChar !== 'ん') {
        return inputs;
    }

    if (nextChar === undefined) {
        return ['nn'];
    }

    const specialCases = 'なにぬねのあいうえおやゆよ';
    if (specialCases.includes(nextChar)) {
        return ['nn'];
    } else {
        return ['n', 'nn'];
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishGame();
        }
    }, 1000);
}

function finishGame() {
    isGameRunning = false;
    userInputElement.disabled = true;
    const score = calculateScore();
    resultElement.textContent = `ゲーム終了！ 最終スコア: ${score}`;
    startButton.disabled = false;
    restartButton.disabled = true;
    resetButton.disabled = true;
}

function calculateScore() {
    const accuracy = correctCharacters / typedCharacters;
    const timeElapsed = (Date.now() - startTime) / 1000;
    const speed = correctCharacters / (timeElapsed / 60);

    const score = Math.round((accuracy * 100) + (speed * 2));

    return score;
}

function updateScore() {
    const score = calculateScore();
    scoreElement.textContent = score;
}

function updateDisplay(inputLength) {
    const wordElement = targetTextElement.querySelector('.word');
    const completedText = `<span class="completed">${escapeHtml(currentText.slice(0, inputLength))}</span>`;
    const remainingText = escapeHtml(currentText.slice(inputLength));
    wordElement.innerHTML = completedText + remainingText;

    if (currentMode === 'word') {
        const hiraganaElement = furiganaElement.querySelector('.hiragana');
        const completedHiragana = `<span class="completed">${escapeHtml(currentFurigana.slice(0, inputLength))}</span>`;
        const remainingHiragana = escapeHtml(currentFurigana.slice(inputLength));
        hiraganaElement.innerHTML = completedHiragana + remainingHiragana;
    }
}

function updateRomajiDisplay() {
    displayedRomaji = possibleInputs.slice(currentInputIndex).map(inputs => inputs[0]).join('');
    romajiElement.textContent = displayedRomaji;
}

function processInput(input) {
    if (isProcessingInput || !isGameRunning) return;
    isProcessingInput = true;

    debug(`Processing input: ${input}`);

    let isCorrect = false;
    let isCompleted = false;

    const currentPossibleInputs = possibleInputs[currentInputIndex];
    for (let i = 0; i < currentPossibleInputs.length; i++) {
        if (currentPossibleInputs[i] === input) {
            isCorrect = true;
            isCompleted = true;
            break;
        } else if (currentPossibleInputs[i].startsWith(input)) {
            isCorrect = true;
            break;
        }
    }

    typedCharacters += input.length - lastCorrectInput.length;

    if (isCorrect) {
        correctCharacters += input.length - lastCorrectInput.length;
        lastCorrectInput = input;
        if (isCompleted) {
            currentInputIndex++;
            userInputElement.value = '';
            lastCorrectInput = '';
            if (currentInputIndex >= possibleInputs.length) {
                debug('Text completed. Generating new text.');
                generateText();
                currentInputIndex = 0;
            } else {
                updateRomajiDisplay();
            }
        }
    } else {
        showMissMessage();
        userInputElement.value = lastCorrectInput;
    }

    updateScore();
    isProcessingInput = false;
}

userInputElement.addEventListener('input', (e) => {
    const input = e.target.value;
    processInput(input);
});

function showMissMessage() {
    const missMessage = document.createElement('div');
    missMessage.textContent = 'ミス！';
    missMessage.style.position = 'absolute';
    missMessage.style.top = '50%';
    missMessage.style.left = '50%';
    missMessage.style.transform = 'translate(-50%, -50%)';
    missMessage.style.fontSize = '24px';
    missMessage.style.color = 'red';
    missMessage.style.fontWeight = 'bold';
    document.body.appendChild(missMessage);
    setTimeout(() => {
        document.body.removeChild(missMessage);
    }, 500);
}

const style = document.createElement('style');
style.textContent = `
    .word, .hiragana, .romaji {
        font-size: 28px;
        margin-bottom: 15px;
        min-height: 40px;
    }
    .word {
        font-weight: bold;
    }
    .completed {
        color: #888;
    }
    .current {
        color: #000;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    debug('Game initialized');
    setMode('word');
});