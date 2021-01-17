(function() {
  // sceneXXXは、各ゲーム画面の要素です
  const sceneTop = document.getElementById("sceneTop");
  const sceneGame = document.getElementById("sceneGame");
  const sceneResult = document.getElementById("sceneResult");
  // 問題文を表示する要素です
  const textQuestion = document.getElementById("textQuestion");
  // 選択肢を表示する要素です
  const listAnswer = document.getElementById("listAnswer");
  // 正解数を表示する要素です
  const numResult = document.getElementById("numResult");
  // トップ画面にて、ゲームを開始するボタン要素です
  const btnStart1 = document.getElementById("btnStart1");
  const btnStart2 = document.getElementById("btnStart2");
  const btnStart3 = document.getElementById("btnStart3");
  const btnStart4 = document.getElementById("btnStart4");


  // リザルト画面にて、ゲームをリセットしトップへ戻るボタン要素です
  const btnReset = document.getElementById("btnReset");
  const return0 = document.getElementById("return");

  const judge = document.getElementById("judge");

  const question = [
//(1)
  {text: "Have you ever (　　) her before?",
  choice: ["see","saw","seen","seeing"],answer:"seen"},
//(2)
  {text: "Will you tell me how (　　) to the station ?",
  choice: ["get you","getting","can get","to get"],answer:"to get"},
//(3)
  {text: "The game those students are playing now (　　) exciting.",
  choice: ["look","looks","are looking","look at"],answer:"looks"},
//(4)
  {text: '(　　) pencil is this ?"," "It’s mine."',
  choice: ["Who","Whose","When","Where"],answer:"Whose"},
//(4)
  {text: "(　　) the students work very hard yesterday?",
  choice: ["Has","Can","Did","Are"],answer:"Did"},
//(5)
  {text: "I couldn’t answer the question (　　) by the teacher.",
  choice: ["asks","asking","will ask","asked"],answer:"asked"},
//(6)
  {text: "I am glad (　　) that my friend is doing well in her new school.",
  choice: ["to hear","Which hears","hear about","can hear"],answer:"to hear"},
//(7)
  {text: "How (　　) do you drink green tea in a day ?",
  choice: ["often","high","many","far"],answer:"often"},
//(8)
  {text: "One of my friends (　　) in Australia.",
  choice: ["live","lives","are living","have lived"],answer:"lives"},
//(9)
  {text: "Yesterday’s baseball game was very (　　).",
  choice: ["crying","interested","tired","exciting"],answer:"exciting"},
//(10)
  {text: "The food that you bought yesterday (　　) in a week.",
  choice: ["should eat","should be eaten","has to eat","has eaten"],answer:"should be eaten"},
//(11)
  {text: "Mt. Fuji is (　　) of all the mountains in Japan.",
  choice: ["high","as high as","higher","the highest"],answer:"the highest"},
//(12)
  {text: "(　　) English spoken in Australia ?",
  choice: ["Is","Has","Does","Are"],answer:"Is"},
//(13)
  {text: "I went shopping because it stopped (　　).",
  choice: ["rains","rained","raining","rainy"],answer:"raining"},
//(14)
  {text: "l (　　) my homework last night.",
  choice: ["finish","finished","am finishing","have finished"],answer:"finished"},
  //(15)
 {text: "That house with large windows (　　) built ten years ago.",
choice: ["lives","is","was","were"],answer:"was"},
//(16)
{text: "Yoshio has two brothers and he is the (　　) of the three.",
choice: ["younger than","youngest","young","as young"],answer:"youngest"},
//(17)
{text: "My grandfather sent me a shirt (　　) in India.",
choice: ["make","was made","making","made"],answer:"made"},
//(17)
{text: "We can get new ideas by (　　) with a lot of people.",
choice: ["talking","talked","have talked","to talk"],answer:"talking"},
//(18)
{text: "One of the birds I bought yesterday (　　) singing now.",
choice: ["is","are","was","were"],answer:"is"},
//(18)
{text: "When did the cat become as (　　) ?",
choice: ["the big cat","big as its mother","bigger than its mother","the biggest of the three"],answer:"big as its mother"},
//(19)
{text: "When Takuya was ten years old,he (　　) a book written by a famous soccer player.",
choice: ["read","reads","is read","has read"],answer:"read"},
//(20)
{text: "The city is Visited by many people (　　) a famous festival in February.",
choice: ["when","which","between","during"],answer:"during"},
//(21)
{text: "Whose pencils are (　　) ?",
choice: ["that","those","them","yours"],answer:"those"},
//(22)
{text: "Can Mt. Fuji (　　) from your classroom ?",
choice: ["see","seen","be seen","be seeing"],answer:"be seen"},
//(23)
{text: "Mr. Suzuki (　　) us to bring lunch this week.",
choice: ["told","said","spoke","talked"],answer:"told"},
//(24)
{text: "This is a camera (　　) is popular in Japan.",
choice: ["What","it","who","which"],answer:"which"},

];




  // ゲームで使用する共通の変数です
  // answer...プレイヤーの答えと比較する、正解のテキストです
  // gameCount...プレイヤーが答えた数です
  // success...プレイヤーが答えて、正解した数です
  let state = {
    answer: "",
    gameCount: 0,
    success: 0
  };

  // ゲームをリセットする関数を書いてみましょう
  function init() {
    state.gameCount = 0;
    state.success = 0;
    changeScene(sceneResult, sceneTop);

  }


//  btnStart2.addEventListener("click", gameStart, false);

btnStart1.addEventListener("click", gameStart1, false);
btnStart2.addEventListener("click", gameStart2, false);
btnStart3.addEventListener("click", gameStart3, false);
btnStart4.addEventListener("click", gameStart, false);

  // 1.トップ画面　2.ゲーム画面　3.リザルト画面
  function changeScene(hiddenScene, visibleScene) {
    hiddenScene.classList.add("is-hidden");
    hiddenScene.classList.remove("is-visible");
    visibleScene.classList.add("is-visible");
  }

  // 問題と選択肢をViewに表示し、正解を共通の変数へ代入
  function showQuestion() {
    var str = "";
    question[state.gameCount].choice.forEach(function(value) {
      str += '<li class="questionChoice">' + value + "</li>";
    });
    textQuestion.innerHTML = question[state.gameCount].text;
    listAnswer.innerHTML = str;
  }

  function choiceQuestion() {
    let questionChoice = document.querySelectorAll(".questionChoice");
    questionChoice.forEach(function(choice) {
      choice.addEventListener(
        "click",
        function() {
          state.answer = this.textContent;
          checkAnswer(question[state.gameCount].answer);
        },
        false
      );
    });
  }

  // 解答が正解か不正解かをチェック
  function checkAnswer(answer) {
    if (answer === state.answer) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
    state.gameCount++;
    if (state.gameCount < question.length) {
      showQuestion();
      choiceQuestion();
    } else {
      gameEnd();
    }
  }

  // 上でチェックし、正解だった場合
  function correctAnswer() {
if(state.gameCount < 16)
{
  state.success++;
  alert("正解！すばらしい！！");
}
else{gameEnd1();}
  }
  // 上でチェックし、不正解だった場合
  function incorrectAnswer() {
alert("不正解");

if(state.gameCount == 0){alert(' Have → 現在完了 → 過去分詞形！⇨ "seen"');}
if(state.gameCount == 1){alert(' how to V : Vの仕方 ⇨ "to get"');}
if(state.gameCount == 2){alert(' 主語が「The game」だから、３単現の"S"！ ⇨ "looks" ');}
if(state.gameCount == 3){alert(' ( )のあとに[ pencil ]だから「誰の(鉛筆)」⇨ "whose"');}
if(state.gameCount == 4){alert(' 文末に「yesterday」があるから過去形を選ぶ。⇨ "Did" ');}
if(state.gameCount == 5){alert('  ');}
if(state.gameCount == 6){alert('  ');}
if(state.gameCount == 7){alert('  ');}
if(state.gameCount == 8){alert('  ');}
if(state.gameCount == 9){alert('  ');}
if(state.gameCount == 10){alert('  ');}
if(state.gameCount == 12){alert('  ');}
if(state.gameCount == 13){alert('  ');}
if(state.gameCount == 14){alert('  ');}
if(state.gameCount == 15){alert('  ');}
if(state.gameCount == 16){alert('  ');}
if(state.gameCount == 17){alert('  ');}
if(state.gameCount == 18){alert('  ');}
if(state.gameCount == 19){alert('  ');}
if(state.gameCount == 20){alert('  ');}
if(state.gameCount == 21){alert('  ');}
if(state.gameCount == 22){alert('  ');}
if(state.gameCount == 23){alert('  ');}
if(state.gameCount == 24){alert('  ');}


  }

  // スタートボタンが押された時
  function gameStart() {
    changeScene(sceneTop, sceneGame);
    showQuestion();
    choiceQuestion();
  return0.addEventListener("click",function () {location.reload();}, false);
  }

  // ゲームが終了した時
  function gameEnd() {
    changeScene(sceneGame, sceneResult);
    numResult.innerHTML = state.success;
    btnReset.addEventListener("click", init, false);
  }

  function gameStart1() {
        state.gameCount = 0,
    changeScene(sceneTop, sceneGame);
    showQuestion();
    choiceQuestion();
    return0.addEventListener("click",function () {location.reload();}, false);

    function correctAnswer() {
  if(state.gameCount < 8)
  {
    state.success++;
    alert("正解！すばらしい！！");
  }
  else{gameEnd1();}
    }
    // 上でチェックし、不正解だった場合
    function incorrectAnswer() {
  alert("不正解");
  }
}

  // ゲームが終了した時
  function gameEnd1() {
    changeScene(sceneGame, sceneResult);
    numResult.innerHTML = state.success;
    btnReset.addEventListener("click", init, false);
  }



  function gameStart2() {
        state.gameCount = 8,
    changeScene(sceneTop, sceneGame);
    showQuestion();
    choiceQuestion();
    return0.addEventListener("click",function () {location.reload();}, false);


    function correctAnswer() {
  if(state.gameCount < 16)
  {
    state.success++;
    alert("正解！すばらしい！！");
  }
  else{gameEnd2();}
    }
    // 上でチェックし、不正解だった場合
    function incorrectAnswer() {
  alert("不正解");
  }
}

  // ゲームが終了した時
  function gameEnd2() {
    changeScene(sceneGame, sceneResult);
    numResult.innerHTML = state.success;
    btnReset.addEventListener("click", init, false);
  }


    function gameStart3() {
          state.gameCount = 15,
      changeScene(sceneTop, sceneGame);
      showQuestion();
      choiceQuestion();
      return0.addEventListener("click",function () {location.reload();}, false);


      function correctAnswer() {
    if(state.gameCount < 23)
    {
      state.success++;
      alert("正解！すばらしい！！");
    }
    else{gameEnd3();}
      }
      // 上でチェックし、不正解だった場合
      function incorrectAnswer() {
    alert("不正解");
    }
  }

    // ゲームが終了した時
    function gameEnd3() {
      changeScene(sceneGame, sceneResult);
      numResult.innerHTML = state.success;
      btnReset.addEventListener("click", init, false);
    }



  // スタートボタンが押されたら、ゲームスタートの関数を
  // リセットボタンが押されたら、ゲーム終了後にゲームをリセットする関数を実行するイベントです
  init();
})();


//
// btnStart2.addEventListener("click", gameStart, false);
// alert("おう…");
