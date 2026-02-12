
(()=>{
  var list = [
    // Girls
    "assets/Maya/happy.png",
    "assets/Skylar/happy.png",
    "assets/Amanda/happy.png",
    "assets/Valentina/happy.png",
    "assets/Elena/happy.png",
    // Guys
    "assets/Tyler/neutral.png",
    "assets/Julian/neutral.png",
    "assets/Chad/neutral.png",
  ];
  for (var i = 1; i <= 2; i++) {
    var j = Math.floor(Math.random()*list.length);
    var char = document.getElementById("char"+i);
    char.src = list.splice(j,1)[0];
  }
})();

const defaultGameData = {
  affection: {
    maya: 0,
    skylar: 0,
    amanda: 0,
    valentina: 0,
    elena: 0,
    tyler: 0,
  },
  flags: {},
  inventory: [],
  money: 0,
  day: 0,
  // whatever else you want
};

/* Character definitions */
var characters = {
  maya: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      angry: "assets/Maya/angry.png",
      annoyed: "assets/Maya/annoyed.png",
      confused: "assets/Maya/confused.png",
      cringe: "assets/Maya/cringe.png",
      crying: "assets/Maya/crying.png",
      disgust: "assets/Maya/disgust.png",
      embarrassed: "assets/Maya/embarrassed.png",
      fearful: "assets/Maya/fearful.png",
      flustered: "assets/Maya/flustered.png",
      friendly: "assets/Maya/friendly.png",
      happy: "assets/Maya/happy.png",
      horny: "assets/Maya/horny.png",
      horny2: "assets/Maya/horny-2.png",
      hungry: "assets/Maya/hungry.png",
      laughing: "assets/Maya/laughing.png",
      listening: "assets/Maya/listening.png",
      neutral: "assets/Maya/neutral.png",
      sad: "assets/Maya/sad.png",
      scared: "assets/Maya/scared.png",
      shocked: "assets/Maya/shocked.png",
      shy: "assets/Maya/shy.png",
      smug: "assets/Maya/smug.png",
      tease: "assets/Maya/tease.png",
      wailing: "assets/Maya/wailing.png",
      wonder: "assets/Maya/wonder.png",
      worried: "assets/Maya/worried.png"
    }
  },
  skylar: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "82vh"
    },
    emotions: {
      happy: "assets/Skylar/happy.png",
      friendly: "assets/Skylar/happy.png",
      talking: "assets/Skylar/happy.png",
      neutral: "assets/Skylar/neutral.png",
    }
  },
  amanda: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      happy: "assets/Amanda/happy.png",
      neutral: "assets/Amanda/neutral.png",
    }
  },
  valentina: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      happy: "assets/Valentina/happy.png",
      neutral: "assets/Valentina/neutral.png",
    }
  },
  elena: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "78vh"
    },
    emotions: {
      happy: "assets/Elena/happy.png",
      neutral: "assets/Elena/neutral.png",
    }
  },
  tyler: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      neutral: "assets/Tyler/neutral.png",
    }
  },
  julian: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      neutral: "assets/Julian/neutral.png",
    }
  },
  chad: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "85vh"
    },
    emotions: {
      neutral: "assets/Chad/neutral.png",
    }
  }
};

var backgrounds = {
  school: {
    classes: {
      biology: "backgrounds/school/classes/biology.jpg",
      calculus: "backgrounds/school/classes/calculus.jpg",
      government: "backgrounds/school/classes/government.jpg",
      literature: "backgrounds/school/classes/literature.jpg",
    },
    hallways: {
      F: "backgrounds/school/hallways/F.jpg",
    },
    side_entrance: "backgrounds/school/side_entrance.jpg",
    front_entrance: "backgrounds/school/front_entrance.jpg",
    courtyard: "backgrounds/school/courtyard.jpg",
    gym: "backgrounds/school/gym.jpg",
    star_room: "backgrounds/school/star_room.jpg",
    student_union: "backgrounds/school/student_union.jpg",
    manga_shelf: "backgrounds/school/manga_shelf.jpg",
  },
  bedroom: "backgrounds/bedroom.jpg",
  black: "backgrounds/black.png",
};

/* Scene definitions */
var startingScene = "school_intro";
var scenes = {

  school_intro: {
    id: "school_intro",
    background: backgrounds.black,
    script: [
      {
        speaker: "Narrator",
        text: "The first day of your last year arrives sooner than you thought."
      },
      {
        speaker: "Narrator",
        text: "You arrive on campus a bit late.",
        background: backgrounds.school.side_entrance
      },
      {
        speaker: "Narrator",
        text: "You are alone.",
      },
      {
        speaker: "Narrator",
        text: "Most of your friends have already graduated. You never bothered meeting the younger classes.",
        background: backgrounds.school.hallways.F
      },
      {
        speaker: "Narrator",
        text: "Your friends in your grade are all taking easier classes their senior year, but you need to lock in.",
      },
      {
        speaker: "Narrator",
        text: "You arrive in your calculus class, slightly late.",
        background: backgrounds.school.classes.calculus
      },
      {
        speaker: "Narrator",
        text: "Seating is already chosen, but there is an open seat next to a girl.",
        next: "calculus_intro"
      },
    ]
  },
  calculus_intro: {
    id: "calculus_intro",
    background: backgrounds.school.classes.calculus,
    cast: {
      maya: {
        emotion: "neutral",
        left: "55vw",
        bottom: "0vh"
      }
    },
    script: [
      {
        speaker: "Narrator",
        text: "You take a seat next to her.",
        choices: [
          { text: "Introduce Yourself", next: ()=>vnIndex+1, onchoose: ()=>gameData.affection.maya++ },
          { text: "Ignore Her", next: ()=>vnIndex+5, }
        ]
      },
      {
        speaker: "{player}",
        text: "Uh, hi... my name is {player} what is yours?"
      },
      {
        speaker: "Maya",
        text: "Maya Higgins"
      },
      {
        speaker: "{player}",
        text: "Nice to meet you, Maya. Are you excited for this class?"
      },
      {
        speaker: "Maya",
        text: "Yeah.",
        next: ()=>vnIndex+2,
      },
      {
        speaker: "Narrator",
        text: "You learn that her name is Maya Higgins when the teacher takes attendance."
      },
      {
        speaker: "Teacher",
        text: "So before we begin let me tell you a bit about myself..."
      },
      {
        speaker: "Narrator",
        text: "The teacher talks the rest of the period.",
        next: "government_intro"
      },
    ]
  },
  government_intro: {
    id: "government_intro",
    background: backgrounds.school.classes.government,

    cast: {
      julian: { emotion: "neutral", left: "95vw", bottom: "0vh" },
      skylar: { emotion: "happy", left: "20vw", bottom: "0vh" },
      valentina:{ emotion: "neutral", left: "80vw", bottom: "0vh" },
      maya: { emotion: "fearful", left: "55vw", bottom: "0vh" },
      amanda: { emotion: "neutral", left: "35vw", bottom: "0vh" },
      elena: { emotion: "neutral", left: "65vw", bottom: "0vh" },
      tyler: { emotion: "neutral", left: "10vw", bottom: "0vh" },
      chad: { emotion: "neutral", left: "45vw", bottom: "0vh" },
    },

    script: [
      {
        speaker: "Narrator",
        text: "You arrive at your next class, Government & Economics."
      },
      {
        speaker: "Teacher",
        text: "Welcome to Government. Before we begin, we’re doing an icebreaker."
      },
      {
        speaker: "Teacher",
        text: "Walk around and find classmates who match the prompts I gave you."
      },
      {
        cinematic: true,
        scene: [
          { character: "julian", left: "120vw" },
          { character: "skylar", left: "-20vw" },
          { character: "valentina", left: "120vw" },
          { character: "maya", left: "120vw" },
          { character: "amanda", left: "-20vw" },
          { character: "elena", left: "120vw" },
          { character: "tyler", left: "120vw" },
          { character: "chad", left: "50vw" },
        ],
        duration: 800,
      },
      {
        speaker: "Chad Minovsky",
        text: "I am in this class just because my friends are in it.",
        scene: [
          { character: "julian", visible: false },
          { character: "skylar", visible: false },
          { character: "valentina", visible: false },
          { character: "maya", visible: false },
          { character: "amanda", visible: false },
          { character: "elena", visible: false },
          { character: "tyler", visible: false },
          { character: "chad", visible: true },
        ],
      },
      {
        cinematic: true,
        scene: [
          { character: "amanda", left: "50vw", visible: true },
          { character: "chad", left: "120vw" },
        ],
        duration: 800,
      },
      {
        speaker: "Amanda Bennett",
        text: "I am a member of the CHS Band Program.",
        scene: [
          { character: "chad", visible: false },
        ],
      },
      {
        cinematic: true,
        scene: [
          { character: "elena", left: "50vw", visible: true },
          { character: "amanda", left: "-20vw" },
        ],
        duration: 800,
      },
      {
        speaker: "Elena Cruz",
        text: "I was on the local news once.",
        scene: [
          { character: "amanda", visible: false },
        ],
      },
      {
        cinematic: true,
        scene: [
          { character: "tyler", left: "50vw", visible: true },
          { character: "elena", left: "-20vw" },
        ],
        duration: 800,
      },
      {
        speaker: "Tyler Hernandez",
        text: "I broke a bone in 8th grade.",
        scene: [
          { character: "elena", visible: false },
        ],
      },
      {
        cinematic: true,
        scene: [
          { character: "valentina", left: "50vw", visible: true },
          { character: "tyler", left: "-20vw" },
        ],
        duration: 800,
      },
      {
        speaker: "Valentina Reyes",
        text: "I took a trip to Europe last year with the school.",
        scene: [
          { character: "tyler", visible: false },
        ],
      },
      {
        cinematic: true,
        scene: [
          { character: "skylar", left: "50vw", visible: true },
          { character: "valentina", left: "120vw" },
        ],
        duration: 800,
      },
      {
        speaker: "Skylar Brooks",
        text: "I play varsity volleyball and run track for Corona High School.",
        scene: [
          { character: "valentina", visible: false },
        ],
      },
      {
        cinematic: true,
        scene: [
          { character: "julian", left: "50vw", visible: true },
          { character: "skylar", left: "-20vw" },
        ],
        duration: 800,
      },
      {
        speaker: "Julian Arroyo",
        text: "I transferred into this school Sophomore year.",
        scene: [
          { character: "skylar", visible: false },
        ],
      },
      {
        cinematic: true,
        scene: [
          { character: "maya", left: "50vw", visible: true },
          { character: "julian", left: "-20vw" },
        ],
        duration: 800,
      },
      {
        speaker: "Maya Higgins",
        text: "I get straight A's and I like to read books.",
        scene: [
          { character: "julian", visible: false },
        ],
      },
      {
        cinematic: true,
        scene: [
          { character: "maya", left: "-20vw", visible: true },
        ],
        duration: 800,
      },
      {
        speaker: "Teacher",
        text: "Let's assign some seating.",
        scene: [
          { character: "maya", visible: false },
        ],
      },
      {
        speaker: "Narrator",
        text: "You are sat next to Chad, Elena, and Valentina.",
        scene: [
          { character: "chad", left: "25vw", visible: true },
          { character: "elena", left: "50vw", visible: true },
          { character: "valentina", left: "75vw", visible: true },
        ],
      },
      {
        speaker: "Teacher",
        text: "Now take out a separate sheet of paper. Have you ever heard of plato's allegory of the cave?",
      },
      {
        speaker: "Narrator",
        text: "You doodle for the rest of class.",
        next: "literature_intro"
      },
    ]
  },
  literature_intro: {
    id: "literature_intro",
    background: backgrounds.school.classes.literature,
    cast: {
      tyler: { emotion: "neutral", left: "33vw" },
      amanda: { emotion: "neutral", left: "66vw" },
    },
    script: [
      {
        speaker: "Narrator",
        text: "You arrive in your next class, AP Literature.",
      },
      {
        speaker: "Narrator",
        text: "You sit next to Tyler and Amanda.",
      },
      {
        speaker: "Narrator",
        text: "The game is not finished!",
        next: ()=>{prompt("The game is not finished, the script ends here. If you would like to help, join the club, remind code is @chsgamedev. Thanks for playing! Also, when the game is updated this point will move."); return vnIndex;}
      },
    ]
  },
  psychology_intro: {
    id: "literature_intro",
    background: backgrounds.school.classes.literature,
    cast: {
      tyler: { emotion: "neutral", left: "33vw" },
      amanda: { emotion: "neutral", left: "66vw" },
    },
    script: [
      {
        speaker: "Narrator",
        text: "You arrive in your next class, AP Literature.",
      },
      {
        speaker: "Narrator",
        text: "You sit next to Tyler and Amanda.",
      },
      {
        speaker: "Narrator",
        text: "The game is not finished!",
        next: ()=>{prompt("The game is not finished, the script ends here. If you would like to help, join the club, remind code is @chsgamedev. Thanks for playing! Also, when the game is updated this point will move."); return vnIndex;}
      },
    ]
  },

  home: {
    id: "home",
    background: backgrounds.bedroom,

    script: [
      {
        speaker: "Narrator",
        text: "You’re back home. What do you want to do?"
      },
      {
        choices: [
          { text: "Study", next: "home_study" },
          { text: "Relax", next: "home_relax" },
          { text: "Message Maya", next: "home_text_maya" },
          { text: "Sleep", next: "home_sleep" }
        ]
      }
    ]
  },

  intro: {
    id: "school_intro",
    background: backgrounds.school.front_entrance,

    cast: {
      maya: {
        emotion: "neutral",
        left: "55vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Hey! You’re the new transfer student, right?"
      },
      {
        speaker: "Maya",
        text: "We’re doing placement tests today. Want to try one?",
        choices: [
          { text: "Sure, let's do it!", next: "test_intro" },
          { text: "No thanks.", next: "skip_test" }
        ]
      }
    ]
  },

  skip_test: {
    id: "skip_test",
    background: backgrounds.school.courtyard,

    cast: {
      maya: {
        emotion: "annoyed",
        left: "50vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Seriously? It’s literally the first day…"
      },
      {
        speaker: "Maya",
        text: "Whatever. Go wander around or something.",
        next: "meet_skylar"
      }
    ]
  },

  test_intro: {
    id: "test_intro",
    background: backgrounds.school.classes.biology,

    cast: {
      maya: {
        emotion: "happy",
        left: "50vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Okay! You can pick what kind of test you want."
      },
      {
        speaker: "Maya",
        text: "Math or reading?",
        choices: [
          { 
            text: "Math test", 
            next: "math_test_start" 
          },
          { 
            text: "Reading test", 
            next: "reading_test_start" 
          }
        ]
      }
    ]
  },

  /* -------------------------
     MATH TEST
  ------------------------- */

  math_test_start: {
    id: "math_test_start",
    background: backgrounds.school.classes.biology,

    cast: {
      maya: {
        emotion: "smug",
        left: "50vw",
        bottom: "0vh",
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Alright! Let’s see how good you are with numbers."
      },
      {
        custom: (done) => {
          startMathTest((score) => {
            gameData.flags.lastMathScore = score;
            done();
          });
        },
      },
      {
        speaker: "Maya",
        text: "Let’s see your results.",
        scene: [ { character: "maya", emotion: "neutral" } ], 
      },
      { 
        cinematic: true, 
        scene: [ { character: "maya", emotion: "listening" } ], 
        duration: 2000,
        next: () => {
          const s = gameData.flags.lastMathScore;
          if (s >= 4) {
            gameData.affection.maya++;
            return "math_test_pass";
          }
          gameData.affection.maya--;
          return "math_test_fail";
        }
      }
    ]
  },

  math_test_pass: {
    id: "math_test_pass",
    background: backgrounds.school.classes.biology,

    cast: {
      maya: {
        emotion: "happy",
        left: "50vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Wow! You did amazing!"
      },
      {
        speaker: "Maya",
        text: "I’m seriously impressed.",
      },
      {
        speaker: "Maya",
        text: "Let’s head back.",
        next: "meet_skylar"
      }
    ]
  },

  math_test_fail: {
    id: "math_test_fail",
    background: backgrounds.school.classes.biology,

    cast: {
      maya: {
        emotion: "annoyed",
        left: "50vw",
        bottom: "0vh",
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Oof… that was rough."
      },
      {
        speaker: "Maya",
        text: "It’s okay though! You’ll get better.",
      },
      {
        speaker: "Maya",
        text: "Let’s go back.",
        next: "meet_skylar"
      }
    ]
  },

  /* -------------------------
     READING TEST
  ------------------------- */

  reading_test_start: {
    id: "reading_test_start",
    background: backgrounds.school.classes.biology,

    cast: {
      maya: {
        emotion: "neutral",
        left: "50vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Okay! Let’s test your reading comprehension."
      },
      {
        custom: (done) => {
          startLanguageTest((score) => {
            gameData.flags.lastReadingScore = score;
            done();
          });
        },
      },
      {
        speaker: "Maya",
        text: "Let’s see your results."
      },
      { 
        cinematic: true, 
        scene: [ { character: "maya", emotion: "listening" } ], 
        duration: 2000,
        next: () => {
          const s = gameData.flags.lastReadingScore;
          if (s >= 1) {
            gameData.affection.maya++;
            return "reading_test_pass";
          }
          gameData.affection.maya--;
          return "reading_test_fail";
        }
      }
    ]
  },

  reading_test_pass: {
    id: "reading_test_pass",
    background: backgrounds.school.classes.biology,

    cast: {
      maya: {
        emotion: "happy",
        left: "50vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Nice! You understood the passage perfectly."
      },
      {
        speaker: "Maya",
        text: "You’re smarter than you look.",
        next: "meet_skylar"
      },
    ]
  },

  reading_test_fail: {
    id: "reading_test_fail",
    background: backgrounds.school.classes.biology,

    cast: {
      maya: {
        emotion: "cringe",
        left: "50vw",
        bottom: "0vh",
      }
    },

    script: [
      {
        speaker: "Maya",
        text: "Uhhh… that wasn’t the right answer."
      },
      {
        speaker: "Maya",
        text: "Don’t worry. You’ll improve.",
      },
      {
        next: "meet_skylar"
      }
    ]
  },

  //


  meet_skylar: {
    id: "meet_skylar",
    background: backgrounds.school.courtyard,

    cast: {
      skylar: {
        emotion: "friendly",
        left: "20vw",
        bottom: "0vh"
      },
      maya: {
        emotion: "neutral",
        left: "60vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Skylar",
        text: "Hey… don’t mind Maya. She takes school stuff way too seriously."
      },
      {
        speaker: "Skylar",
        text: "I’m Skylar, by the way. You’re the new student, right?"
      },
      {
        speaker: "Maya",
        text: "Skylar, stop encouraging them!"
      },
      {
        speaker: "Skylar",
        text: "Relax. Not everyone wants to take a test on day one."
      },
      {
        speaker: "Skylar",
        text: "Anyway, want me to show you around?",
        choices: [
          { text: "Sure, that sounds nice.", next: "skylar_tour_start" },
          { text: "Maybe later.", next: "school_intro" }
        ]
      }
    ]
  },

  // Tour

  skylar_tour_start: {
    id: "skylar_tour_start",
    background: backgrounds.school.courtyard,

    cast: {
      skylar: {
        emotion: "friendly",
        left: "20vw",
        bottom: "0vh"
      },
      maya: {
        emotion: "annoyed",
        left: "60vw",
        bottom: "0vh",
      }
    },

    script: [
      {
        speaker: "Skylar",
        text: "Cool! I’ll show you around. This place is bigger than it looks."
      },
      {
        cinematic: true, 
        scene: [ { character: "maya", left: "120vw" } ], 
        duration: 600,
      },
      {
        speaker: "Skylar",
        text: "Where do you want to check out first?",
        choices: [
          { text: "The cafeteria", next: "skylar_tour_cafeteria" },
          { text: "The library", next: "skylar_tour_library" },
          { text: "The gym", next: "skylar_tour_gym" }
        ]
      }
    ]
  },

  skylar_tour_cafeteria: {
    id: "skylar_tour_cafeteria",
    background: backgrounds.school.star_room,

    cast: {
      skylar: {
        emotion: "talking",
        left: "20vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Skylar",
        text: "This is the cafeteria. The food is… edible. Most days."
      },
      {
        speaker: "Skylar",
        text: "Pro tip: Hard shell tacos are only served in here on Tuesday."
      },
      {
        speaker: "Skylar",
        text: "Want to see another place?",
        choices: [
          { text: "Library", next: "skylar_tour_library" },
          { text: "Gym", next: "skylar_tour_gym" },
          { text: "I’m good, thanks.", next: "skylar_tour_end" }
        ]
      }
    ]
  },

  skylar_tour_library: {
    id: "skylar_tour_library",
    background: backgrounds.school.student_union,

    cast: {
      skylar: {
        emotion: "neutral",
        left: "20vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Skylar",
        text: "This is the library. Quietest place on campus."
      },
      {
        speaker: "Skylar",
        text: "If you ever need find Maya, this is your spot."
      },
      {
        speaker: "Skylar",
        text: "Where to next?",
        choices: [
          { text: "Cafeteria", next: "skylar_tour_cafeteria" },
          { text: "Gym", next: "skylar_tour_gym" },
          { text: "I’m done for now.", next: "skylar_tour_end" }
        ]
      }
    ]
  },

  skylar_tour_gym: {
    id: "skylar_tour_gym",
    background: backgrounds.school.gym,

    cast: {
      skylar: {
        emotion: "happy",
        left: "20vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Skylar",
        text: "And this is the gym. I come here a lot since I'm on the volleyball team."
      },
      {
        speaker: "Skylar",
        text: "If you’re into sports, the teams here are pretty chill."
      },
      {
        speaker: "Skylar",
        text: "Want to keep going?",
        choices: [
          { text: "Cafeteria", next: "skylar_tour_cafeteria" },
          { text: "Library", next: "skylar_tour_library" },
          { text: "Nah, that’s enough.", next: "skylar_tour_end" }
        ]
      }
    ]
  },

  skylar_tour_end: {
    id: "skylar_tour_end",
    background: backgrounds.school.courtyard,

    cast: {
      skylar: {
        emotion: "friendly",
        left: "20vw",
        bottom: "0vh"
      }
    },

    script: [
      {
        speaker: "Skylar",
        text: "That’s pretty much the whole place. Not bad, right?"
      },
      {
        speaker: "Skylar",
        text: "If you ever want to hang out again, just find me."
      },
      {
        custom: () => {
          gameData.affection.skylar += 1;
        },
        next: "school_intro"
      }
    ]
  },


};
