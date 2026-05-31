import type { Chapter } from '../../game/types';

// Chapter 1 — "Arrival." The hopeful opening: you reach a new country, reunite
// with family, and meet the dream of a home of one's own. Tone: warm, dignified.
//
// FACTUAL CLAIMS in this chapter (everything else is fiction) and their sources:
//  - "You don't need to be a citizen to own/buy a home in the U.S." — there is no
//    citizenship or immigration-status requirement to purchase real property.
//      • American Immigration Council — immigrants and homeownership
//      • National Association of Realtors — immigrant homeownership
//  - "Many families buy with an ITIN (a taxpayer ID) and a lender who works with
//    them." — ITIN mortgage products exist; the ITIN is issued by the IRS.
//      • IRS — Individual Taxpayer Identification Number (ITIN)
//  - "There are scams" targeting immigrant homebuyers — documented consumer warning.
//      • CFPB / FTC consumer warnings on real-estate and notario fraud
// These are stated qualitatively and must be confirmed by story-vet before ship.

export const chapterArrival: Chapter = {
  id: 'arrival',
  title: 'Arrival',
  intro: 'You arrive. You barely speak the language. But you are not alone.',
  startScene: 'arrival',
  // SOURCING STATUS (story-vet 2026-05-31): verdict NEEDS HUMAN — web fetch was
  // blocked in the build environment, so the non-IRS URLs below are unverified.
  // A human with web access must confirm live, citable pages before ship.
  sources: [
    'No citizenship/immigration-status requirement to own US property — CONFIRM live URL (American Immigration Council or National Association of Realtors). Legally accurate as a general principle; exact citation pending.',
    'ITIN is an IRS taxpayer ID for people without an SSN — CONFIRMED: https://www.irs.gov/individuals/individual-taxpayer-identification-number (note: IRS page does NOT cover mortgages).',
    'ITIN mortgages accepted by some lenders — SOURCE NEEDED: dedicated citation (e.g., HUD, NCRC, or a specific lender program). The ITIN→mortgage link is not covered by the IRS page above.',
    'Scams targeting immigrant homebuyers ("notario"/real-estate fraud) — CONFIRM live URL (FTC ftc.gov/scams or a current CFPB consumer alert).'
  ],
  scenes: {
    arrival: {
      id: 'arrival',
      mood: 'dawn',
      lines: [
        {
          segments: [
            {
              en: "The bus exhales and the doors fold open. You step down into a parking lot washed pale by early light. You don't know this city. You barely know the language."
            }
          ]
        },
        {
          segments: [
            { en: 'Across the lot, someone is waving both arms over their head — a woman, grinning.' }
          ]
        },
        {
          speaker: 'A voice',
          segments: [
            { es: '¡Aquí! ¡Aquí!', gloss: 'Over here! Over here!', note: 'ah-KEE' },
            { en: ' she calls, almost laughing.' }
          ]
        }
      ],
      next: 'greeting'
    },

    greeting: {
      id: 'greeting',
      mood: 'warm',
      lines: [
        {
          segments: [
            { en: 'She reaches you out of breath and pulls you into a hug that nearly knocks you over.' }
          ]
        },
        {
          speaker: 'María',
          segments: [
            { es: '¡Qué alegría verte!', gloss: 'What a joy to see you!', note: 'gender-neutral greeting' },
            { en: ' ' },
            { es: 'Soy tu prima, María.', gloss: "I'm your cousin, María.", note: 'prima = female cousin' }
          ]
        },
        {
          segments: [
            { en: "Prima. Cousin. You've only ever seen her face in photographs. Here she is, warm and real and smelling of coffee." }
          ]
        }
      ],
      choices: [
        {
          es: 'Gracias, prima.',
          gloss: 'Thank you, cousin.',
          next: 'carRide',
          effects: [
            { type: 'learn', vocab: { es: 'gracias', en: 'thank you', note: 'GRAH-see-as' } },
            { type: 'learn', vocab: { es: 'prima', en: 'cousin (female)' } }
          ]
        },
        {
          es: 'Tengo mucho sueño.',
          gloss: "I'm very sleepy.",
          next: 'carRide',
          effects: [
            { type: 'learn', vocab: { es: 'tener sueño', en: 'to be sleepy', note: "lit. 'to have sleep' — gender-neutral" } }
          ]
        },
        {
          es: '¿Dónde vamos?',
          gloss: 'Where are we going?',
          next: 'carRide',
          effects: [
            { type: 'learn', vocab: { es: '¿dónde vamos?', en: 'where are we going?' } }
          ]
        }
      ]
    },

    carRide: {
      id: 'carRide',
      mood: 'warm',
      lines: [
        {
          segments: [
            { en: 'María drives an old sedan with a pine air-freshener swinging from the mirror. The city slides past — gas stations, a laundromat, a church.' }
          ]
        },
        {
          speaker: 'María',
          segments: [
            { es: 'Vas a quedarte con nosotros.', gloss: "You're going to stay with us." },
            { en: ' ' },
            { es: 'La familia ya está esperando.', gloss: 'The family is already waiting.' }
          ]
        },
        {
          segments: [
            { en: 'She talks the whole way. Then, slowing for a light, she says one word like it is a small prayer:' }
          ]
        },
        {
          speaker: 'María',
          segments: [
            { es: 'Una casa.', gloss: 'A house.', note: 'casa = house' },
            { en: ' Our own house. Someday.' }
          ]
        }
      ],
      next: 'home'
    },

    home: {
      id: 'home',
      mood: 'hope',
      lines: [
        {
          segments: [
            { en: 'The apartment is small and full. Cousins, a baby, a television murmuring. The whole room turns when you walk in.' }
          ]
        },
        {
          speaker: 'Tía Rosa',
          segments: [
            { es: 'Pasa, pasa.', gloss: 'Come in, come in.' },
            { en: ' ' },
            { es: 'Estás en tu casa.', gloss: 'Make yourself at home.', note: "lit. 'you are in your house'" }
          ]
        },
        {
          segments: [
            { en: 'There is rice and beans and a plate already set for you, as if they knew the exact hour you would arrive. Maybe they did.' }
          ]
        }
      ],
      choices: [
        {
          es: '¿Y la casa?',
          gloss: 'And the house?',
          next: 'houseTalk',
          effects: [{ type: 'flag', name: 'interestedInHouse' }]
        },
        {
          es: 'Necesito descansar.',
          gloss: 'I need to rest.',
          next: 'houseTalk',
          effects: [
            { type: 'learn', vocab: { es: 'descansar', en: 'to rest', note: 'des-kan-SAR' } }
          ]
        }
      ]
    },

    houseTalk: {
      id: 'houseTalk',
      mood: 'warm',
      lines: [
        {
          segments: [
            { en: "Later, the talk circles back to the house. María's neighbor, Don Beto, has come by — he counsels families at the community center." }
          ]
        },
        {
          speaker: 'Don Beto',
          segments: [
            { es: 'Muchos creen que no pueden comprar una casa sin papeles.', gloss: "Many believe they can't buy a house without papers." },
            { en: ' He shakes his head.' }
          ]
        },
        {
          speaker: 'Don Beto',
          segments: [
            { en: "But owning a home isn't about immigration status. " },
            { es: 'No necesitas ser ciudadano.', gloss: "You don't need to be a citizen.", note: 'ciudadano = citizen' },
            { en: ' Plenty of families buy with an ITIN — a taxpayer ID — and a lender who works with them.' }
          ]
        },
        {
          segments: [{ en: 'He lowers his voice, kind but serious.' }]
        },
        {
          speaker: 'Don Beto',
          segments: [
            { en: 'Just — be careful who you trust with your money. ' },
            { es: 'Hay estafas.', gloss: 'There are scams.', note: 'estafa = scam' }
          ]
        }
      ],
      choices: [
        {
          es: 'Quiero aprender más.',
          gloss: 'I want to learn more.',
          next: 'endHopeful',
          requires: 'interestedInHouse',
          effects: [
            { type: 'learn', vocab: { es: 'aprender', en: 'to learn', note: 'ah-pren-DER' } }
          ]
        },
        {
          es: 'Gracias, Don Beto.',
          gloss: 'Thank you, Don Beto.',
          next: 'endRest'
        }
      ]
    },

    endHopeful: {
      id: 'endHopeful',
      mood: 'hope',
      lines: [
        {
          segments: [
            { en: 'That night you sleep on a borrowed couch under a borrowed blanket, in a country that does not yet know your name.' }
          ]
        },
        {
          segments: [
            { en: 'Down the hall, the family is still talking — about work, about papers, about a house with a door that locks and a kitchen that is theirs. Tomorrow you will go with María to the community center.' }
          ]
        }
      ],
      end: true,
      endNote:
        'You asked. You leaned in. The dream of a home is real and, it turns out, possible — but everything good here will have to be fought for. The hard part has not come yet.'
    },

    endRest: {
      id: 'endRest',
      mood: 'night',
      lines: [
        {
          segments: [
            { en: 'You are asleep before the dishes are done, on a borrowed couch under a borrowed blanket, in a country that does not yet know your name.' }
          ]
        },
        {
          segments: [
            { en: 'Down the hall, the family talks softly so as not to wake you — about work, about papers, about a house, someday.' }
          ]
        }
      ],
      end: true,
      endNote:
        'You needed rest, and that is allowed. The house, the questions, the long road — they will all still be there in the morning. The hard part has not come yet.'
    }
  }
};
