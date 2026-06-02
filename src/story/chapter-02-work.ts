import type { Chapter } from '../game/types';

// Chapter 2 — "The Job." The hard chapter: you find work and begin to build a
// life, and then it is taken — a worksite raid, detention, and removal to a
// third country. Tone: grounded, dignity-first. Detention and removal are
// rendered with restraint; the player's choice changes what is preserved
// (a lawyer, family, dignity), not whether injustice happens. Scaffolding fades
// from Chapter 1: more Spanish in the narration, the choices carry more weight.
//
// FACTUAL CLAIMS in this chapter (everything else is fiction) and their sources
// (all confirmed live & citable 2026-05-31; full URLs + quotes in `sources` below):
//  - ICE conducts worksite raids and worksite enforcement surged in 2025, mostly
//    arresting workers (not employers).
//      • American Immigration Council — Understanding ICE Worksite Raids (Oct 2025)
//  - You have the right to remain silent and need not answer questions about your
//    immigration status, birthplace, or how you entered.
//      • ILRC — Know Your Rights one-pager (Aug 2025)
//  - At home you don't have to open the door without a warrant signed by a JUDGE;
//    an ICE administrative warrant (Form I-200/I-205) is not a judicial warrant.
//      • ILRC — Know Your Rights When Confronted by ICE (flyer)
//  - You have the right to a lawyer, but the government will NOT provide one; do
//    not sign anything without speaking to a lawyer.
//      • NILC — KYR: If Immigration Approaches/Arrests/Detains You (May 2025)
//      • 8 U.S.C. § 1362 — counsel "at no expense to the Government"
//  - If arrested by ICE you may be held in a detention facility and may ask for a
//    bond hearing before an immigration judge (NOT everyone is bond-eligible).
//      • NILC — What to Do if Arrested or Detained by Immigration
//  - In 2025 the U.S. resumed "third-country removals" — deporting people to
//    countries that are not their country of origin — after the Supreme Court
//    allowed it to proceed (DHS v. D.V.D., stay granted June 23, 2025).
//      • SCOTUSblog — DHS v. D.V.D.; Council on Foreign Relations — third-country deportations
//
// ACCURACY NUANCES honored in the writing (per research):
//  1. The judge-signed-warrant point is taught for the HOME (the red card), not as
//     a shield at the worksite — at a workplace ICE generally needs no judicial
//     warrant to be present/approach workers. At the raid the operative rights are
//     silence, a lawyer, and signing nothing.
//  2. Third-country removal executes a prior FINAL order of removal (shown: the
//     judge issues the order; the origin country is slow to take the person back).
//  3. Bond is not universal; the character has no record, so it is plausibly
//     raised but never guaranteed ("talk," not a promise).
//  4. Signing papers can waive a hearing / speed removal — shown as the system
//     exploiting fear, never as the character's fault.
//
// AUDIO: `audio` ids resolve to public/audio/work/<id>.mp3 and `ambient` ids to
// public/audio/ambient/<bed>.mp3. Generate with `npm run audio -- --only work`
// AFTER human dignity sign-off (the manifest marks this chapter ready:false so it
// isn't recorded by default). Missing files fall back to on-device TTS; texts live
// in scripts/audio-manifest.mjs.

export const chapterWork: Chapter = {
  id: 'work',
  title: 'The Job',
  intro: 'You find work and begin to build a life — until the morning it is taken away.',
  startScene: 'morning',
  // Both removal endings (removalA / removalB) chain into Chapter 3, where the POV
  // shifts to María and the family left behind.
  nextChapter: 'stay',
  // SOURCING STATUS: SHIP. story-vet 2026-05-31 verdict was NEEDS HUMAN REVIEW
  // (mandatory for the detention/removal beats — NOT a quality concern; grounding
  // PASS, tone NEEDS HUMAN, Spanish PASS, disclaimer PASS). HUMAN SIGN-OFF 2026-06-01:
  // a human read detainedA/detainedB/courtA/removalA/removalB and approved the
  // detention + third-country-removal beats as restrained and dignity-first.
  // Spanish confirmed, keep as written: the agent's theRaid-2 formal "usted" line;
  // the choice "Contesto sus preguntas" (sus = formal-to-authority, deliberately not
  // las); and "No lo olvidaré" (neuter lo, deliberately not la). Applied earlier:
  // courtA "enters" (not "signs") a removal order (term of art). SOURCES human-
  // verified 2026-05-31: all links open and quotes accurately attributed. Prose was
  // UNCHANGED at sign-off, so the provisional 2026-06-01 audio (41 clips) stands —
  // no regeneration needed.
  sources: [
    'ICE conducts worksite raids; worksite enforcement surged in 2025, mostly arresting workers — American Immigration Council: https://www.americanimmigrationcouncil.org/fact-sheet/understanding-ice-worksite-raids/ ("In the first seven months of the second Trump administration, ICE has publicly reported at least 40 worksite enforcement actions resulting in over 1,100 arrests.").',
    'Right to remain silent; no duty to answer questions about status/birthplace/entry — ILRC Know Your Rights one-pager (Aug 2025): https://www.ilrc.org/sites/default/files/2025-08/KYR-One-Page.pdf ("YOU HAVE THE RIGHT TO REMAIN SILENT. You do not have to answer questions about your immigration status, where you were born, or how you entered the country.").',
    'At home, no duty to open the door without a judge-signed (judicial) warrant; an ICE administrative warrant is not one — ILRC, Know Your Rights When Confronted by ICE: https://www.ilrc.org/community-resources/know-your-rights/know-your-rights-when-confronted-ice-flyer ("You do not need to open your door unless an ICE agent shows you a warrant signed by a judge ... An administrative warrant, or ICE Warrant, is signed by ICE officials themselves, never by a judge.").',
    'Right to a lawyer but not at government expense; do not sign without a lawyer — NILC KYR (May 2025): https://media.nilc.org/wp-content/uploads/2025/05/KYR-What-To-Do-if-Immigration-Approaches-Arrests-or-Detains-You-ENG-May-2025.pdf ; statute 8 U.S.C. § 1362 ("the person concerned shall have the privilege of being represented (at no expense to the Government) by such counsel ... as he shall choose.").',
    'May be held in a detention facility; may ask for a bond hearing before an immigration judge (not everyone is eligible) — NILC: https://www.nilc.org/resources/know-your-rights-what-to-do-if-arrested-detained-immigration/ ("You may ask for a bond hearing before an immigration judge, who will decide whether you can be released and at what cost.").',
    'U.S. resumed third-country removals in 2025 after the Supreme Court allowed it (DHS v. D.V.D., stay granted June 23, 2025) — SCOTUSblog: https://www.scotusblog.com/cases/department-of-homeland-security-v-d-v/ ; documented destinations — Council on Foreign Relations: https://www.cfr.org/articles/what-are-third-country-deportations-and-why-trump-using-them ("Nearly a dozen countries ... have reportedly agreed to receive deportees with no existing ties to their nations under the Trump administration.").'
  ],
  scenes: {
    morning: {
      id: 'morning',
      mood: 'dawn',
      ambient: 'home',
      lines: [
        {
          segments: [
            {
              en: "Months pass. Winter thins into spring. The borrowed couch is still yours, but you are no longer a stranger — the language that used to slide past you now lands, word by word."
            }
          ],
          audio: ['morning-0']
        },
        {
          segments: [
            { en: 'Over coffee, María sets down her cup like she has been waiting to say it.' }
          ],
          audio: ['morning-1']
        },
        {
          speaker: 'María',
          segments: [
            { es: 'Conozco a alguien.', gloss: 'I know someone.' },
            { en: ' ' },
            { es: 'Tomás trabaja en la planta.', gloss: 'Tomás works at the plant.', note: 'la planta = the (processing) plant' }
          ],
          audio: ['morning-2']
        },
        {
          speaker: 'María',
          segments: [
            { en: 'It is hard work — cold, long hours. But they pay every Friday, and ' },
            { es: 'no hacen muchas preguntas.', gloss: "they don't ask many questions." }
          ],
          audio: ['morning-3']
        },
        {
          segments: [
            {
              en: 'A job. The first rung of everything the family talks about at night — the house, the door that locks, the kitchen that is yours.'
            }
          ],
          audio: ['morning-4']
        }
      ],
      choices: [
        {
          es: 'Necesito el trabajo.',
          gloss: 'I need the work.',
          next: 'firstDay',
          audio: 'morning-c1',
          effects: [{ type: 'learn', vocab: { es: 'el trabajo', en: 'work, the job' } }]
        },
        {
          es: '¿Es peligroso?',
          gloss: 'Is it dangerous?',
          next: 'firstDay',
          audio: 'morning-c2',
          effects: [
            { type: 'learn', vocab: { es: 'peligroso', en: 'dangerous', note: 'peh-lee-GRO-so' } }
          ]
        },
        {
          es: '¿Cuándo empiezo?',
          gloss: 'When do I start?',
          next: 'firstDay',
          audio: 'morning-c3',
          effects: [
            { type: 'learn', vocab: { es: 'empezar', en: 'to start, to begin', note: 'em-peh-SAR' } }
          ]
        }
      ]
    },

    firstDay: {
      id: 'firstDay',
      mood: 'warm',
      ambient: 'plant',
      lines: [
        {
          segments: [
            {
              en: 'The plant is a country of its own: white light, the roar of machines, a cold that gets into your hands and stays. You work the line beside a woman named Lucía, who shows you the rhythm without ever slowing her own.'
            }
          ],
          audio: ['firstDay-0']
        },
        {
          speaker: 'Lucía',
          segments: [
            { es: 'Tranquilo, tranquila.', gloss: 'Easy — take it slow.', note: 'she says both, so it fits anyone' },
            { en: ' ' },
            { es: 'Aquí nos cuidamos.', gloss: 'Here we look out for each other.', note: 'cuidarse = to take care of one another' }
          ],
          audio: ['firstDay-1']
        },
        {
          segments: [
            {
              en: 'By Friday there is a paper envelope with your name misspelled and cash inside. You send most of it home and keep a little. For the first time, you are building something of your own.'
            }
          ],
          audio: ['firstDay-2']
        }
      ],
      next: 'theCard'
    },

    theCard: {
      id: 'theCard',
      mood: 'warm',
      ambient: 'plant',
      lines: [
        {
          segments: [
            {
              en: 'One afternoon on break, Lucía presses a small red card into your hand. She keeps a stack of them, soft at the edges from being carried.'
            }
          ],
          audio: ['theCard-0']
        },
        {
          speaker: 'Lucía',
          segments: [
            { es: 'Guárdala.', gloss: 'Keep it.', note: 'guardar = to keep, to hold onto' },
            { en: ' ' },
            { es: 'Por si vienen.', gloss: 'In case they come.' }
          ],
          audio: ['theCard-1']
        },
        {
          segments: [
            {
              en: 'On the card, in two languages, a few short sentences. She reads them with you quietly — the way you memorize something you hope you never need.'
            }
          ],
          audio: ['theCard-2']
        },
        {
          speaker: 'Lucía',
          segments: [
            { es: 'Tienes derecho a guardar silencio.', gloss: 'You have the right to remain silent.', note: 'el derecho = the right' },
            { en: " You don't have to say where you were born, or how you got here." }
          ],
          audio: ['theCard-3']
        },
        {
          speaker: 'Lucía',
          segments: [
            { en: 'If they come to your home, ' },
            { es: 'no abras sin una orden firmada por un juez.', gloss: "don't open without a warrant signed by a judge.", note: 'un juez = a judge; an ICE form is not a judge’s warrant' }
          ],
          audio: ['theCard-4']
        },
        {
          speaker: 'Lucía',
          segments: [
            { es: 'No firmes nada.', gloss: "Don't sign anything.", note: 'firmar = to sign' },
            { en: ' ' },
            { es: 'Pide un abogado.', gloss: 'Ask for a lawyer.', note: 'el abogado = the lawyer' }
          ],
          audio: ['theCard-5']
        }
      ],
      choices: [
        {
          es: 'La guardo en mi bolsillo.',
          gloss: 'I keep it in my pocket.',
          next: 'theRaid',
          audio: 'theCard-c1',
          effects: [
            { type: 'learn', vocab: { es: 'guardar', en: 'to keep, to hold onto' } },
            { type: 'learn', vocab: { es: 'el derecho', en: 'the right (legal)', note: 'deh-REH-cho' } }
          ]
        },
        {
          es: 'Gracias, Lucía. No lo olvidaré.',
          gloss: "Thank you, Lucía. I won't forget it.",
          next: 'theRaid',
          audio: 'theCard-c2',
          effects: [
            { type: 'learn', vocab: { es: 'el abogado', en: 'the lawyer', note: 'ah-bo-GA-do' } }
          ]
        }
      ]
    },

    theRaid: {
      id: 'theRaid',
      mood: 'tense',
      ambient: 'raid',
      lines: [
        {
          segments: [
            {
              en: 'It is a Tuesday, mid-shift, when the doors bang open. Vests. Three letters across their backs: ICE. The line stops. Somewhere a tray hits the floor and no one moves to pick it up.'
            },
            { es: ' Una redada.', gloss: 'A raid.', note: 'la redada = the raid' }
          ],
          audio: ['theRaid-0']
        },
        {
          segments: [
            {
              en: 'An agent works down the line, asking each person the same two questions. Beside you, Lucía has gone very still. Your hand finds the red card in your pocket.'
            }
          ],
          audio: ['theRaid-1']
        },
        {
          speaker: 'Agent',
          segments: [
            { es: '¿Dónde nació?', gloss: 'Where were you born?', note: 'nació = were you born — formal' },
            { en: ' ' },
            { es: '¿Está usted en el país legalmente?', gloss: 'Are you in this country legally?', note: 'usted = formal “you” — cold, official' }
          ],
          audio: ['theRaid-2']
        }
      ],
      choices: [
        {
          es: 'Guardo silencio. Quiero un abogado.',
          gloss: "I'll stay silent. I want a lawyer.",
          next: 'detainedA',
          audio: 'theRaid-c1',
          effects: [
            { type: 'flag', name: 'assertedRights' },
            { type: 'learn', vocab: { es: 'guardar silencio', en: 'to remain silent' } },
            { type: 'learn', vocab: { es: 'Quiero un abogado.', en: 'I want a lawyer.' } }
          ]
        },
        {
          es: 'Contesto sus preguntas.',
          gloss: 'I answer their questions.',
          next: 'detainedB',
          audio: 'theRaid-c2',
          effects: [
            { type: 'flag', name: 'compliedFear' },
            { type: 'learn', vocab: { es: 'contestar', en: 'to answer', note: 'kon-tes-TAR' } }
          ]
        }
      ]
    },

    detainedA: {
      id: 'detainedA',
      mood: 'cold',
      ambient: 'detention',
      lines: [
        {
          segments: [
            {
              en: 'You say almost nothing. You ask for a lawyer, the way the card taught you, and when they push papers across the table you keep your hands in your lap. You do not sign.'
            }
          ],
          audio: ['detainedA-0']
        },
        {
          segments: [
            {
              en: 'They take you anyway. A van. A building with no clocks. A cold room shared with men who each carry a version of your morning. This is a detention facility; they can hold you here while your case moves, however long that takes.'
            }
          ],
          audio: ['detainedA-1']
        },
        {
          segments: [
            {
              en: 'You are allowed one phone call. You dial the legal-aid number from the back of the red card, then María — who is already, somehow, trying to find you.'
            }
          ],
          audio: ['detainedA-2']
        },
        {
          speaker: 'María',
          segments: [
            { es: 'No firmes nada.', gloss: "Don't sign anything." },
            { en: ' ' },
            { es: 'Te vamos a conseguir un abogado.', gloss: "We're going to get you a lawyer." }
          ],
          audio: ['detainedA-3']
        },
        {
          segments: [
            { en: 'No lawyer is handed to you here — the government does not provide one — but a nonprofit might take the case. There is talk of ' },
            { es: 'una fianza', gloss: 'a bond', note: 'money a judge may set for release while your case continues' },
            { en: ', of a hearing where a judge could weigh letting you out while you fight. Talk, not a promise. You hold onto it anyway.' }
          ],
          audio: ['detainedA-4']
        }
      ],
      next: 'courtA'
    },

    courtA: {
      id: 'courtA',
      mood: 'cold',
      ambient: 'detention',
      lines: [
        {
          segments: [
            {
              en: 'Weeks. Then a courtroom the size of a classroom and a judge on a screen. A volunteer lawyer stands beside you — found at the last hour by the legal-aid line and by María, who would not stop calling. It matters more than you can say, not to be alone at that table.'
            }
          ],
          audio: ['courtA-0']
        },
        {
          segments: [
            { en: 'But the law here is a narrow room. The judge enters a final order of removal — ' },
            { es: 'una orden de expulsión.', gloss: 'a removal order.', note: 'expulsión = removal / deportation' }
          ],
          audio: ['courtA-1']
        },
        {
          segments: [
            {
              en: 'Your lawyer files what can be filed. Nothing stops the order; it only slows it. You expect, at least, to be sent home — to the country whose language is in your mouth. But your country is slow to issue the papers to take you back, and the government has stopped waiting.'
            }
          ],
          audio: ['courtA-2']
        }
      ],
      next: 'removalA'
    },

    removalA: {
      id: 'removalA',
      mood: 'cold',
      ambient: 'tarmac',
      lines: [
        {
          segments: [
            {
              en: 'They wake you before dawn. On the tarmac an officer reads out the destination, and it is not your country. It is a name you have only heard in the news — a third country, one you have never seen, that has agreed to receive people who are not its own.'
            }
          ],
          audio: ['removalA-0']
        },
        {
          segments: [
            {
              en: 'You think of the house with the door that locks. You think of María, who knows your name and where they are taking you, and who is still on the phone with someone, somewhere, fighting. You still have your name. You still have the words Lucía gave you.'
            }
          ],
          audio: ['removalA-1']
        }
      ],
      end: true,
      endNoteAudio: ['removalA-2'],
      endNote:
        'You did everything right, and they removed you anyway — because the cruelty is written into the law, not into you. But you were not erased. A lawyer has your file. Your family knows where you are. The fight did not end on that tarmac. Knowing your rights did not spare you the injustice; it kept you a person inside it.'
    },

    detainedB: {
      id: 'detainedB',
      mood: 'cold',
      ambient: 'detention',
      lines: [
        {
          segments: [
            {
              en: 'Fear answers before you can. You tell them where you were born. When they slide a stack of papers across the table and tap a line at the bottom, your hand signs it — you cannot read it, and no one offers to explain.'
            }
          ],
          audio: ['detainedB-0']
        },
        {
          segments: [
            {
              en: 'Later, in the cold shared room, an older man asks what you signed. When you describe it, he goes quiet. You may have signed away a hearing you did not know you had — agreed to your own removal, just to make the fear stop sooner.'
            }
          ],
          audio: ['detainedB-1']
        },
        {
          segments: [
            {
              en: 'There is no lawyer here unless you find one, and you have no number, no name to call. The building has no clocks. The days lose their edges.'
            }
          ],
          audio: ['detainedB-2']
        }
      ],
      next: 'removalB'
    },

    removalB: {
      id: 'removalB',
      mood: 'cold',
      ambient: 'tarmac',
      lines: [
        {
          segments: [
            {
              en: 'It goes faster than you imagine. One pre-dawn there is a van, then a tarmac, then a plane. An officer reads a destination that is not your country — a third country, a place you have never been, that has agreed to take in people who are not its own.'
            }
          ],
          audio: ['removalB-0']
        },
        {
          segments: [
            {
              en: 'No one beyond these walls knows which plane, or where it lands. You hold your own name like the last thing left in your pockets.'
            }
          ],
          audio: ['removalB-1']
        }
      ],
      end: true,
      endNoteAudio: ['removalB-2'],
      endNote:
        'Fear is not a failing — it is exactly what the system is built to use, and you were used at your most afraid. That is not your fault. But carry this now, for yourself and for anyone you can warn: you have the right to stay silent, the right to a lawyer, the right to sign nothing until one is beside you. Those words are not magic. They are dignity. Learn them. Say them. Hand them to the next person.'
    }
  }
};
