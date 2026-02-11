
(()=>{
  var list = [
    "assets/maya/happy.png",
    "assets/skylar/happy.png",
    "assets/amanda/happy.png",
    "assets/valentina/happy.png",
    "assets/elena/happy.png",
  ];
  for (var i = 1; i <= 2; i++) {
    var j = Math.floor(Math.random()*list.length);
    var char = document.getElementById("char"+i);
    char.src = list.splice(j,1)[0];
  }
})();

const defaultGameData = {
    affection: {
      girl: 0,
      girl2: 0
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
      angry: "assets/maya/angry.png",
      annoyed: "assets/maya/annoyed.png",
      confused: "assets/maya/confused.png",
      cringe: "assets/maya/cringe.png",
      crying: "assets/maya/crying.png",
      disgust: "assets/maya/disgust.png",
      embarrassed: "assets/maya/embarrassed.png",
      fearful: "assets/maya/fearful.png",
      flustered: "assets/maya/flustered.png",
      friendly: "assets/maya/friendly.png",
      happy: "assets/maya/happy.png",
      horny: "assets/maya/horny.png",
      horny2: "assets/maya/horny-2.png",
      hungry: "assets/maya/hungry.png",
      laughing: "assets/maya/laughing.png",
      listening: "assets/maya/listening.png",
      neutral: "assets/maya/neutral.png",
      sad: "assets/maya/sad.png",
      scared: "assets/maya/scared.png",
      shocked: "assets/maya/shocked.png",
      shy: "assets/maya/shy.png",
      smug: "assets/maya/smug.png",
      tease: "assets/maya/tease.png",
      wailing: "assets/maya/wailing.png",
      wonder: "assets/maya/wonder.png",
      worried: "assets/maya/worried.png"
    }
  },
  skylar: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      happy: "assets/skylar/happy.png",
      friendly: "assets/skylar/happy.png",
      talking: "assets/skylar/happy.png",
      neutral: "assets/skylar/neutral.png",
    }
  },
  amanda: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      happy: "assets/amanda/happy.png",
      neutral: "assets/amanda/neutral.png",
    }
  },
  valentina: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      happy: "assets/valentina/happy.png",
      neutral: "assets/valentina/neutral.png",
    }
  },
  elena: {
    defaults: {
      emotion: "neutral",
      bottom: "0vh",
      height: "80vh"
    },
    emotions: {
      happy: "assets/elena/happy.png",
      neutral: "assets/elena/neutral.png",
    }
  }
};

var backgrounds = {
  black: "assets/backgrounds/black.png",
  school: "assets/backgrounds/school.jpg",
  courtyard: "assets/backgrounds/courtyard.png",
  hallway: "assets/backgrounds/hallway.png",
  rooftop: "assets/backgrounds/hallway-nice.png", // Does not exist
  classroom: "assets/backgrounds/classroom.jpg",
  gym: "assets/backgrounds/gym.jpg",
  bedroom: "assets/backgrounds/bedroom.jpg",
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
        background: backgrounds.school_side_entrance
      },
      {
        speaker: "Narrator",
        text: "You are alone.",
        background: backgrounds.black
      },
      {
        speaker: "Narrator",
        text: "Most of your friends have already graduated. You never bothered meeting the younger classes.",
      },
      {
        speaker: "Narrator",
        text: "Your friends in your grade are all taking easier classes their senior year, but you need to lock in.",
      },
      {
        speaker: "Narrator",
        text: "You arrive in your calculus class, slightly late.",
        background: backgrounds.calculus_classroom
      },
      {
        speaker: "Narrator",
        text: "Seating is already chosen, but there is an open seat next to a girl.",
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
    background: backgrounds.school,

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
    background: backgrounds.courtyard,

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
    background: backgrounds.classroom,

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
    background: backgrounds.classroom,

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
    background: backgrounds.classroom,

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
    background: backgrounds.classroom,

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
    background: backgrounds.classroom,

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
    background: backgrounds.classroom,

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
    background: backgrounds.classroom,

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
    background: backgrounds.courtyard,

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
    background: backgrounds.courtyard,

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
    background: backgrounds.cafeteria,

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
        text: "Pro tip: never get the ‘mystery stew’ on Thursdays."
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
    background: backgrounds.library,

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
        text: "If you ever need to hide from Maya, this is your spot."
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
    background: backgrounds.gym,

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
    background: backgrounds.courtyard,

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
          gameData.affection.skylar = (gameData.affection.skylar || 0) + 1;
        },
        next: "school_intro"
      }
    ]
  },


};
