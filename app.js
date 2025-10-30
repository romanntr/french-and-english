document.addEventListener('DOMContentLoaded', () => {

  const lessons = {
    'fr-en': {
      title: 'Salutations — Français → English',
      fromLang: 'fr-FR',
      toLang: 'en-US',
      vocab: [
        { word: 'Bonjour', trans: 'Hello / Good morning' },
        { word: 'Bonsoir', trans: 'Good evening' },
        { word: 'Salut', trans: 'Hi (informal)' },
        { word: 'Au revoir', trans: 'Goodbye' },
        { word: 'S’il vous plaît', trans: 'Please' },
        { word: 'Merci', trans: 'Thank you' },
        { word: 'De rien', trans: "You're welcome" },
        { word: 'Comment ça va ?', trans: 'How are you?' }
      ],
      quiz: [
        { q: "Comment dit-on 'Merci' en anglais ?", options: ['Please', 'Thank you', 'Goodbye', 'Hi'], a: 1 },
        { q: "Traduction : 'How are you?'", options: ['Comment ça va ?', 'Merci', 'De rien', 'Salut'], a: 0 },
        { q: "Quelle expression est informelle ?", options: ['S’il vous plaît', 'Salut', 'Bonsoir', 'De rien'], a: 1 }
      ]
    },

    'en-fr': {
      title: 'Greetings — English → Français',
      fromLang: 'en-US',
      toLang: 'fr-FR',
      vocab: [
        { word: 'Hello', trans: 'Bonjour' },
        { word: 'Good night', trans: 'Bonne nuit' },
        { word: 'Hi', trans: 'Salut' },
        { word: 'Goodbye', trans: 'Au revoir' },
        { word: 'Please', trans: 'S’il vous plaît' },
        { word: 'Thank you', trans: 'Merci' },
        { word: "You're welcome", trans: 'De rien' },
        { word: 'How are you?', trans: 'Comment ça va ?' }
      ],
      quiz: [
        { q: "How to say 'Merci' in English?", options: ['Please', 'Thank you', 'Goodbye', 'Hi'], a: 1 },
        { q: "Traduction : 'Bonjour'", options: ['Good night', 'Hello', "You're welcome", 'Please'], a: 1 },
        { q: "Which is informal?", options: ['Please', 'Goodbye', 'Hi', 'Thank you'], a: 2 }
      ]
    },

    // 🔢 Nouvelle leçon : Les nombres / Numbers
    'fr-en-numbers': {
      title: 'Les nombres — Français → English',
      fromLang: 'fr-FR',
      toLang: 'en-US',
      vocab: [
        { word: 'Un', trans: 'One' },
        { word: 'Deux', trans: 'Two' },
        { word: 'Trois', trans: 'Three' },
        { word: 'Quatre', trans: 'Four' },
        { word: 'Cinq', trans: 'Five' },
        { word: 'Six', trans: 'Six' },
        { word: 'Sept', trans: 'Seven' },
        { word: 'Huit', trans: 'Eight' },
        { word: 'Neuf', trans: 'Nine' },
        { word: 'Dix', trans: 'Ten' }
      ],
      quiz: [
        { q: "Comment dit-on 'Deux' en anglais ?", options: ['One', 'Two', 'Three', 'Four'], a: 1 },
        { q: "Traduction : 'Five'", options: ['Quatre', 'Cinq', 'Six', 'Sept'], a: 1 },
        { q: "Comment dit-on 'Dix' ?", options: ['Nine', 'Eight', 'Ten', 'Twelve'], a: 2 }
      ]
    },

    'en-fr-numbers': {
      title: 'Numbers — English → Français',
      fromLang: 'en-US',
      toLang: 'fr-FR',
      vocab: [
        { word: 'One', trans: 'Un' },
        { word: 'Two', trans: 'Deux' },
        { word: 'Three', trans: 'Trois' },
        { word: 'Four', trans: 'Quatre' },
        { word: 'Five', trans: 'Cinq' },
        { word: 'Six', trans: 'Six' },
        { word: 'Seven', trans: 'Sept' },
        { word: 'Eight', trans: 'Huit' },
        { word: 'Nine', trans: 'Neuf' },
        { word: 'Ten', trans: 'Dix' }
      ],
      quiz: [
        { q: "How to say 'Cinq' in English?", options: ['Five', 'Four', 'Six', 'Ten'], a: 0 },
        { q: "Traduction : 'Nine'", options: ['Neuf', 'Huit', 'Dix', 'Sept'], a: 0 },
        { q: "Which number means 'Trois'?", options: ['Three', 'Two', 'Four', 'Five'], a: 0 }
      ]
    }
  };

  // 🎧 Fonction pour lire un mot à voix haute
  function speak(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  }

  // 🧠 Récupération du paramètre d’URL (leçon choisie)
  const params = new URLSearchParams(window.location.search);
  const dir = params.get('dir');
  const lesson = lessons[dir];

  if (lesson) {
    document.getElementById('lesson-title').textContent = lesson.title;

    const vocabList = document.getElementById('vocab-list');
    lesson.vocab.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.word}</strong> — ${item.trans} 
        <button onclick="speechSynthesis.cancel(); (${speak.toString()})('${item.word}','${lesson.fromLang}')">🔊</button>`;
      vocabList.appendChild(li);
    });

    // Génération du quiz
    const quizContainer = document.getElementById('quiz');
    lesson.quiz.forEach((q, i) => {
      const div = document.createElement('div');
      div.classList.add('question');
      div.innerHTML = `<p>${i + 1}. ${q.q}</p>`;
      q.options.forEach((opt, j) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => {
          if (j === q.a) {
            btn.style.background = '#4CAF50';
          } else {
            btn.style.background = '#f44336';
          }
        };
        div.appendChild(btn);
      });
      quizContainer.appendChild(div);
    });

  } else {
    document.getElementById('lesson-title').textContent = 'Leçon non trouvée';
  }

});
