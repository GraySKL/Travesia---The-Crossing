import type { Chapter } from '../game/types';

// Chapter 3 — "The Ones Who Stay." The POV shifts: for the first two chapters
// "you" were the new arrival on the borrowed couch; now "you" are MARÍA, the
// relative who has been here for years and whom the family leans on. Your cousin
// (the Ch1/Ch2 protagonist) has been taken in the worksite raid. This chapter is
// the other half of removal — grief, then mobilizing: searching, community /
// mutual aid, a family-preparedness plan, and teaching the children the same
// rights words Lucía taught at the plant. Tone: grounded, dignity-first,
// hopeful-but-honest. CONSEQUENCE OVER SCORE — the choices change who you become,
// not whether the injustice happened. The big rehearsal beat is narrative: the
// player, now María, RE-TEACHES the Ch2 rights vocabulary to the kids.
//
// TIMELINE: opens in the immediate aftermath of the raid — the cousin is DETAINED,
// not yet removed (removal is the end of a weeks-long process). The removal news
// lands quietly near the end, already anticipated; the chapter's weight is on
// response, not on re-treading Ch2's trauma.
//
// CHARACTER NOTE (gender neutrality): Ch1/Ch2 kept the protagonist ungendered
// ("tranquilo, tranquila"). Here the detained cousin is referenced in English as
// "your cousin" (English is gender-neutral) and the children call them "tío/tía"
// — keep whichever gender the player imagined. Flagged for the human/native pass.
//
// FACTUAL CLAIMS in this chapter (everything else is fiction) and their sources
// (the two NEW claims verified live 2026-06-01; the rights María teaches reuse
// Ch2's human-verified ILRC/NILC citations — full URLs + quotes in `sources`):
//  - ICE runs a public Online Detainee Locator System (ODLS); you can search by
//    full name + country of birth, and the A-number (the 8–9 digit number DHS/EOIR
//    stamps on a person) is the fastest, surest key. There can be a delay before
//    someone appears, and a person can be moved before the system updates; if a
//    search comes up empty, call the ICE ERO field office.
//      • ICE — Online Detainee Locator System (locator.ice.gov) + "Locating
//        Individuals in Detention" factsheet.
//  - Family-preparedness practice: gather documents into one folder, memorize key
//    phone numbers (a memorized number survives a confiscated phone), and name a
//    trusted caregiver for the children IN ADVANCE. The legal instrument differs
//    by state (a Caregiver's Authorization Affidavit vs. court guardianship), so
//    consult a lawyer — do not improvise the paperwork.
//      • ILRC — Step-by-Step Family Preparedness Plan.
//  - The rights María teaches the children: right to remain silent; no duty to
//    open the door without a warrant signed by a JUDGE (an ICE form is not one);
//    right to a lawyer (not at government expense); do not sign anything without
//    one. (Reused, human-verified in Ch2.)
//      • ILRC KYR one-pager; ILRC "When Confronted by ICE" flyer; NILC KYR.
//
// ACCURACY NUANCES honored in the writing:
//  1. The locator is shown as imperfect (delay, moves, the field-office fallback)
//     — not a magic "find" button.
//  2. Caregiver paperwork is shown as state-specific and lawyer-gated; María
//     writes down "the question and who to ask," she does not invent a document.
//  3. The rights words are explicitly shown as NOT a guarantee ("did not save your
//     cousin ... will not, by themselves, save anyone") — dignity, not a cheat code.
//
// AUDIO: provisional voices generated 2026-06-01 at the user's request, BEFORE
// human sign-off (same as Ch2 was); re-paced slower 2026-06-02 (user note: give
// emotions room to land). Per-line `audio` ids resolve to public/audio/stay/<id>.mp3;
// clip texts live in scripts/audio-manifest.mjs (the `stay` entry, kept `ready:false`
// so a plain `npm run audio` skips it). New roles SOFIA (the child) and ANA share
// Kokoro's sole Spanish female voice (ef_dora) with María/Rosa, nudged by speed —
// voices are near-identical by that limitation. Regenerate after any prose/Spanish
// change: `npm run audio -- --only stay --force`. New ambient bed `center` has no
// asset yet, so elCentro plays no bed. Mixed-language lines are SPLIT into
// per-language clips (theSearch-0a/b/c, theSearch-2a/b, elCentro-3a/b, elPlan-3a/b)
// so a Spanish voice (ef_dora) speaks the Spanish and the English narrator never
// mispronounces it — the Ch1 convention.
//
// SOURCING STATUS (story-vet 2026-06-01): NEEDS HUMAN REVIEW. Grounding PASS (all
// claims sourced; the under-sourced "minors not listed" aside was removed). Tone
// NEEDS HUMAN — measured / dignity-first, but the hardship beats require sign-off
// by rule. Spanish NEEDS HUMAN — grammatical, but DEFER to a native speaker on
// '¿Dónde está tío?' (tío/tía neutrality + child register), 'Sostengo la casa'
// (choice label), and the theChair choices. Disclaimer PASS (global BaseLayout
// footer, bilingual). HUMAN must read theChair + endStay/endVoice and a native
// speaker must confirm the flagged Spanish before this flips to SHIP.

export const chapterStay: Chapter = {
  id: 'stay',
  title: 'The Ones Who Stay',
  intro: 'The morning they take your cousin, the house does not fall. It waits for you to hold it up.',
  startScene: 'theChair',
  sources: [
    'ICE Online Detainee Locator System (ODLS) — public search for someone in ICE custody by full name + country of birth, A-number fastest; A-number is the 8–9 digit number on DHS/EOIR correspondence — ICE: https://locator.ice.gov/odls/ and "Locating Individuals in Detention": https://www.ice.gov/factsheets/locating-individuals-in-detention ("Use of ODLS requires the individual\'s full name, alien number (A-number) or date of birth, and country of birth."). Caveats (delay before a record appears, a person can be moved, call the ERO field office if not found) reflected per the same ICE guidance.',
    'Family-preparedness practice: gather documents, memorize phone numbers, and designate a trusted caregiver in advance; the legal instrument is state-specific (Caregiver\'s Authorization Affidavit vs. court guardianship) so consult a lawyer — ILRC, Step-by-Step Family Preparedness Plan: https://www.ilrc.org/resources/step-step-family-preparedness-plan ("A Caregiver\'s Authorization Affidavit (CAA) allows another adult to make certain school and medical decisions on behalf of your child ... it does not affect your parental rights."; guardianship/POA are "more formal" and you "should speak with an attorney").',
    'Right to remain silent; no duty to answer status/birthplace/entry questions — ILRC KYR one-pager (Aug 2025), human-verified in Ch2: https://www.ilrc.org/sites/default/files/2025-08/KYR-One-Page.pdf ("YOU HAVE THE RIGHT TO REMAIN SILENT. You do not have to answer questions about your immigration status, where you were born, or how you entered the country.").',
    'No duty to open the door without a judge-signed (judicial) warrant; an ICE administrative warrant is not one — ILRC, Know Your Rights When Confronted by ICE, human-verified in Ch2: https://www.ilrc.org/community-resources/know-your-rights/know-your-rights-when-confronted-ice-flyer ("You do not need to open your door unless an ICE agent shows you a warrant signed by a judge ... An administrative warrant ... is signed by ICE officials themselves, never by a judge.").',
    'Right to a lawyer but not at government expense; do not sign without one — NILC KYR (May 2025), human-verified in Ch2: https://media.nilc.org/wp-content/uploads/2025/05/KYR-What-To-Do-if-Immigration-Approaches-Arrests-or-Detains-You-ENG-May-2025.pdf ; statute 8 U.S.C. § 1362 ("the person concerned shall have the privilege of being represented (at no expense to the Government) by such counsel ... as he shall choose.").'
  ],
  scenes: {
    theChair: {
      id: 'theChair',
      mood: 'night',
      ambient: 'night',
      lines: [
        {
          segments: [
            {
              en: 'This time you are María. Not the new arrival on the borrowed couch — the one who has been here for years, the one with the keys, the one the family turns to. This morning the agents came to the plant. The couch is empty. Your cousin did not come home.'
            }
          ],
          audio: ['theChair-0']
        },
        {
          segments: [
            {
              en: 'The little ones know something is wrong the way children always do — from the shape of the silence. At dinner there is a plate, and a chair, and no one in it. Sofía, the oldest, will not touch her food.'
            }
          ],
          audio: ['theChair-1']
        },
        {
          speaker: 'Sofía',
          segments: [
            { es: '¿Dónde está tío?', gloss: 'Where is [tío/tía]?', note: 'tío/tía — the aunt or uncle she means; keep the gender you pictured' }
          ],
          audio: ['theChair-2']
        },
        {
          segments: [
            {
              en: 'Five faces turn to you. Whatever you say now, they will keep for a long time. You can give them the truth, gently — or you can give them one more ordinary night before the world gets smaller.'
            }
          ],
          audio: ['theChair-3']
        }
      ],
      choices: [
        {
          es: 'Les digo la verdad, con cuidado.',
          gloss: 'I tell them the truth, carefully.',
          next: 'theSearch',
          audio: 'theChair-c1',
          effects: [
            { type: 'flag', name: 'toldTruth' },
            { type: 'learn', vocab: { es: 'la verdad', en: 'the truth', note: 'la ver-DAD' } }
          ]
        },
        {
          es: 'Esta noche, los protejo del miedo.',
          gloss: 'Tonight, I protect them from the fear.',
          next: 'theSearch',
          audio: 'theChair-c2',
          effects: [
            { type: 'flag', name: 'shielded' },
            { type: 'learn', vocab: { es: 'proteger', en: 'to protect', note: 'pro-teh-HER' } }
          ]
        }
      ]
    },

    theSearch: {
      id: 'theSearch',
      mood: 'tense',
      ambient: 'night',
      lines: [
        {
          segments: [
            {
              en: 'After they sleep, you begin. A legal-aid number a neighbor once pressed into your hand. A notebook. What you need first is a number — not a phone number but an A-number: '
            },
            { es: 'un número de extranjero', gloss: 'an alien registration number (A-number)', note: 'the 8–9 digit number ICE uses instead of a name' },
            { en: ' — the digits the government stamps on a person and uses in place of their name.' }
          ],
          audio: ['theSearch-0a', 'theSearch-0b', 'theSearch-0c']
        },
        {
          segments: [
            {
              en: "There is a public system for this — ICE's online detainee locator. You can search by full name and country of birth; with the A-number it is faster and surer. You don't have the number yet. You have a name, a country, and the whole night."
            }
          ],
          audio: ['theSearch-1']
        },
        {
          segments: [
            {
              en: 'Sometimes the screen gives you nothing — the system has not caught up, or a person is moved before it does. When it does give you something, you write down a facility and a town you have never heard of. If it stays blank, there is a field office to call when the sun comes up.'
            },
            { es: ' No estás buscando sola.', gloss: "You aren't searching alone.", note: 'buscar = to look for, to search' }
          ],
          audio: ['theSearch-2a', 'theSearch-2b']
        },
        {
          segments: [
            {
              en: "Maybe a lawyer already has the file. Maybe there is only you and a list of numbers to call. Either way, you have started — and starting, tonight, is the opposite of nothing."
            }
          ],
          audio: ['theSearch-3']
        }
      ],
      choices: [
        {
          es: 'Sigo buscando.',
          gloss: 'I keep searching.',
          next: 'elCentro',
          audio: 'theSearch-c1',
          effects: [
            { type: 'learn', vocab: { es: 'buscar', en: 'to look for, to search', note: 'boos-KAR' } }
          ]
        }
      ]
    },

    elCentro: {
      id: 'elCentro',
      mood: 'warm',
      ambient: 'center',
      lines: [
        {
          segments: [
            {
              en: 'Rosa from two doors down finds you on the steps the next evening and does not ask if you are okay. She just says: come. She walks you to the basement of a church three blocks over, where folding chairs make a circle and the coffee is bad and free.'
            }
          ],
          audio: ['elCentro-0']
        },
        {
          speaker: 'Rosa',
          segments: [
            { es: 'Aquí nadie está solo.', gloss: 'Here, no one is alone.' },
            { en: ' ' },
            { es: 'Esto es apoyo mutuo.', gloss: 'This is mutual aid.', note: 'apoyo mutuo = neighbors helping neighbors — no charge, no forms' }
          ],
          audio: ['elCentro-1']
        },
        {
          segments: [
            {
              en: 'They are ordinary people — a retired teacher, a mechanic, two college kids with a clipboard. They keep a phone tree. They go with families to check-ins and to court so that no one has to walk in alone. They call it accompaniment.'
            }
          ],
          audio: ['elCentro-2']
        },
        {
          speaker: 'Ana',
          segments: [
            { es: 'Te acompañamos.', gloss: 'We go with you.', note: 'acompañar = to go alongside someone' },
            { en: ' Not instead of you. With you.' }
          ],
          audio: ['elCentro-3a', 'elCentro-3b']
        },
        {
          segments: [
            {
              en: 'You came in carrying it alone. You leave with a phone tree, two names, and the strange warmth of a room full of strangers who decided your family is theirs.'
            }
          ],
          audio: ['elCentro-4']
        }
      ],
      choices: [
        {
          es: 'No estamos solos. Estamos juntos.',
          gloss: "We're not alone. We're together.",
          next: 'elPlan',
          audio: 'elCentro-c1',
          effects: [
            { type: 'learn', vocab: { es: 'la comunidad', en: 'the community', note: 'co-moo-nee-DAD' } },
            { type: 'learn', vocab: { es: 'apoyo mutuo', en: 'mutual aid' } },
            { type: 'learn', vocab: { es: 'juntos', en: 'together', note: 'HOON-tos; juntas if all are women' } }
          ]
        }
      ]
    },

    elPlan: {
      id: 'elPlan',
      mood: 'hope',
      ambient: 'home',
      lines: [
        {
          segments: [
            {
              en: 'What you cannot stop, you can prepare for. You will not be caught flat-footed again. At the kitchen table, with the children and Don Beto, you make a plan — the kind the people at the church have helped a hundred families write.'
            }
          ],
          audio: ['elPlan-0']
        },
        {
          segments: [
            {
              en: "You gather documents into one folder: birth certificates, passports, the children's medical cards, the names of their schools and teachers, and a list of every important phone number — because a memorized number survives a confiscated phone."
            }
          ],
          audio: ['elPlan-1']
        },
        {
          segments: [
            {
              en: "You choose, out loud, who would care for the children if you were taken — a trusted adult, named now, not in a panic later. A lawyer can tell you the right paperwork where you live: a caregiver's authorization, or guardianship through a court. You do not guess at the law. You write down the question and who to ask."
            }
          ],
          audio: ['elPlan-2']
        },
        {
          segments: [
            { en: "You tape a red card to the refrigerator, beside the children's drawings. " },
            { es: 'Un plan de emergencia.', gloss: 'An emergency plan.', note: 'el plan = the plan' }
          ],
          audio: ['elPlan-3a', 'elPlan-3b']
        },
        {
          segments: [
            {
              en: 'Then you do the thing that matters most. You teach the children the words — the same words a woman named Lucía once taught your cousin on a break at the plant. You make it a game, so the fear stays small and the knowing stays large.'
            }
          ],
          audio: ['elPlan-4']
        },
        {
          speaker: 'María',
          segments: [
            { es: 'No abras la puerta sin una orden firmada por un juez.', gloss: "Don't open the door without a warrant signed by a judge.", note: "un juez = a judge; an ICE form is not a judge's warrant" }
          ],
          audio: ['elPlan-5']
        },
        {
          speaker: 'María',
          segments: [
            { es: 'Tienes derecho a guardar silencio.', gloss: 'You have the right to remain silent.', note: 'el derecho = the right' }
          ],
          audio: ['elPlan-6']
        },
        {
          speaker: 'María',
          segments: [
            { es: 'No firmes nada. Pide un abogado.', gloss: "Don't sign anything. Ask for a lawyer.", note: 'firmar = to sign; el abogado = the lawyer' }
          ],
          audio: ['elPlan-7']
        },
        {
          speaker: 'Sofía',
          segments: [
            { es: 'No abro la puerta. Pido un abogado.', gloss: "I don't open the door. I ask for a lawyer." }
          ],
          audio: ['elPlan-8']
        },
        {
          segments: [
            {
              en: 'Sofía repeats it back, solemn as a prayer, and you have to turn toward the sink so she does not see your face. The words did not save your cousin. They will not, by themselves, save anyone. But a person who knows them is harder to disappear.'
            }
          ],
          audio: ['elPlan-9']
        }
      ],
      choices: [
        {
          es: 'Me quedo cerca. Sostengo la casa.',
          gloss: 'I stay close. I hold the house together.',
          next: 'endStay',
          audio: 'elPlan-c1',
          effects: [
            { type: 'flag', name: 'heldClose' },
            { type: 'learn', vocab: { es: 'el plan de emergencia', en: 'the emergency plan' } },
            { type: 'learn', vocab: { es: 'el derecho', en: 'the right (legal)', note: 'reviewed — deh-REH-cho' } }
          ]
        },
        {
          es: 'Voy con los demás. Acompaño.',
          gloss: 'I go with the others. I accompany them.',
          next: 'endVoice',
          audio: 'elPlan-c2',
          effects: [
            { type: 'flag', name: 'joinedNetwork' },
            { type: 'learn', vocab: { es: 'acompañar', en: 'to accompany, to go with', note: 'reviewed — ah-com-pah-NYAR' } },
            { type: 'learn', vocab: { es: 'el abogado', en: 'the lawyer', note: 'reviewed — ah-bo-GA-do' } }
          ]
        }
      ]
    },

    endStay: {
      id: 'endStay',
      mood: 'hope',
      ambient: 'home',
      lines: [
        {
          segments: [
            {
              en: 'Weeks later the call comes that you already feared: a courtroom, a final order, a plane to a country that is not even theirs. You sit the children down and tell them the truth, carefully, the way you decided you would. The chair at the table stays empty. You do not pretend otherwise.'
            }
          ],
          audio: ['endStay-0']
        },
        {
          segments: [
            {
              en: 'But the house did not fall. There is a folder in the drawer and a red card on the fridge and a phone tree that answers on the second ring. The children know their rights better than you did at their age. Your cousin is on the other end of a bad phone line, far away — still a person, still yours — because you kept the line open.'
            }
          ],
          audio: ['endStay-1']
        }
      ],
      end: true,
      endNoteAudio: ['endStay-2'],
      endNote:
        'This is the part of the story that is on no card: the ones who stay. Removal takes a person from a place; it does not take them from their people — unless their people let it. You learned the words too late to save the morning they came, and just in time to make sure no one in this house ever meets that morning unprepared, or alone. That is what an ally is. Not a rescuer who arrives from outside. A neighbor who refuses to look away.'
    },

    endVoice: {
      id: 'endVoice',
      mood: 'hope',
      ambient: 'home',
      lines: [
        {
          segments: [
            {
              en: 'The order comes, and the plane, and the country that is not theirs — all the things you could not stop. You grieve. And then, on an ordinary Tuesday, you put on your coat and walk back to the church basement, and this time you are not the one being carried.'
            }
          ],
          audio: ['endVoice-0']
        },
        {
          segments: [
            {
              en: "You take the clipboard. You go with a family to a check-in so the mother does not walk in alone. You teach the words at the next meeting, in your cousin's accent, with your cousin's red card in your pocket. The fear did not leave. You just stopped letting it decide who you are."
            }
          ],
          audio: ['endVoice-1']
        }
      ],
      end: true,
      endNoteAudio: ['endVoice-2'],
      endNote:
        'Removal is built to make an example — to make everyone left behind smaller and quieter. You did the opposite. You turned a kitchen-table plan into a phone tree, a phone tree into a room, a room into the simple, stubborn fact that no one on this block gets taken in silence anymore. That is what an ally can become: not a witness to the harm, but a multiplier of the words that blunt it. Learn them. Teach them. Walk in beside the person who is afraid.'
    }
  }
};
