import type { Chapter } from '../game/types';

// Chapter 1 — "Arrival." The hopeful opening: you reach a new country, reunite
// with family, and meet the dream of a home of one's own. Tone: warm, dignified.
//
// FACTUAL CLAIMS in this chapter (everything else is fiction) and their sources
// (all confirmed live & citable 2026-05-31; full URLs + quotes in `sources` below):
//  - "You don't need to be a citizen to own/buy a home in the U.S." — there is no
//    citizenship or immigration-status requirement to purchase real property.
//      • National Association of Realtors — rights of foreign citizens to own US property
//  - "Many families buy with an ITIN (a taxpayer ID) and a lender who works with
//    them." — the ITIN is issued by the IRS; some lenders offer ITIN mortgages.
//      • IRS — Individual Taxpayer Identification Number (ITIN)
//      • CFPB — getting a mortgage with an ITIN instead of an SSN
//  - "There are scams" targeting immigrant homebuyers — documented consumer warning.
//      • FTC Consumer Advice — scams against immigrants (incl. "notario" fraud)
//
// AUDIO: `audio` ids resolve to public/audio/arrival/<id>.mp3 and `ambient` ids to
// public/audio/ambient/<bed>.mp3 (generate with `npm run audio`). Any missing file
// falls back to on-device TTS. Texts live in scripts/audio-manifest.mjs; tone notes
// in docs/audio/chapter-01-ai-voice-script.md.

export const chapterArrival: Chapter = {
  id: 'arrival',
  title: 'Arrival',
  intro: 'You arrive. You barely speak the language. But you are not alone.',
  startScene: 'arrival',
  nextChapter: 'work',
  // SOURCING STATUS (story-vet 2026-05-31): verdict SHIP. All four factual claims
  // have confirmed, live, citable URLs (NAR, IRS, CFPB, FTC) in `sources` below,
  // each with a supporting quote. All four checks PASS — grounding, tone & dignity,
  // Spanish accuracy, and the bilingual disclaimer (inherited from BaseLayout).
  sources: [
    'No U.S. citizenship/immigration-status requirement to own or buy real property — National Association of Realtors: https://www.nar.realtor/immigration-issues-and-visa-reform ("NAR supports the rights of foreign citizens to acquire, own and sell U.S. real property").',
    'ITIN is an IRS taxpayer ID for people who cannot get an SSN — IRS: https://www.irs.gov/individuals/individual-taxpayer-identification-number ("a tax processing number the IRS issues to people who cannot get a social security number so they can comply with U.S. tax laws"). Note: the IRS page itself does not cover mortgages.',
    'Some lenders offer ITIN mortgages — CFPB: https://www.consumerfinance.gov/ask-cfpb/can-i-get-a-mortgage-with-an-individual-taxpayer-identification-number-itin-instead-of-a-social-security-number-en-2159/ ("Some lenders have mortgage programs tailored for ITIN holders, but you might need a higher down payment and you might pay a higher interest rate compared to loans offered to people with Social Security numbers").',
    'Scams target immigrants, including "notario" fraud — FTC Consumer Advice: https://consumer.ftc.gov/features/scams-against-immigrants ("Scammers sometimes call themselves notarios to convince you they are able to provide immigration assistance").'
  ],
  scenes: {
    arrival: {
      id: 'arrival',
      mood: 'dawn',
      ambient: 'depot',
      lines: [
        {
          segments: [
            {
              en: "The bus exhales and the doors fold open. You step down into a parking lot washed pale by early light. You don't know this city. You barely know the language."
            }
          ],
          audio: ['arrival-0']
        },
        {
          segments: [
            { en: 'Across the lot, someone is waving both arms over their head — a woman, grinning.' }
          ],
          audio: ['arrival-1']
        },
        {
          speaker: 'A voice',
          segments: [
            { es: '¡Aquí! ¡Aquí!', gloss: 'Over here! Over here!', note: 'ah-KEE' },
            { en: ' she calls, almost laughing.' }
          ],
          audio: ['arrival-2', 'arrival-2b']
        }
      ],
      next: 'greeting'
    },

    greeting: {
      id: 'greeting',
      mood: 'warm',
      ambient: 'depot',
      lines: [
        {
          segments: [
            { en: 'She reaches you out of breath and pulls you into a hug that nearly knocks you over.' }
          ],
          audio: ['greeting-0']
        },
        {
          speaker: 'María',
          segments: [
            { es: '¡Qué alegría verte!', gloss: 'What a joy to see you!', note: 'gender-neutral greeting' },
            { en: ' ' },
            { es: 'Soy tu prima, María.', gloss: "I'm your cousin, María.", note: 'prima = female cousin' }
          ],
          audio: ['greeting-1']
        },
        {
          segments: [
            { en: "Prima. Cousin. You've only ever seen her face in photographs. Here she is, warm and real and smelling of coffee." }
          ],
          audio: ['greeting-2']
        }
      ],
      choices: [
        {
          es: 'Gracias, prima.',
          gloss: 'Thank you, cousin.',
          next: 'carRide',
          audio: 'greeting-c1',
          effects: [
            { type: 'learn', vocab: { es: 'gracias', en: 'thank you', note: 'GRAH-see-as' } },
            { type: 'learn', vocab: { es: 'prima', en: 'cousin (female)' } }
          ]
        },
        {
          es: 'Tengo mucho sueño.',
          gloss: "I'm very sleepy.",
          next: 'carRide',
          audio: 'greeting-c2',
          effects: [
            { type: 'learn', vocab: { es: 'tener sueño', en: 'to be sleepy', note: "lit. 'to have sleep' — gender-neutral" } }
          ]
        },
        {
          es: '¿Dónde vamos?',
          gloss: 'Where are we going?',
          next: 'carRide',
          audio: 'greeting-c3',
          effects: [
            { type: 'learn', vocab: { es: '¿dónde vamos?', en: 'where are we going?' } }
          ]
        }
      ]
    },

    carRide: {
      id: 'carRide',
      mood: 'warm',
      ambient: 'car',
      lines: [
        {
          segments: [
            { en: 'María drives an old sedan with a pine air-freshener swinging from the mirror. The city slides past — gas stations, a laundromat, a church.' }
          ],
          audio: ['carRide-0']
        },
        {
          speaker: 'María',
          segments: [
            { es: 'Vas a quedarte con nosotros.', gloss: "You're going to stay with us." },
            { en: ' ' },
            { es: 'La familia ya está esperando.', gloss: 'The family is already waiting.' }
          ],
          audio: ['carRide-1']
        },
        {
          segments: [
            { en: 'She talks the whole way. Then, slowing for a light, she says one word like it is a small prayer:' }
          ],
          audio: ['carRide-2']
        },
        {
          speaker: 'María',
          segments: [
            { es: 'Una casa.', gloss: 'A house.', note: 'casa = house' },
            { en: ' Our own house. Someday.' }
          ],
          audio: ['carRide-3', 'carRide-3b']
        }
      ],
      next: 'home'
    },

    home: {
      id: 'home',
      mood: 'hope',
      ambient: 'home',
      lines: [
        {
          segments: [
            { en: 'The apartment is small and full. Cousins, a baby, a television murmuring. The whole room turns when you walk in.' }
          ],
          audio: ['home-0']
        },
        {
          speaker: 'Tía Rosa',
          segments: [
            { es: 'Pasa, pasa.', gloss: 'Come in, come in.' },
            { en: ' ' },
            { es: 'Estás en tu casa.', gloss: 'Make yourself at home.', note: "lit. 'you are in your house'" }
          ],
          audio: ['home-1']
        },
        {
          segments: [
            { en: 'There is rice and beans and a plate already set for you, as if they knew the exact hour you would arrive. Maybe they did.' }
          ],
          audio: ['home-2']
        }
      ],
      choices: [
        {
          es: '¿Y la casa?',
          gloss: 'And the house?',
          next: 'houseTalk',
          audio: 'home-c1',
          effects: [{ type: 'flag', name: 'interestedInHouse' }]
        },
        {
          es: 'Necesito descansar.',
          gloss: 'I need to rest.',
          next: 'houseTalk',
          audio: 'home-c2',
          effects: [
            { type: 'learn', vocab: { es: 'descansar', en: 'to rest', note: 'des-kan-SAR' } }
          ]
        }
      ]
    },

    houseTalk: {
      id: 'houseTalk',
      mood: 'warm',
      ambient: 'home',
      lines: [
        {
          segments: [
            { en: "Later, the talk circles back to the house. María's neighbor, Don Beto, has come by — he counsels families at the community center." }
          ],
          audio: ['houseTalk-0']
        },
        {
          speaker: 'Don Beto',
          segments: [
            { es: 'Muchos creen que no pueden comprar una casa sin papeles.', gloss: "Many believe they can't buy a house without papers." },
            { en: ' He shakes his head.' }
          ],
          audio: ['houseTalk-1', 'houseTalk-1b']
        },
        {
          speaker: 'Don Beto',
          segments: [
            { en: "But owning a home isn't about immigration status. " },
            { es: 'No necesitas ser ciudadano.', gloss: "You don't need to be a citizen.", note: 'ciudadano = citizen' },
            { en: ' Plenty of families buy with an ITIN — a taxpayer ID — and a lender who works with them.' }
          ],
          audio: ['houseTalk-2a', 'houseTalk-2b', 'houseTalk-2c']
        },
        {
          segments: [{ en: 'He lowers his voice, kind but serious.' }],
          audio: ['houseTalk-3']
        },
        {
          speaker: 'Don Beto',
          segments: [
            { en: 'Just — be careful who you trust with your money. ' },
            { es: 'Hay estafas.', gloss: 'There are scams.', note: 'estafa = scam' }
          ],
          audio: ['houseTalk-4a', 'houseTalk-4b']
        }
      ],
      choices: [
        {
          es: 'Quiero aprender más.',
          gloss: 'I want to learn more.',
          next: 'endHopeful',
          requires: 'interestedInHouse',
          audio: 'houseTalk-c1',
          effects: [
            { type: 'learn', vocab: { es: 'aprender', en: 'to learn', note: 'ah-pren-DER' } }
          ]
        },
        {
          es: 'Gracias, Don Beto.',
          gloss: 'Thank you, Don Beto.',
          next: 'endRest',
          audio: 'houseTalk-c2'
        }
      ]
    },

    endHopeful: {
      id: 'endHopeful',
      mood: 'hope',
      ambient: 'night',
      lines: [
        {
          segments: [
            { en: 'That night you sleep on a borrowed couch under a borrowed blanket, in a country that does not yet know your name.' }
          ],
          audio: ['endHopeful-0']
        },
        {
          segments: [
            { en: 'Down the hall, the family is still talking — about work, about papers, about a house with a door that locks and a kitchen that is theirs. Tomorrow you will go with María to the community center.' }
          ],
          audio: ['endHopeful-1']
        }
      ],
      end: true,
      endNoteAudio: ['endHopeful-2'],
      endNote:
        'You asked. You leaned in. The dream of a home is real and, it turns out, possible — but everything good here will have to be fought for. The hard part has not come yet.'
    },

    endRest: {
      id: 'endRest',
      mood: 'night',
      ambient: 'night',
      lines: [
        {
          segments: [
            { en: 'You are asleep before the dishes are done, on a borrowed couch under a borrowed blanket, in a country that does not yet know your name.' }
          ],
          audio: ['endRest-0']
        },
        {
          segments: [
            { en: 'Down the hall, the family talks softly so as not to wake you — about work, about papers, about a house, someday.' }
          ],
          audio: ['endRest-1']
        }
      ],
      end: true,
      endNoteAudio: ['endRest-2'],
      endNote:
        'You needed rest, and that is allowed. The house, the questions, the long road — they will all still be there in the morning. The hard part has not come yet.'
    }
  }
};
