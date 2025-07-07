export interface EnhancedAngelEntity {
  id: number;
  name: string;
  title: string;
  color: string;
  symbol: string;
  description: string;
  domain: string;
  timing: string;
  psalm: string;
  offerings: string[];
  invocationGuide: string;
  evocationGuide: string;
  meditationGuide: string;
  practicalUses: string[];
  
  // Enhanced information
  duties: string[];
  powers: string[];
  likes: string[];
  dislikes: string[];
  hierarchy: string;
  element: string;
  planet: string;
  zodiacSign: string;
  crystals: string[];
  herbs: string[];
  colors: string[];
  numbers: number[];
  weeklyDay: string;
  monthlyPeriod: string;
  historicalSignificance: string;
  modernRelevance: string;
  personalityTraits: string[];
  workingPartnership: string;
  commonSigns: string[];
  invocationPrayer: string;
  evocationRitual: string;
  protectionMethod: string;
  banishingMethod: string;
  
  // Added missing properties for filtering
  category: string;
  tradition: string;
}

export const enhancedAngels: EnhancedAngelEntity[] = [
  {
    id: 1,
    name: "Elemiah",
    title: "The Divine Guardian",
    color: "#9b59b6",
    symbol: "👁️",
    description: "Angel of divine protection and inner journeys, guardian of travelers both physical and spiritual.",
    domain: "Protection, Guidance, Inner Journeys",
    timing: "Dawn and dusk, during travel",
    psalm: "Psalm 23 - 'The Lord is my shepherd'",
    offerings: ["White candles", "Frankincense", "Clear quartz", "Spring water"],
    
    // Added missing properties
    category: "Guardian",
    tradition: "Kabbalistic",
    
    duties: [
      "Protecting travelers on physical and spiritual journeys",
      "Guarding against negative energies and psychic attacks",
      "Guiding souls through difficult life transitions",
      "Providing divine protection during meditation and astral travel",
      "Helping individuals find their true spiritual path",
      "Protecting children and innocent souls",
      "Guarding sacred spaces and rituals"
    ],
    
    powers: [
      "Divine protection and shielding",
      "Clairvoyant sight and spiritual vision",
      "Ability to reveal hidden enemies or dangers",
      "Power to guide through spiritual realms safely",
      "Strength to overcome fears and anxieties",
      "Capacity to heal emotional wounds from travel or displacement",
      "Ability to open and close spiritual portals safely"
    ],
    
    likes: [
      "Pure intentions and genuine prayer",
      "Acts of kindness toward travelers and strangers",
      "Meditation in natural settings",
      "Protecting the innocent and vulnerable",
      "Sacred geometry and divine mathematics",
      "Clean, organized sacred spaces",
      "Dawn and twilight prayers"
    ],
    
    dislikes: [
      "Reckless spiritual practices without proper protection",
      "Using spiritual gifts for selfish gain",
      "Ignoring inner guidance and intuition",
      "Traveling without proper spiritual preparation",
      "Disrespecting sacred spaces",
      "Fear-based spiritual practices",
      "Abandoning those in need of protection"
    ],
    
    hierarchy: "Cherubim - Second Sphere",
    element: "Air and Light",
    planet: "Mercury",
    zodiacSign: "Gemini (21-25 degrees)",
    crystals: ["Clear Quartz", "Amethyst", "Moonstone", "Labradorite"],
    herbs: ["Frankincense", "Myrrh", "Sage", "Rosemary"],
    colors: ["White", "Silver", "Light Purple", "Clear"],
    numbers: [3, 7, 21],
    weeklyDay: "Wednesday",
    monthlyPeriod: "June 11-15",
    
    historicalSignificance: "Elemiah has been recognized since ancient times as a powerful protector of those who journey between worlds. In Kabbalistic tradition, Elemiah is one of the 72 angels derived from the Shem HaMephorash, holding dominion over divine protection and spiritual sight. Ancient travelers would invoke Elemiah before long journeys, and mystics would call upon this angel before deep spiritual work.",
    
    modernRelevance: "In our modern world, Elemiah's protection extends to all forms of travel - physical, emotional, and spiritual. This angel is particularly relevant for those undergoing major life changes, spiritual awakening, or anyone working in healing professions where psychic protection is needed.",
    
    personalityTraits: [
      "Vigilant and watchful",
      "Compassionate toward the lost",
      "Stern with those who misuse spiritual power",
      "Patient with sincere seekers",
      "Protective of the innocent",
      "Wise in matters of spiritual safety"
    ],
    
    workingPartnership: "Elemiah works best with those who approach spiritual practice with respect, humility, and genuine desire for protection and guidance. This angel responds strongly to consistent prayer, meditation, and acts of service to others, especially travelers and those in transition.",
    
    commonSigns: [
      "Sudden awareness of potential dangers",
      "Feeling protected during difficult times",
      "Clear guidance during meditation",
      "Synchronicities related to travel or movement",
      "Dreams of journeys or pathways",
      "Seeing repeated number sequences (3, 7, 21)",
      "Feeling a warm, protective presence"
    ],
    
    invocationGuide: "Light a white candle at dawn or dusk\nFace east and center yourself with three deep breaths\nSpeak: 'Elemiah, Divine Guardian, I call upon your protection'\nState your need clearly and with pure intention\nOffer gratitude and visualize protective white light surrounding you\nClose with: 'May your divine protection guide my path'",
    
    invocationPrayer: "Sacred Elemiah, Guardian of the Divine Path, I humbly invoke your presence and protection. As I journey through the realms of spirit and matter, be my guide and shield. Surround me with your divine light, that no harm may befall me and no darkness may cloud my vision. Grant me the wisdom to recognize your signs and the courage to follow your guidance. Protect not only my physical form but my mind, heart, and soul as I walk this sacred path. In divine light and love, I call upon you. Amen.",
    
    evocationGuide: "Create a sacred circle with salt or chalk\nPlace four white candles at cardinal directions\nBurn frankincense and light a central purple candle\nChant Elemiah's name 21 times while visualizing the angel's presence\nState your request clearly and offer your service in return\nWait in meditation for the angel's response\nThank Elemiah and properly close the circle",
    
    evocationRitual: "Begin at the hour of Mercury on Wednesday. Prepare your sacred space with cleansing sage. Draw the sigil of Elemiah in the air while chanting: 'Elemiah, Elemiah, Elemiah, come forth in divine light.' Feel the angel's presence as a warm, protective energy. State your petition three times, then remain in silent communion for at least 21 minutes. Conclude by offering gratitude and promising to honor the guidance received.",
    
    meditationGuide: "Find a quiet space facing east. Light a white or purple candle and burn frankincense. Close your eyes and breathe deeply, centering yourself in the present moment. Visualize a brilliant white light descending from above, forming a protective sphere around you. Call silently to Elemiah, asking for protection and guidance. Feel the angel's presence as a warm, watchful energy. Allow any messages or insights to come naturally. Continue for 10-20 minutes, then thank Elemiah and ground yourself by touching the earth.",
    
    practicalUses: [
      "Protection during travel or major life changes",
      "Psychic protection for healers and spiritual workers",
      "Guidance during difficult decisions",
      "Protection of home and family",
      "Assistance with spiritual development",
      "Help overcoming fears and anxieties",
      "Protection during astral projection or deep meditation"
    ],
    
    protectionMethod: "To maintain Elemiah's protection, carry a small clear quartz crystal that has been blessed in the angel's name. Recite the angel's name three times when feeling threatened or uncertain. Maintain regular meditation practice and acts of kindness toward travelers and strangers.",
    
    banishingMethod: "If you need to respectfully conclude your work with Elemiah, light a white candle and express sincere gratitude for the protection received. Ask that the angel's blessing remain but that active contact be gently released. Extinguish the candle and bury any ritual items used in your work with this angel in clean earth."
  },
  
  {
    id: 2,
    name: "Gabriel",
    title: "The Divine Messenger",
    color: "#3498db",
    symbol: "📯",
    description: "Archangel of communication, prophecy, and divine revelation, herald of the most sacred messages.",
    domain: "Communication, Prophecy, Revelation, Childbirth",
    timing: "Monday, Full Moon, Dawn",
    psalm: "Psalm 103 - 'Bless the Lord, O my soul'",
    offerings: ["White lilies", "Silver items", "Moon water", "Jasmine incense"],
    
    // Added missing properties
    category: "Archangel",
    tradition: "Abrahamic",
    
    duties: [
      "Delivering divine messages and revelations",
      "Assisting in all forms of communication",
      "Protecting pregnant women and children",
      "Guiding writers, speakers, and messengers",
      "Facilitating prophetic visions and dreams",
      "Overseeing the element of water",
      "Managing lunar energies and cycles"
    ],
    
    powers: [
      "Divine communication across all realms",
      "Prophetic sight and revelation",
      "Power over water and emotions",
      "Ability to purify and cleanse",
      "Strength in creativity and artistic expression",
      "Capacity to heal communication barriers",
      "Authority over lunar and feminine mysteries"
    ],
    
    likes: [
      "Pure and honest communication",
      "Artistic and creative expression",
      "Protecting mothers and children",
      "Full moon ceremonies",
      "Sacred music and chanting",
      "Water rituals and purification",
      "Acts of mercy and compassion"
    ],
    
    dislikes: [
      "Lies, deception, and false communication",
      "Harm to children or pregnant women",
      "Misuse of prophetic gifts",
      "Polluting water sources",
      "Suppressing creative expression",
      "Ignoring divine messages",
      "Using communication to harm others"
    ],
    
    hierarchy: "Archangel - First Sphere",
    element: "Water",
    planet: "Moon",
    zodiacSign: "Cancer",
    crystals: ["Moonstone", "Selenite", "Aquamarine", "Pearl"],
    herbs: ["Jasmine", "Lily", "Iris", "Eucalyptus"],
    colors: ["White", "Silver", "Light Blue", "Iridescent"],
    numbers: [2, 4, 9],
    weeklyDay: "Monday",
    monthlyPeriod: "During Full Moon periods",
    
    historicalSignificance: "Gabriel is one of the most recognized archangels across multiple religious traditions. Known as the messenger who announced the births of John the Baptist and Jesus Christ, Gabriel has been the divine herald of the most important spiritual messages throughout history. In Islamic tradition, Gabriel (Jibril) revealed the Quran to Prophet Muhammad.",
    
    modernRelevance: "In our age of information and communication, Gabriel's guidance is more relevant than ever. This archangel assists with all forms of modern communication - from public speaking to digital media, helping ensure messages are clear, truthful, and beneficial to all who receive them.",
    
    personalityTraits: [
      "Eloquent and articulate",
      "Deeply compassionate, especially toward mothers and children",
      "Truthful and cannot abide deception",
      "Nurturing and protective",
      "Inspirational and uplifting",
      "Patient with sincere seekers of truth"
    ],
    
    workingPartnership: "Gabriel works best with those who seek to communicate truth, beauty, and divine love. This archangel particularly supports artists, writers, teachers, parents, and anyone whose work involves sharing important messages with others.",
    
    commonSigns: [
      "Sudden clarity in communication",
      "Prophetic dreams or visions",
      "Synchronicities with water",
      "Increased intuition during full moons",
      "Inspiration for creative projects",
      "Protection during childbirth or child-rearing",
      "Hearing your name called when alone"
    ],
    
    invocationGuide: "Begin on a Monday or during the full moon\nPrepare a bowl of clean water and white flowers\nLight a white or silver candle\nCall: 'Gabriel, Divine Messenger, I seek your guidance'\nSpeak your need for clear communication or divine message\nListen in silence for inspiration\nClose with gratitude and drink the blessed water",
    
    invocationPrayer: "Beloved Gabriel, Archangel of Divine Communication, I call upon your holy presence. Grant me the gift of clear speech and pure intention in all my communications. Help me to receive and share divine messages with wisdom and compassion. Protect all mothers and children in my care, and bless my creative endeavors with your divine inspiration. May your silver light illuminate my path and your gentle strength guide my words. In the name of the Divine, I invoke you. Amen.",
    
    evocationGuide: "Perform during the full moon near a natural water source\nCreate a circle with white flowers and silver items\nLight silver or white candles and burn jasmine incense\nChant Gabriel's name while holding moonstone\nPour water offerings and state your petition\nMeditate on the moon's reflection in water\nClose by scattering flowers on the water",
    
    evocationRitual: "At dawn on Monday, prepare a sacred space with white cloth and silver bowl filled with spring water. Light four white candles forming a square around the bowl. Hold a piece of moonstone and call: 'Gabriel, Herald of the Divine, I seek your presence.' State your need three times while gazing into the water. Wait for signs - ripples in still water, sudden insights, or feeling of presence. Conclude with offerings of white flowers cast upon water.",
    
    meditationGuide: "Sit comfortably near water or with a bowl of water before you. Focus on your breath and feel the lunar energy flowing through you. Visualize Gabriel approaching as a figure of pure white and silver light, carrying a lily and speaking words of comfort. Allow any messages to come through your intuition. Feel the archangel's presence as gentle but powerful, like moonlight on water. Continue until you feel complete, then thank Gabriel with sincere gratitude.",
    
    practicalUses: [
      "Improving communication skills and public speaking",
      "Receiving divine guidance and messages",
      "Protection during pregnancy and childbirth",
      "Enhancing creativity and artistic expression",
      "Developing prophetic abilities",
      "Healing emotional wounds through expression",
      "Purification and cleansing rituals"
    ],
    
    protectionMethod: "Keep a piece of moonstone or a white lily as Gabriel's token. During challenging communications, silently call on Gabriel for clarity and truth. Maintain regular full moon meditations and always speak with honesty and compassion.",
    
    banishingMethod: "To conclude work with Gabriel, offer flowers to a natural water source while expressing deep gratitude. Ask that Gabriel's blessings continue to flow like water, but that formal contact be gently released. Pour blessed water on the earth as a final offering."
  }
];
