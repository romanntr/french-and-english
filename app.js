// app.js — French&English prototype (sober, professional)
document.addEventListener('DOMContentLoaded', ()=> {
  // Year
  const y = new Date().getFullYear();
  const ye = document.getElementById('year');
  const ye2 = document.getElementById('year2');
  if(ye) ye.textContent = y;
  if(ye2) ye2.textContent = y;

  // Index page: start button
  const startBtn = document.getElementById('startBtn');
  const dirSelect = document.getElementById('direction');
  if(startBtn){
    startBtn.addEventListener('click', ()=>{
      const dir = dirSelect.value;
      window.location.href = `lesson.html?dir=${dir}`;
    });
  }
,
'fr-en-numbers': {
  title: 'Les nombres — Français → English',
  fromLang: 'fr-FR',
  toLang: 'en-US',
  vocab: [
    {word: 'Un', trans: 'One'},
    {word: 'Deux', trans: 'Two'},
    {word: 'Trois', trans: 'Three'},
    {word: 'Quatre', trans: 'Four'},
    {word: 'Cinq', trans: 'Five'},
    {word: 'Six', trans: 'Six'},
    {word: 'Sept', trans: 'Seven'},
    {word: 'Huit', trans: 'Eight'},
    {word: 'Neuf', trans: 'Nine'},
    {word: 'Dix', trans: 'Ten'}
  ],
  quiz: [
    {q: "Comment dit-on 'Deux' en anglais ?", options:['One','Two','Three','Four'], a:1},
    {q: "Traduction : 'Five'", options:['Quatre','Cinq','Six','Sept'], a:1},
    {q: "Comment dit-on 'Dix' ?", options:['Nine','Eight','Ten','Twelve'], a:2}
  ]
},
'en-fr-numbers': {
  title: 'Numbers — English → Français',
  fromLang: 'en-US',
  toLang: 'fr-FR',
  vocab: [
    {word: 'One', trans: 'Un'},
    {word: 'Two', trans: 'Deux'},
    {word: 'Three', trans: 'Trois'},
    {word: 'Four', trans: 'Quatre'},
    {word: 'Five', trans: 'Cinq'},
    {word: 'Six', trans: 'Six'},
    {word: 'Seven', trans: 'Sept'},
    {word: 'Eight', trans: 'Huit'},
    {word: 'Nine', trans: 'Neuf'},
    {word: 'Ten', trans: 'Dix'}
  ],
  quiz: [
    {q: "How to say 'Cinq' in English?", options:['Five','Four','Six','Ten'], a:0},
    {q: "Traduction : 'Nine'", options:['Neuf','Huit','Dix','Sept'], a:0},
    {q: "Which number means 'Trois'?", options:['Three','Two','Four','Five'], a:0}
  ]
}
  // Lessons data (bilingual)
  const lessons = {
    'fr-en': {
      title: 'Salutations — Français → English',
      fromLang: 'fr-FR',
      toLang: 'en-US',
      vocab: [
        {word: 'Bonjour', trans: 'Hello / Good morning'},
        {word: 'Bonsoir', trans: 'Good evening'},
        {word: 'Salut', trans: 'Hi (informal)'},
        {word: 'Au revoir', trans: 'Goodbye'},
        {word: 'S’il vous plaît', trans: 'Please'},
        {word: 'Merci', trans: 'Thank you'},
        {word: 'De rien', trans: "You're welcome"},
        {word: 'Comment ça va ?', trans: 'How are you?'}
      ],
      quiz: [
        {q: "Comment dit-on 'Merci' en anglais ?", options:['Please','Thank you','Goodbye','Hi'], a:1},
        {q: "Traduction : 'Comment ça va ?'", options:['How are you?','Good morning','Please','Goodbye'], a:0},
        {q: "Quelle expression est informelle ?", options:['Salut','Bonsoir','Au revoir','S'il vous plaît'], a:0}
      ]
    },
    'en-fr': {
      title: 'Greetings — English → Français',
      fromLang: 'en-US',
      toLang: 'fr-FR',
      vocab: [
        {word: 'Hello', trans: 'Bonjour'},
        {word: 'Good night', trans: 'Bonne nuit'},
        {word: 'Hi', trans: 'Salut'},
        {word: 'Goodbye', trans: 'Au revoir'},
        {word: 'Please', trans: 'S’il vous plaît'},
        {word: 'Thank you', trans: 'Merci'},
        {word: "You're welcome", trans: 'De rien'},
        {word: 'How are you?', trans: 'Comment ça va ?'}
      ],
      quiz: [
        {q: "How to say 'Merci' in English?", options:['Please','Thank you','Goodbye','Hi'], a:1},
        {q: "Traduction : 'Bonjour'", options:['Good night','Hello','You\'re welcome','Please'], a:1},
        {q: "Which is informal?", options:['Please','Goodbye','Hi','Thank you'], a:2}
      ]
    }
  };

  // If on lesson page, render selected lesson
  if(window.location.pathname.endsWith('lesson.html')){
    const params = new URLSearchParams(window.location.search);
    const dir = params.get('dir') || 'fr-en';
    const lesson = lessons[dir] || lessons['fr-en'];
    document.getElementById('lesson-title').textContent = lesson.title;

    // populate flashcards
    const fc = document.getElementById('flashcards');
    lesson.vocab.forEach((v, idx) => {
      const card = document.createElement('div');
      card.className = 'flashcard';
      card.innerHTML = `
        <div class="word">${v.word}</div>
        <div class="trans">${v.trans}</div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="play-btn" data-i="${idx}" data-lang="${lesson.fromLang}">▶ Écouter</button>
          <button class="play-btn-target" data-i="${idx}" data-lang="${lesson.toLang}">▶ Traduction</button>
        </div>
      `;
      fc.appendChild(card);
    });

    // speech synthesis helper
    const voiceRateInput = document.getElementById('voiceRate');
    function speak(text, lang){
      if('speechSynthesis' in window){
        const ut = new SpeechSynthesisUtterance(text);
        ut.lang = lang || 'en-US';
        ut.rate = parseFloat(voiceRateInput.value || 1);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(ut);
      }
    }

    fc.addEventListener('click', (e)=>{
      const pbtn = e.target.closest('.play-btn');
      const pbtnT = e.target.closest('.play-btn-target');
      if(pbtn){
        const i = +pbtn.dataset.i;
        const lang = pbtn.dataset.lang;
        speak(lesson.vocab[i].word, lang);
      } else if(pbtnT){
        const i = +pbtnT.dataset.i;
        const lang = pbtnT.dataset.lang;
        speak(lesson.vocab[i].trans, lang);
      }
    });

    // quiz
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextQ');
    const replayCorrect = document.getElementById('replayCorrect');

    // shuffle quiz order and limit to 3 questions
    const quizPool = lesson.quiz.slice();
    function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} }
    shuffle(quizPool);
    const quiz = quizPool.slice(0,3);

    let qi = 0, score = 0;
    function renderQ(){
      const q = quiz[qi];
      questionEl.textContent = q.q;
      answersEl.innerHTML = '';
      feedback.textContent = '';
      nextBtn.style.display='none';
      replayCorrect.style.display='none';
      q.options.forEach((opt, idx)=>{
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.dataset.i = idx;
        answersEl.appendChild(btn);
      });
    }

    answersEl.addEventListener('click', (e)=>{
      const btn = e.target.closest('.answer-btn');
      if(!btn) return;
      const chosen = +btn.dataset.i;
      const q = quiz[qi];
      document.querySelectorAll('.answer-btn').forEach(b=>b.disabled=true);
      if(chosen === q.a){
        btn.classList.add('correct');
        feedback.textContent = 'Bonne réponse';
        score++;
      } else {
        btn.classList.add('wrong');
        feedback.textContent = 'Mauvaise réponse — réponse correcte : ' + q.options[q.a];
        const correctBtn = Array.from(document.querySelectorAll('.answer-btn')).find(b=>+b.dataset.i===q.a);
        if(correctBtn) correctBtn.classList.add('correct');
      }
      // allow replay of correct
      replayCorrect.onclick = ()=> speak(q.options[q.a], lesson.toLang);
      replayCorrect.style.display='inline-block';
      nextBtn.style.display='inline-block';
    });

    nextBtn.addEventListener('click', ()=>{
      qi++;
      if(qi >= quiz.length){
        questionEl.textContent = `Quiz terminé — Score: ${score}/${quiz.length}`;
        answersEl.innerHTML = '';
        nextBtn.style.display='none';
        replayCorrect.style.display='none';
        feedback.textContent = 'Révisez et réessayez pour améliorer votre score.';
      } else {
        renderQ();
      }
    });

    renderQ();
  }
});
