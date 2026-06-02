// Audio production manifest — the editorial source of truth for the voice clips.
// The Kokoro generator reads this via scripts/audio-kokoro.mjs and writes mp3s
// into public/audio/<chapterId>/<id>.mp3. AUTHORING-TIME ONLY; nothing here ships,
// and the app makes no runtime network calls.
//
// KEEP IN SYNC with the chapter prose in src/story/*. If you change a line's text
// there, update its clip text here and re-run with --force for that clip. Clip ids
// match the `audio` ids wired into the chapter data.
//
// `direction` is a human-only tone note; it is not spoken. The role→voice mapping
// lives in scripts/generate-audio-kokoro.py (NOT here).

// ---------------------------------------------------------------------------
// AMBIENT BEDS — record of the looping background prompts (one per scene mood).
// Kokoro is TTS-only, so these are NOT generated here; the files in
// public/audio/ambient/<id>.mp3 are static assets (the engine loops + quiets them
// at volume ~0.22). To re-source for a fully clean license, use CC0 field
// recordings (e.g. freesound.org, CC0-filtered) matching these descriptions.
// ---------------------------------------------------------------------------
export const beds = {
  depot:     { duration: 18, prompt: 'Quiet early-morning bus depot ambience: low diesel engine idle, occasional air-brake hiss, sparse distant footsteps on asphalt, a few faint birds. Calm, spacious, no music.' },
  car:       { duration: 18, prompt: 'Interior of an old sedan driving through a city: steady engine hum, faint turn-signal tick, muffled traffic outside, occasional passing car. Low and steady, no music, no clear speech.' },
  home:      { duration: 18, prompt: 'Warm, full family apartment indoors: overlapping gentle chatter (indistinct, no clear words), a baby cooing softly, faint television murmur, occasional dishes and utensils. Cozy, no music.' },
  night:     { duration: 18, prompt: 'Quiet apartment late at night: soft refrigerator hum, a faint ticking clock, distant muffled voices down a hallway, faint street sounds outside. Very low and still, no music.' },
  plant:     { duration: 18, prompt: 'Inside a cold food-processing plant: steady industrial machine hum, conveyor rhythm, distant metallic clatter, fluorescent buzz, faint indistinct workers. Constant, mechanical, no music.' },
  raid:      { duration: 18, prompt: 'Tense interior moment: fluorescent buzz, machines winding down, distant muffled commotion and footfalls, a faint ringing tension. Restrained and uneasy, no shouting in clear words, no music.' },
  detention: { duration: 18, prompt: 'Cold institutional holding room: low fluorescent hum, a distant heavy door closing and echoing, faint indistinct murmur of many people, hard reflective surfaces. Bleak, sparse, no music.' },
  tarmac:    { duration: 18, prompt: 'Pre-dawn airfield tarmac: steady wind, a distant jet engine idling, faint mechanical clanks, vast open emptiness. Cold, lonely, sparse, no music.' },
  center:    { duration: 18, prompt: 'Community meeting in a church basement: a small group settling into folding chairs, low warm overlapping voices (indistinct), a coffee urn humming, occasional chair scrape on tile. Calm, hopeful, human, no music.' }
};

// ---------------------------------------------------------------------------
// CHAPTERS — clips in play order. `ready: false` chapters are skipped unless you
// target them with `--only <id>` (so we don't record voice for prose still
// awaiting human sign-off).
// ---------------------------------------------------------------------------
export const chapters = [
  {
    id: 'arrival',
    ready: true,
    clips: [
      // scene: arrival
      { id: 'arrival-0', voice: 'NARRATOR', lang: 'en', direction: 'quiet, weary, a little lost', text: "The bus exhales and the doors fold open. You step down into a parking lot washed pale by early light. You don't know this city. You barely know the language." },
      { id: 'arrival-1', voice: 'NARRATOR', lang: 'en', direction: 'a lift of hope', text: 'Across the lot, someone is waving both arms over their head — a woman, grinning.' },
      { id: 'arrival-2', voice: 'MARIA', lang: 'es', direction: 'calling across the lot, almost laughing', text: '¡Aquí! ¡Aquí!' },
      { id: 'arrival-2b', voice: 'NARRATOR', lang: 'en', direction: 'soft tag line', text: 'she calls, almost laughing.' },
      // scene: greeting
      { id: 'greeting-0', voice: 'NARRATOR', lang: 'en', text: 'She reaches you out of breath and pulls you into a hug that nearly knocks you over.' },
      { id: 'greeting-1', voice: 'MARIA', lang: 'es', direction: 'overflowing; "prima" said with pride', text: '¡Qué alegría verte! Soy tu prima, María.' },
      { id: 'greeting-2', voice: 'NARRATOR', lang: 'en', text: "Prima. Cousin. You've only ever seen her face in photographs. Here she is, warm and real and smelling of coffee." },
      { id: 'greeting-c1', voice: 'MARIA', lang: 'es', direction: 'pronunciation model, clear but natural', text: 'Gracias, prima.' },
      { id: 'greeting-c2', voice: 'MARIA', lang: 'es', direction: 'pronunciation model', text: 'Tengo mucho sueño.' },
      { id: 'greeting-c3', voice: 'MARIA', lang: 'es', direction: 'pronunciation model', text: '¿Dónde vamos?' },
      // scene: carRide
      { id: 'carRide-0', voice: 'NARRATOR', lang: 'en', text: 'María drives an old sedan with a pine air-freshener swinging from the mirror. The city slides past — gas stations, a laundromat, a church.' },
      { id: 'carRide-1', voice: 'MARIA', lang: 'es', direction: 'reassuring, matter-of-fact warmth', text: 'Vas a quedarte con nosotros. La familia ya está esperando.' },
      { id: 'carRide-2', voice: 'NARRATOR', lang: 'en', text: 'She talks the whole way. Then, slowing for a light, she says one word like it is a small prayer:' },
      { id: 'carRide-3', voice: 'MARIA', lang: 'es', direction: 'a held breath of longing', text: 'Una casa.' },
      { id: 'carRide-3b', voice: 'NARRATOR', lang: 'en', text: 'Our own house. Someday.' },
      // scene: home
      { id: 'home-0', voice: 'NARRATOR', lang: 'en', text: 'The apartment is small and full. Cousins, a baby, a television murmuring. The whole room turns when you walk in.' },
      { id: 'home-1', voice: 'ROSA', lang: 'es', direction: 'motherly, instantly at ease', text: 'Pasa, pasa. Estás en tu casa.' },
      { id: 'home-2', voice: 'NARRATOR', lang: 'en', text: 'There is rice and beans and a plate already set for you, as if they knew the exact hour you would arrive. Maybe they did.' },
      { id: 'home-c1', voice: 'MARIA', lang: 'es', direction: 'pronunciation model', text: '¿Y la casa?' },
      { id: 'home-c2', voice: 'MARIA', lang: 'es', direction: 'pronunciation model', text: 'Necesito descansar.' },
      // scene: houseTalk
      { id: 'houseTalk-0', voice: 'NARRATOR', lang: 'en', text: "Later, the talk circles back to the house. María's neighbor, Don Beto, has come by — he counsels families at the community center." },
      { id: 'houseTalk-1', voice: 'BETO', lang: 'es', direction: 'a knowing, weary patience', text: 'Muchos creen que no pueden comprar una casa sin papeles.' },
      { id: 'houseTalk-1b', voice: 'NARRATOR', lang: 'en', text: 'He shakes his head.' },
      { id: 'houseTalk-2a', voice: 'BETO', lang: 'en', direction: 'plain, steady', text: "But owning a home isn't about immigration status." },
      { id: 'houseTalk-2b', voice: 'BETO', lang: 'es', direction: 'clear, reassuring', text: 'No necesitas ser ciudadano.' },
      { id: 'houseTalk-2c', voice: 'BETO', lang: 'en', text: 'Plenty of families buy with an ITIN — a taxpayer ID — and a lender who works with them.' },
      { id: 'houseTalk-3', voice: 'NARRATOR', lang: 'en', text: 'He lowers his voice, kind but serious.' },
      { id: 'houseTalk-4a', voice: 'BETO', lang: 'en', direction: 'protective', text: 'Just — be careful who you trust with your money.' },
      { id: 'houseTalk-4b', voice: 'BETO', lang: 'es', direction: 'a warning, gently delivered', text: 'Hay estafas.' },
      { id: 'houseTalk-c1', voice: 'BETO', lang: 'es', direction: 'pronunciation model', text: 'Quiero aprender más.' },
      { id: 'houseTalk-c2', voice: 'BETO', lang: 'es', direction: 'pronunciation model', text: 'Gracias, Don Beto.' },
      // scene: endHopeful
      { id: 'endHopeful-0', voice: 'NARRATOR', lang: 'en', text: 'That night you sleep on a borrowed couch under a borrowed blanket, in a country that does not yet know your name.' },
      { id: 'endHopeful-1', voice: 'NARRATOR', lang: 'en', text: 'Down the hall, the family is still talking — about work, about papers, about a house with a door that locks and a kitchen that is theirs. Tomorrow you will go with María to the community center.' },
      { id: 'endHopeful-2', voice: 'NARRATOR', lang: 'en', direction: 'gentle, hopeful', text: 'You asked. You leaned in. The dream of a home is real and, it turns out, possible — but everything good here will have to be fought for. The hard part has not come yet.' },
      // scene: endRest
      { id: 'endRest-0', voice: 'NARRATOR', lang: 'en', text: 'You are asleep before the dishes are done, on a borrowed couch under a borrowed blanket, in a country that does not yet know your name.' },
      { id: 'endRest-1', voice: 'NARRATOR', lang: 'en', text: 'Down the hall, the family talks softly so as not to wake you — about work, about papers, about a house, someday.' },
      { id: 'endRest-2', voice: 'NARRATOR', lang: 'en', direction: 'gentle', text: 'You needed rest, and that is allowed. The house, the questions, the long road — they will all still be there in the morning. The hard part has not come yet.' }
    ]
  },
  {
    id: 'work',
    // Chapter 2 depicts detention + removal. Human dignity sign-off 2026-06-01;
    // prose unchanged, so the provisional 41-clip voice set is now the approved set.
    ready: true,
    clips: [
      // scene: morning
      { id: 'morning-0', voice: 'NARRATOR', lang: 'en', text: 'Months pass. Winter thins into spring. The borrowed couch is still yours, but you are no longer a stranger — the language that used to slide past you now lands, word by word.' },
      { id: 'morning-1', voice: 'NARRATOR', lang: 'en', text: 'Over coffee, María sets down her cup like she has been waiting to say it.' },
      { id: 'morning-2', voice: 'MARIA', lang: 'es', direction: 'an offer made with care', text: 'Conozco a alguien. Tomás trabaja en la planta.' },
      { id: 'morning-3', voice: 'MARIA', lang: 'mix', direction: 'matter-of-fact, a little guarded', text: "It is hard work — cold, long hours. But they pay every Friday, and no hacen muchas preguntas." },
      { id: 'morning-4', voice: 'NARRATOR', lang: 'en', direction: 'quiet hope', text: 'A job. The first rung of everything the family talks about at night — the house, the door that locks, the kitchen that is yours.' },
      { id: 'morning-c1', voice: 'MARIA', lang: 'es', direction: 'pronunciation model', text: 'Necesito el trabajo.' },
      { id: 'morning-c2', voice: 'MARIA', lang: 'es', direction: 'pronunciation model', text: '¿Es peligroso?' },
      { id: 'morning-c3', voice: 'MARIA', lang: 'es', direction: 'pronunciation model', text: '¿Cuándo empiezo?' },
      // scene: firstDay
      { id: 'firstDay-0', voice: 'NARRATOR', lang: 'en', text: 'The plant is a country of its own: white light, the roar of machines, a cold that gets into your hands and stays. You work the line beside a woman named Lucía, who shows you the rhythm without ever slowing her own.' },
      { id: 'firstDay-1', voice: 'LUCIA', lang: 'es', direction: 'kind, steady, over the machine noise', text: 'Tranquilo, tranquila. Aquí nos cuidamos.' },
      { id: 'firstDay-2', voice: 'NARRATOR', lang: 'en', text: 'By Friday there is a paper envelope with your name misspelled and cash inside. You send most of it home and keep a little. For the first time, you are building something of your own.' },
      // scene: theCard
      { id: 'theCard-0', voice: 'NARRATOR', lang: 'en', text: 'One afternoon on break, Lucía presses a small red card into your hand. She keeps a stack of them, soft at the edges from being carried.' },
      { id: 'theCard-1', voice: 'LUCIA', lang: 'es', direction: 'quiet, urgent care', text: 'Guárdala. Por si vienen.' },
      { id: 'theCard-2', voice: 'NARRATOR', lang: 'en', text: 'On the card, in two languages, a few short sentences. She reads them with you quietly — the way you memorize something you hope you never need.' },
      { id: 'theCard-3', voice: 'LUCIA', lang: 'mix', direction: 'teaching gently, eye to eye', text: "Tienes derecho a guardar silencio. You don't have to say where you were born, or how you got here." },
      { id: 'theCard-4', voice: 'LUCIA', lang: 'mix', text: 'If they come to your home, no abras sin una orden firmada por un juez.' },
      { id: 'theCard-5', voice: 'LUCIA', lang: 'es', direction: 'firm, protective', text: 'No firmes nada. Pide un abogado.' },
      { id: 'theCard-c1', voice: 'LUCIA', lang: 'es', direction: 'pronunciation model', text: 'La guardo en mi bolsillo.' },
      { id: 'theCard-c2', voice: 'LUCIA', lang: 'es', direction: 'pronunciation model', text: 'Gracias, Lucía. No lo olvidaré.' },
      // scene: theRaid
      { id: 'theRaid-0', voice: 'NARRATOR', lang: 'mix', direction: 'restrained, the air going tight', text: 'It is a Tuesday, mid-shift, when the doors bang open. Vests. Three letters across their backs: ICE. The line stops. Somewhere a tray hits the floor and no one moves to pick it up. Una redada.' },
      { id: 'theRaid-1', voice: 'NARRATOR', lang: 'en', text: 'An agent works down the line, asking each person the same two questions. Beside you, Lucía has gone very still. Your hand finds the red card in your pocket.' },
      { id: 'theRaid-2', voice: 'AGENT', lang: 'es', direction: 'flat, procedural, cold', text: '¿Dónde nació? ¿Está usted en el país legalmente?' },
      // Player's Spanish pronunciation models — voiced by a Spanish voice (LUCIA),
      // not the English NARRATOR; thematically "the words Lucía gave you."
      { id: 'theRaid-c1', voice: 'LUCIA', lang: 'es', direction: 'pronunciation model, steady', text: 'Guardo silencio. Quiero un abogado.' },
      { id: 'theRaid-c2', voice: 'LUCIA', lang: 'es', direction: 'pronunciation model', text: 'Contesto sus preguntas.' },
      // scene: detainedA
      { id: 'detainedA-0', voice: 'NARRATOR', lang: 'en', text: 'You say almost nothing. You ask for a lawyer, the way the card taught you, and when they push papers across the table you keep your hands in your lap. You do not sign.' },
      { id: 'detainedA-1', voice: 'NARRATOR', lang: 'en', direction: 'cold, plain witness', text: 'They take you anyway. A van. A building with no clocks. A cold room shared with men who each carry a version of your morning. This is a detention facility; they can hold you here while your case moves, however long that takes.' },
      { id: 'detainedA-2', voice: 'NARRATOR', lang: 'en', text: 'You are allowed one phone call. You dial the legal-aid number from the back of the red card, then María — who is already, somehow, trying to find you.' },
      { id: 'detainedA-3', voice: 'MARIA', lang: 'es', direction: 'fierce, holding it together', text: 'No firmes nada. Te vamos a conseguir un abogado.' },
      { id: 'detainedA-4', voice: 'NARRATOR', lang: 'mix', text: 'No lawyer is handed to you here — the government does not provide one — but a nonprofit might take the case. There is talk of una fianza, of a hearing where a judge could weigh letting you out while you fight. Talk, not a promise. You hold onto it anyway.' },
      // scene: courtA
      { id: 'courtA-0', voice: 'NARRATOR', lang: 'en', text: 'Weeks. Then a courtroom the size of a classroom and a judge on a screen. A volunteer lawyer stands beside you — found at the last hour by the legal-aid line and by María, who would not stop calling. It matters more than you can say, not to be alone at that table.' },
      { id: 'courtA-1', voice: 'NARRATOR', lang: 'mix', text: 'But the law here is a narrow room. The judge enters a final order of removal — una orden de expulsión.' },
      { id: 'courtA-2', voice: 'NARRATOR', lang: 'en', text: 'Your lawyer files what can be filed. Nothing stops the order; it only slows it. You expect, at least, to be sent home — to the country whose language is in your mouth. But your country is slow to issue the papers to take you back, and the government has stopped waiting.' },
      // scene: removalA
      { id: 'removalA-0', voice: 'NARRATOR', lang: 'en', direction: 'still, devastating restraint', text: 'They wake you before dawn. On the tarmac an officer reads out the destination, and it is not your country. It is a name you have only heard in the news — a third country, one you have never seen, that has agreed to receive people who are not its own.' },
      { id: 'removalA-1', voice: 'NARRATOR', lang: 'en', text: 'You think of the house with the door that locks. You think of María, who knows your name and where they are taking you, and who is still on the phone with someone, somewhere, fighting. You still have your name. You still have the words Lucía gave you.' },
      { id: 'removalA-2', voice: 'NARRATOR', lang: 'en', direction: 'reflection — quiet, unflinching, not consoling falsely', text: 'You did everything right, and they removed you anyway — because the cruelty is written into the law, not into you. But you were not erased. A lawyer has your file. Your family knows where you are. The fight did not end on that tarmac. Knowing your rights did not spare you the injustice; it kept you a person inside it.' },
      // scene: detainedB
      { id: 'detainedB-0', voice: 'NARRATOR', lang: 'en', direction: 'no judgment — fear is human', text: 'Fear answers before you can. You tell them where you were born. When they slide a stack of papers across the table and tap a line at the bottom, your hand signs it — you cannot read it, and no one offers to explain.' },
      { id: 'detainedB-1', voice: 'NARRATOR', lang: 'en', text: 'Later, in the cold shared room, an older man asks what you signed. When you describe it, he goes quiet. You may have signed away a hearing you did not know you had — agreed to your own removal, just to make the fear stop sooner.' },
      { id: 'detainedB-2', voice: 'NARRATOR', lang: 'en', text: 'There is no lawyer here unless you find one, and you have no number, no name to call. The building has no clocks. The days lose their edges.' },
      // scene: removalB
      { id: 'removalB-0', voice: 'NARRATOR', lang: 'en', direction: 'still, restrained', text: 'It goes faster than you imagine. One pre-dawn there is a van, then a tarmac, then a plane. An officer reads a destination that is not your country — a third country, a place you have never been, that has agreed to take in people who are not its own.' },
      { id: 'removalB-1', voice: 'NARRATOR', lang: 'en', text: 'No one beyond these walls knows which plane, or where it lands. You hold your own name like the last thing left in your pockets.' },
      { id: 'removalB-2', voice: 'NARRATOR', lang: 'en', direction: 'reflection — absolving, then a charge to carry', text: 'Fear is not a failing — it is exactly what the system is built to use, and you were used at your most afraid. That is not your fault. But carry this now, for yourself and for anyone you can warn: you have the right to stay silent, the right to a lawyer, the right to sign nothing until one is beside you. Those words are not magic. They are dignity. Learn them. Say them. Hand them to the next person.' }
    ]
  },
  {
    id: 'stay',
    // Chapter 3 "The Ones Who Stay" (María POV). Provisional voices generated
    // 2026-06-01 at the user's request, BEFORE human sign-off (same as Ch2 was).
    // Kept ready:false so a plain `npm run audio` skips it; regenerate after any
    // prose/Spanish edit with `npm run audio -- --only stay --force`. New roles
    // SOFIA (child) + ANA share ef_dora with María/Rosa (Kokoro's only es female).
    ready: false,
    clips: [
      // scene: theChair
      { id: 'theChair-0', voice: 'NARRATOR', lang: 'en', direction: 'quiet, steady; the weight of being the one who must hold things', text: "This time you are María. Not the new arrival on the borrowed couch — the one who has been here for years, the one with the keys, the one the family turns to. This morning the agents came to the plant. The couch is empty. Your cousin did not come home." },
      { id: 'theChair-1', voice: 'NARRATOR', lang: 'en', text: "The little ones know something is wrong the way children always do — from the shape of the silence. At dinner there is a plate, and a chair, and no one in it. Sofía, the oldest, will not touch her food." },
      { id: 'theChair-2', voice: 'SOFIA', lang: 'es', direction: 'a child, small and uncertain', text: "¿Dónde está tío?" },
      { id: 'theChair-3', voice: 'NARRATOR', lang: 'en', text: "Five faces turn to you. Whatever you say now, they will keep for a long time. You can give them the truth, gently — or you can give them one more ordinary night before the world gets smaller." },
      { id: 'theChair-c1', voice: 'MARIA', lang: 'es', text: "Les digo la verdad, con cuidado." },
      { id: 'theChair-c2', voice: 'MARIA', lang: 'es', text: "Esta noche, los protejo del miedo." },
      // scene: theSearch
      { id: 'theSearch-0a', voice: 'NARRATOR', lang: 'en', text: "After they sleep, you begin. A legal-aid number a neighbor once pressed into your hand. A notebook. What you need first is a number — not a phone number but an A-number:" },
      { id: 'theSearch-0b', voice: 'MARIA', lang: 'es', text: "un número de extranjero" },
      { id: 'theSearch-0c', voice: 'NARRATOR', lang: 'en', text: "the digits the government stamps on a person and uses in place of their name." },
      { id: 'theSearch-1', voice: 'NARRATOR', lang: 'en', text: "There is a public system for this — ICE's online detainee locator. You can search by full name and country of birth; with the A-number it is faster and surer. You don't have the number yet. You have a name, a country, and the whole night." },
      { id: 'theSearch-2a', voice: 'NARRATOR', lang: 'en', text: "Sometimes the screen gives you nothing — the system has not caught up, or a person is moved before it does. When it does give you something, you write down a facility and a town you have never heard of. If it stays blank, there is a field office to call when the sun comes up." },
      { id: 'theSearch-2b', voice: 'MARIA', lang: 'es', text: "No estás buscando sola." },
      { id: 'theSearch-3', voice: 'NARRATOR', lang: 'en', text: "Maybe a lawyer already has the file. Maybe there is only you and a list of numbers to call. Either way, you have started — and starting, tonight, is the opposite of nothing." },
      { id: 'theSearch-c1', voice: 'MARIA', lang: 'es', text: "Sigo buscando." },
      // scene: elCentro
      { id: 'elCentro-0', voice: 'NARRATOR', lang: 'en', text: "Rosa from two doors down finds you on the steps the next evening and does not ask if you are okay. She just says: come. She walks you to the basement of a church three blocks over, where folding chairs make a circle and the coffee is bad and free." },
      { id: 'elCentro-1', voice: 'ROSA', lang: 'es', direction: 'warm, certain, no pity', text: "Aquí nadie está solo. Esto es apoyo mutuo." },
      { id: 'elCentro-2', voice: 'NARRATOR', lang: 'en', text: "They are ordinary people — a retired teacher, a mechanic, two college kids with a clipboard. They keep a phone tree. They go with families to check-ins and to court so that no one has to walk in alone. They call it accompaniment." },
      { id: 'elCentro-3a', voice: 'ANA', lang: 'es', text: "Te acompañamos." },
      { id: 'elCentro-3b', voice: 'ANA', lang: 'en', text: "Not instead of you. With you." },
      { id: 'elCentro-4', voice: 'NARRATOR', lang: 'en', text: "You came in carrying it alone. You leave with a phone tree, two names, and the strange warmth of a room full of strangers who decided your family is theirs." },
      { id: 'elCentro-c1', voice: 'MARIA', lang: 'es', text: "No estamos solos. Estamos juntos." },
      // scene: elPlan
      { id: 'elPlan-0', voice: 'NARRATOR', lang: 'en', text: "What you cannot stop, you can prepare for. You will not be caught flat-footed again. At the kitchen table, with the children and Don Beto, you make a plan — the kind the people at the church have helped a hundred families write." },
      { id: 'elPlan-1', voice: 'NARRATOR', lang: 'en', text: "You gather documents into one folder: birth certificates, passports, the children's medical cards, the names of their schools and teachers, and a list of every important phone number — because a memorized number survives a confiscated phone." },
      { id: 'elPlan-2', voice: 'NARRATOR', lang: 'en', text: "You choose, out loud, who would care for the children if you were taken — a trusted adult, named now, not in a panic later. A lawyer can tell you the right paperwork where you live: a caregiver's authorization, or guardianship through a court. You do not guess at the law. You write down the question and who to ask." },
      { id: 'elPlan-3a', voice: 'NARRATOR', lang: 'en', text: "You tape a red card to the refrigerator, beside the children's drawings." },
      { id: 'elPlan-3b', voice: 'MARIA', lang: 'es', text: "Un plan de emergencia." },
      { id: 'elPlan-4', voice: 'NARRATOR', lang: 'en', text: "Then you do the thing that matters most. You teach the children the words — the same words a woman named Lucía once taught your cousin on a break at the plant. You make it a game, so the fear stays small and the knowing stays large." },
      { id: 'elPlan-5', voice: 'MARIA', lang: 'es', direction: 'gentle, like a lullaby with steel in it', text: "No abras la puerta sin una orden firmada por un juez." },
      { id: 'elPlan-6', voice: 'MARIA', lang: 'es', text: "Tienes derecho a guardar silencio." },
      { id: 'elPlan-7', voice: 'MARIA', lang: 'es', text: "No firmes nada. Pide un abogado." },
      { id: 'elPlan-8', voice: 'SOFIA', lang: 'es', direction: 'a child reciting, solemn', text: "No abro la puerta. Pido un abogado." },
      { id: 'elPlan-9', voice: 'NARRATOR', lang: 'en', text: "Sofía repeats it back, solemn as a prayer, and you have to turn toward the sink so she does not see your face. The words did not save your cousin. They will not, by themselves, save anyone. But a person who knows them is harder to disappear." },
      { id: 'elPlan-c1', voice: 'MARIA', lang: 'es', text: "Me quedo cerca. Sostengo la casa." },
      { id: 'elPlan-c2', voice: 'MARIA', lang: 'es', text: "Voy con los demás. Acompaño." },
      // scene: endStay
      { id: 'endStay-0', voice: 'NARRATOR', lang: 'en', direction: 'the feared call; restrained, not melodramatic', text: "Weeks later the call comes that you already feared: a courtroom, a final order, a plane to a country that is not even theirs. You sit the children down and tell them the truth, carefully, the way you decided you would. The chair at the table stays empty. You do not pretend otherwise." },
      { id: 'endStay-1', voice: 'NARRATOR', lang: 'en', text: "But the house did not fall. There is a folder in the drawer and a red card on the fridge and a phone tree that answers on the second ring. The children know their rights better than you did at their age. Your cousin is on the other end of a bad phone line, far away — still a person, still yours — because you kept the line open." },
      { id: 'endStay-2', voice: 'NARRATOR', lang: 'en', direction: 'reflection — quiet, resolute, not consoling falsely', text: "This is the part of the story that is on no card: the ones who stay. Removal takes a person from a place; it does not take them from their people — unless their people let it. You learned the words too late to save the morning they came, and just in time to make sure no one in this house ever meets that morning unprepared, or alone. That is what an ally is. Not a rescuer who arrives from outside. A neighbor who refuses to look away." },
      // scene: endVoice
      { id: 'endVoice-0', voice: 'NARRATOR', lang: 'en', text: "The order comes, and the plane, and the country that is not theirs — all the things you could not stop. You grieve. And then, on an ordinary Tuesday, you put on your coat and walk back to the church basement, and this time you are not the one being carried." },
      { id: 'endVoice-1', voice: 'NARRATOR', lang: 'en', text: "You take the clipboard. You go with a family to a check-in so the mother does not walk in alone. You teach the words at the next meeting, in your cousin's accent, with your cousin's red card in your pocket. The fear did not leave. You just stopped letting it decide who you are." },
      { id: 'endVoice-2', voice: 'NARRATOR', lang: 'en', direction: 'reflection — a charge to carry, steady and clear', text: "Removal is built to make an example — to make everyone left behind smaller and quieter. You did the opposite. You turned a kitchen-table plan into a phone tree, a phone tree into a room, a room into the simple, stubborn fact that no one on this block gets taken in silence anymore. That is what an ally can become: not a witness to the harm, but a multiplier of the words that blunt it. Learn them. Teach them. Walk in beside the person who is afraid." }
    ]
  }
];
