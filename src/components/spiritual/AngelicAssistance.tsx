
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { VoicePlayer } from '@/components/spiritual/VoicePlayer';
import { Search, Sparkles, Heart, PlayCircle, Shield, Zap } from 'lucide-react';

// TypeScript interface for angel entities
interface AngelEntity {
  id: number;
  name: string;
  title: string;
  description: string;
  domain: string;
  psalm: string;
  color: string;
  symbol: string;
  invocationGuide: string;
  evocationGuide: string;
  practicalUses: string[];
  meditationGuide: string;
  offerings: string[];
  timing: string;
}

const AngelicAssistance = () => {
  const [angels, setAngels] = useState<AngelEntity[]>([]);
  const [filteredAngels, setFilteredAngels] = useState<AngelEntity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAngel, setSelectedAngel] = useState<AngelEntity | null>(null);
  const [invocationText, setInvocationText] = useState('');
  const [activeTab, setActiveTab] = useState('directory');
  const [isInvoking, setIsInvoking] = useState(false);
  const [connectionActive, setConnectionActive] = useState(false);
  const { toast } = useToast();
  
  // Complete data for angelic entities with detailed guides
  useEffect(() => {
    const angelicEntities: AngelEntity[] = [
      {
        id: 1,
        name: "Vehuiah",
        title: "The Resurrector",
        description: "Angel of new beginnings and inspiration. Invoke when starting new projects.",
        domain: "Creation, Inspiration",
        psalm: "Psalm 3:3",
        color: "#ff6b6b",
        symbol: "🌅",
        invocationGuide: "1. Light a white candle and face East\n2. Place your hands over your heart\n3. Say: 'Vehuiah, Angel of Divine Will, I call upon your sacred presence'\n4. State your new beginning or creative project\n5. Ask: 'Guide my steps and illuminate my path'\n6. Visualize golden light filling your solar plexus\n7. Thank Vehuiah and extinguish the candle",
        evocationGuide: "Sit in meditation facing East at sunrise. Visualize a golden sunrise on the horizon. As the light grows brighter, feel it entering your crown chakra and filling your entire being with creative energy. Hold this visualization for 10-15 minutes while focusing on your new beginning.",
        practicalUses: ["Starting new projects", "Overcoming creative blocks", "Finding inspiration", "Career changes", "Artistic endeavors"],
        meditationGuide: "Close your eyes and imagine standing at the edge of a cliff at dawn. Feel the cool morning air. Watch as the sun rises, painting the sky in brilliant gold and orange. As the first rays touch your face, feel Vehuiah's inspiring energy flowing into you, filling you with divine creativity and the courage to begin anew.",
        offerings: ["White flowers", "Golden honey", "Sunrise water", "Creative works"],
        timing: "Dawn, Sunday, Spring months"
      },
      {
        id: 2,
        name: "Jeliel",
        title: "The Dispenser of Justice",
        description: "Angel of love, relationships, and divine justice. Seek for reconciliation.",
        domain: "Love, Justice",
        psalm: "Psalm 22:19",
        color: "#4ecdc4",
        symbol: "⚖️",
        invocationGuide: "1. Light a pink candle\n2. Hold a rose quartz in your left hand\n3. Say: 'Jeliel, Angel of Divine Love and Justice, I call upon your compassionate energy'\n4. Speak about the relationship or justice issue\n5. Ask: 'Heal the wounds and restore harmony'\n6. Visualize pink light surrounding all parties involved\n7. Thank Jeliel for the healing",
        evocationGuide: "Create a sacred space with rose petals and soft music. Sit comfortably and place rose quartz on your heart chakra. Visualize a beautiful rose garden where you meet Jeliel. The angel appears with scales of justice in one hand and a pink rose in the other. Feel the balance of love and justice flowing through you.",
        practicalUses: ["Healing relationships", "Resolving conflicts", "Finding true love", "Legal matters", "Forgiveness work"],
        meditationGuide: "Imagine yourself in a courtroom filled with soft pink light. Jeliel sits as the divine judge, but instead of punishment, only love and understanding emanate from this presence. Feel any anger or resentment in your heart being transformed into compassion. See all parties in your conflict surrounded by healing pink light.",
        offerings: ["Pink roses", "Rose water", "Love letters", "Acts of forgiveness"],
        timing: "Friday, Venus hours, Full moon"
      },
      {
        id: 3,
        name: "Sitael",
        title: "The Protector",
        description: "Angel of protection and divine shelter. Call upon for safety and security.",
        domain: "Protection, Safety",
        psalm: "Psalm 91:1",
        color: "#1a535c",
        symbol: "🛡️",
        invocationGuide: "1. Light a blue candle\n2. Draw a protective circle with salt around yourself\n3. Say: 'Sitael, mighty protector, I call upon your shield of divine light'\n4. State what you need protection from\n5. Ask: 'Surround me with your impenetrable shield'\n6. Visualize blue armor of light covering your entire body\n7. Thank Sitael and keep the circle until ready",
        evocationGuide: "Stand in your sacred space wearing something blue. Visualize Sitael as a mighty warrior angel with a brilliant blue shield and sword of light. See the angel placing a protective bubble around you that nothing negative can penetrate. Feel completely safe and secure within this divine protection.",
        practicalUses: ["Physical protection", "Spiritual defense", "Home security", "Travel safety", "Protection from negativity"],
        meditationGuide: "Envision yourself standing in the center of a fortress made of brilliant blue light. Sitael stands guard at the gates, a majestic figure in blue armor. Feel the absolute safety and security this fortress provides. Know that no harm can reach you here, and this protection extends wherever you go.",
        offerings: ["Blue stones", "Salt", "Protective herbs (sage, rosemary)", "Shield imagery"],
        timing: "Tuesday, Mars hours, Dark moon"
      },
      {
        id: 4,
        name: "Elemiah",
        title: "The Divine Guardian",
        description: "Angel of spiritual protection and divine guidance in difficult times.",
        domain: "Protection, Guidance",
        psalm: "Psalm 6:4",
        color: "#9b59b6",
        symbol: "👁️",
        invocationGuide: "1. Light a purple candle\n2. Hold an amethyst crystal\n3. Say: 'Elemiah, Divine Guardian, I seek your spiritual protection and guidance'\n4. Describe the spiritual challenge you're facing\n5. Ask: 'Open my spiritual sight and guard my soul'\n6. Visualize a purple eye of protection opening in your third eye\n7. Thank Elemiah for the guidance",
        evocationGuide: "Meditate with amethyst on your third eye chakra. Visualize Elemiah as a tall figure with multiple eyes of different colors, each seeing different spiritual dimensions. Feel your own spiritual sight opening as the angel shares divine vision with you. See beyond the physical realm into the spiritual truth of your situation.",
        practicalUses: ["Spiritual protection", "Psychic defense", "Enhanced intuition", "Spiritual guidance", "Third eye opening"],
        meditationGuide: "Picture yourself in a temple made of amethyst crystal. In the center sits Elemiah, radiating purple light from a large eye in the center of their forehead. As you gaze into this divine eye, feel your own spiritual vision expanding. See the spiritual forces at work in your life and receive clear guidance.",
        offerings: ["Amethyst crystals", "Purple flowers", "Incense", "Written prayers"],
        timing: "Thursday, Jupiter hours, New moon"
      },
      {
        id: 5,
        name: "Mahasiah",
        title: "The Peaceful One",
        description: "Angel of peace and reconciliation. Brings harmony to relationships.",
        domain: "Peace, Harmony",
        psalm: "Psalm 34:4",
        color: "#3498db",
        symbol: "🕊️",
        invocationGuide: "1. Light a white candle\n2. Hold a white dove feather or image\n3. Say: 'Mahasiah, Angel of Divine Peace, I call upon your harmonizing energy'\n4. Speak about the conflict or unrest\n5. Ask: 'Bring peace to this situation and harmony to all involved'\n6. Visualize white doves flying around the situation, bringing peace\n7. Thank Mahasiah and blow out the candle gently",
        evocationGuide: "Find a quiet place in nature or create a peaceful environment with soft music. Visualize Mahasiah as a luminous being surrounded by white doves. Feel waves of peace emanating from the angel, washing over you and extending to all areas of conflict in your life. Let this peace settle deep into your soul.",
        practicalUses: ["Conflict resolution", "Inner peace", "Family harmony", "Workplace peace", "Calming anxiety"],
        meditationGuide: "Imagine yourself sitting by a still lake at sunset. The water perfectly reflects the peaceful sky. Mahasiah appears walking on the water towards you, leaving ripples of pure peace. As the angel approaches, feel all tension and conflict dissolving. Your heart becomes as still and peaceful as the lake.",
        offerings: ["White feathers", "Peace lilies", "Olive branches", "Calming music"],
        timing: "Sunday, Solar hours, Evening"
      },
      {
        id: 6,
        name: "Lelahel",
        title: "The Light of God",
        description: "Angel of healing and divine illumination. Brings clarity and understanding.",
        domain: "Healing, Illumination",
        psalm: "Psalm 9:11",
        color: "#f1c40f",
        symbol: "💡",
        invocationGuide: "1. Light a yellow candle\n2. Hold a clear quartz crystal\n3. Say: 'Lelahel, Divine Light, I call upon your illuminating presence'\n4. Ask for healing or clarity about specific issue\n5. Say: 'Shine your light upon this darkness and bring understanding'\n6. Visualize golden light filling your mind and body\n7. Thank Lelahel for the illumination",
        evocationGuide: "Sit in meditation with citrine or clear quartz. Visualize Lelahel as a being of pure golden light, with rays extending in all directions. See this light entering your crown chakra and illuminating every cell of your body, especially areas needing healing. Feel your understanding expanding as divine light fills your consciousness.",
        practicalUses: ["Physical healing", "Mental clarity", "Spiritual illumination", "Learning enhancement", "Depression relief"],
        meditationGuide: "Envision yourself in a cathedral made entirely of golden light. Lelahel stands at the altar, a figure so bright you can barely look directly at them. Golden rays of healing light stream from the angel towards you, penetrating every part of your being. Feel old wounds healing and new understanding dawning in your mind.",
        offerings: ["Yellow flowers", "Citrine crystals", "Candles", "Written questions seeking clarity"],
        timing: "Wednesday, Mercury hours, Midday"
      },
      {
        id: 7,
        name: "Achaiah",
        title: "The Patient One",
        description: "Angel of patience and divine timing. Helps with understanding life's rhythms.",
        domain: "Patience, Divine Timing",
        psalm: "Psalm 103:8",
        color: "#2ecc71",
        symbol: "⏳",
        invocationGuide: "1. Light a green candle\n2. Hold an hourglass or watch\n3. Say: 'Achaiah, Angel of Divine Timing, I call upon your patient wisdom'\n4. Speak about what you're waiting for or struggling with\n5. Ask: 'Help me trust in divine timing and develop patience'\n6. Visualize time slowing down and becoming peaceful\n7. Thank Achaiah for the gift of patience",
        evocationGuide: "Sit quietly and focus on your breathing, making each breath slower and deeper than the last. Visualize Achaiah as an ancient, wise being surrounded by hourglasses and calendars. Feel the angel's patient energy flowing into you, teaching you that everything has its perfect timing in the divine plan.",
        practicalUses: ["Developing patience", "Trusting divine timing", "Reducing anxiety about future", "Finding peace in waiting", "Understanding life cycles"],
        meditationGuide: "Picture yourself in a vast library where Achaiah sits reading a book titled 'The Divine Timeline of Your Life.' As you approach, the angel smiles and shows you pages revealing how everything in your life has unfolded in perfect timing. Feel the deep trust that everything will happen when it's meant to.",
        offerings: ["Seeds", "Green plants", "Hourglasses", "Journals about patience"],
        timing: "Saturday, Saturn hours, Season changes"
      },
      {
        id: 8,
        name: "Cahetel",
        title: "The Blessed One",
        description: "Angel of divine blessings and abundance. Brings prosperity and success.",
        domain: "Blessings, Abundance",
        psalm: "Psalm 95:6",
        color: "#e67e22",
        symbol: "🌟",
        invocationGuide: "1. Light a gold candle\n2. Place coins or symbols of abundance around it\n3. Say: 'Cahetel, Angel of Divine Blessings, I call upon your abundant grace'\n4. Express gratitude for current blessings\n5. Ask: 'Multiply these blessings and open new channels of abundance'\n6. Visualize golden rain falling upon you\n7. Thank Cahetel and share your blessings with others",
        evocationGuide: "Create an altar with items representing abundance (fruits, flowers, coins). Visualize Cahetel as a radiant being with hands full of golden light, pouring blessings upon you. Feel abundance flowing to you from all directions, and see yourself as a channel for blessings to flow to others.",
        practicalUses: ["Attracting abundance", "Career success", "Financial prosperity", "Manifesting goals", "Increasing gratitude"],
        meditationGuide: "Imagine standing in a golden wheat field under a sky full of stars. Each star represents a blessing in your life. Cahetel appears and waves their hand, causing the stars to rain down golden light upon the field. Watch as the wheat multiplies and grows, representing the abundance flowing into your life.",
        offerings: ["Gold items", "Fruits", "Flowers", "Gratitude lists"],
        timing: "Thursday, Jupiter hours, Waxing moon"
      },
      {
        id: 9,
        name: "Haziel",
        title: "The Vision of God",
        description: "Angel of divine mercy and forgiveness. Brings compassion and understanding.",
        domain: "Mercy, Forgiveness",
        psalm: "Psalm 25:6",
        color: "#e74c3c",
        symbol: "❤️",
        invocationGuide: "1. Light a red candle\n2. Hold your hands over your heart\n3. Say: 'Haziel, Angel of Divine Mercy, I call upon your compassionate love'\n4. Speak about what needs forgiveness (self or others)\n5. Ask: 'Fill my heart with your merciful love and help me forgive'\n6. Visualize red light healing your heart\n7. Thank Haziel and commit to acts of mercy",
        evocationGuide: "Place your hands on your heart and breathe deeply. Visualize Haziel as a being of pure love with a heart of ruby light. Feel the angel's merciful energy dissolving all resentment and filling your heart with divine compassion. See everyone who has hurt you surrounded by this same loving light.",
        practicalUses: ["Forgiveness work", "Healing emotional wounds", "Developing compassion", "Mercy for others", "Self-forgiveness"],
        meditationGuide: "Envision yourself in a garden of red roses where Haziel sits on a throne of rose petals. The angel's heart glows with ruby light that expands to encompass you. Feel all pain and resentment melting away as you're filled with pure, unconditional love. Understand that mercy is strength, not weakness.",
        offerings: ["Red roses", "Ruby or garnet stones", "Acts of mercy", "Forgiveness letters"],
        timing: "Friday, Venus hours, When moon is in Cancer"
      },
      {
        id: 10,
        name: "Aladiah",
        title: "The Hidden God",
        description: "Angel of divine grace and hidden wisdom. Reveals spiritual truths.",
        domain: "Grace, Hidden Wisdom",
        psalm: "Psalm 33:22",
        color: "#8e44ad",
        symbol: "🔮",
        invocationGuide: "1. Light a purple candle in a darkened room\n2. Hold a crystal ball or amethyst\n3. Say: 'Aladiah, Keeper of Hidden Wisdom, I call upon your revealing grace'\n4. Ask about the hidden truth or wisdom you seek\n5. Say: 'Unveil what is hidden and grant me divine understanding'\n6. Meditate in silence for at least 10 minutes\n7. Thank Aladiah for the revealed wisdom",
        evocationGuide: "Meditate in a dark room with only candlelight. Visualize Aladiah as a mysterious figure wrapped in violet robes, holding a book of secrets. As the angel opens the book, words of wisdom appear in your mind. Trust the insights that come, even if they seem unusual or unexpected.",
        practicalUses: ["Receiving hidden knowledge", "Understanding mysteries", "Developing intuition", "Spiritual revelations", "Uncovering truth"],
        meditationGuide: "Picture yourself in an ancient library filled with books containing the secrets of the universe. Aladiah appears as the librarian, leading you to a specific book meant just for you. As you open it, the pages reveal the hidden wisdom you've been seeking. Trust what you see and feel.",
        offerings: ["Purple candles", "Amethyst crystals", "Books", "Written questions"],
        timing: "Monday, Moon hours, Midnight"
      },
      {
        id: 11,
        name: "Lauviah",
        title: "The Praised One",
        description: "Angel of victory and triumph. Helps overcome obstacles and challenges.",
        domain: "Victory, Triumph",
        psalm: "Psalm 18:46",
        color: "#d35400",
        symbol: "🏆",
        invocationGuide: "1. Light an orange candle\n2. Hold a symbol of victory (trophy, crown, or sword)\n3. Say: 'Lauviah, Angel of Divine Victory, I call upon your triumphant power'\n4. Describe the challenge or obstacle you face\n5. Ask: 'Grant me the strength and strategy to overcome this challenge'\n6. Visualize yourself celebrating victory\n7. Thank Lauviah and take one action toward your goal",
        evocationGuide: "Stand with your arms raised in victory pose. Visualize Lauviah as a warrior angel with a golden sword and shield, leading an army of light. Feel the angel's victorious energy flowing into you, giving you courage and determination to face any challenge. See yourself already victorious.",
        practicalUses: ["Overcoming obstacles", "Winning competitions", "Achieving goals", "Building confidence", "Defeating negativity"],
        meditationGuide: "Imagine yourself on a mountaintop, having just climbed a difficult path. Lauviah stands beside you, placing a crown of light on your head. Look down at all the obstacles you've overcome and feel the satisfaction of victory. Know that with divine help, you can overcome anything.",
        offerings: ["Gold items", "Victory symbols", "Athletic equipment", "Success stories"],
        timing: "Tuesday, Mars hours, When facing challenges"
      },
      {
        id: 12,
        name: "Hahaiah",
        title: "The Refuge",
        description: "Angel of refuge and divine shelter. Provides comfort in times of need.",
        domain: "Refuge, Divine Shelter",
        psalm: "Psalm 10:1",
        color: "#16a085",
        symbol: "🏠",
        invocationGuide: "1. Light a turquoise candle\n2. Create a comfortable, safe space around you\n3. Say: 'Hahaiah, Angel of Divine Refuge, I call upon your sheltering love'\n4. Speak about what you need refuge from\n5. Ask: 'Provide me sanctuary and comfort in this storm'\n6. Visualize yourself in a safe, warm sanctuary\n7. Thank Hahaiah and rest in the peace provided",
        evocationGuide: "Create a cozy nest with blankets and pillows. Visualize Hahaiah as a motherly figure opening her arms to embrace you. Feel yourself being enveloped in the warmest, safest hug you've ever experienced. Know that this divine refuge is always available to you, no matter what storms you face.",
        practicalUses: ["Finding emotional safety", "Recovering from trauma", "Creating sacred space", "Family protection", "Inner peace"],
        meditationGuide: "Picture yourself as a small child running home through a storm. You reach a beautiful house where Hahaiah waits with open arms at the door. Once inside, you're wrapped in a warm blanket by a glowing fireplace. Feel completely safe and loved, knowing this refuge is always available in your heart.",
        offerings: ["Comfort items", "Turquoise stones", "Home-baked goods", "Blankets for charity"],
        timing: "Monday, Moon hours, During difficult times"
      },
      {
        id: 13,
        name: "Iezalel",
        title: "The Praiser of God",
        description: "Angel of loyalty and friendship. Strengthens bonds and relationships.",
        domain: "Loyalty, Friendship",
        psalm: "Psalm 98:4",
        color: "#27ae60",
        symbol: "🤝",
        invocationGuide: "1. Light a green candle\n2. Hold hands with a friend or photo of loved ones\n3. Say: 'Iezalel, Angel of Divine Loyalty, I call upon your binding love'\n4. Express gratitude for friendships and relationships\n5. Ask: 'Strengthen these bonds and bring new loyal friends'\n6. Visualize golden threads connecting you to loved ones\n7. Thank Iezalel and reach out to a friend",
        evocationGuide: "Sit in a circle (real or imagined) with friends or loved ones. Visualize Iezalel at the center, weaving golden threads between all of you. Feel the strength of these connections and the angel's blessing on your relationships. Send love and loyalty to all in your circle.",
        practicalUses: ["Strengthening friendships", "Building loyalty", "Finding true friends", "Healing relationship rifts", "Creating community"],
        meditationGuide: "Envision yourself in a beautiful garden where all your friends and loved ones are gathered. Iezalel moves among you, sprinkling golden dust that makes the bonds between you glow with warm light. Feel the depth of connection and loyalty growing stronger with each person you see.",
        offerings: ["Friendship tokens", "Green plants", "Shared meals", "Letters to friends"],
        timing: "Wednesday, Mercury hours, Social gatherings"
      },
      {
        id: 14,
        name: "Mebahel",
        title: "The Liberator",
        description: "Angel of justice and truth. Brings liberation from oppression.",
        domain: "Justice, Truth",
        psalm: "Psalm 9:9",
        color: "#2980b9",
        symbol: "🗽",
        invocationGuide: "1. Light a blue candle\n2. Hold chains, rope, or symbol of what binds you\n3. Say: 'Mebahel, Angel of Divine Liberation, I call upon your freeing power'\n4. Describe what you need liberation from\n5. Ask: 'Break these chains and set me free with divine justice'\n6. Visualize chains breaking and yourself flying free\n7. Thank Mebahel and take action toward freedom",
        evocationGuide: "Stand with your arms bound (symbolically with rope or ribbon), then have someone cut them free while you visualize Mebahel as a mighty angel with a sword of light, cutting through all that binds you. Feel the liberation flowing through your entire being as you're set free.",
        practicalUses: ["Breaking free from addictions", "Escaping toxic situations", "Fighting injustice", "Finding truth", "Personal liberation"],
        meditationGuide: "See yourself in a prison cell that represents whatever limits you. Mebahel appears with a key of pure light and opens the door. Step out into brilliant sunlight, feeling completely free. Watch as the prison dissolves, knowing you can never be truly imprisoned when you have divine support.",
        offerings: ["Broken chains", "Blue stones", "Justice symbols", "Freedom writings"],
        timing: "Saturday, Saturn hours, When seeking justice"
      },
      {
        id: 15,
        name: "Hariel",
        title: "The Creator",
        description: "Angel of purification and renewal. Cleanses and renews the spirit.",
        domain: "Purification, Renewal",
        psalm: "Psalm 94:22",
        color: "#ecf0f1",
        symbol: "💧",
        invocationGuide: "1. Light a white candle near water\n2. Hold a bowl of pure water\n3. Say: 'Hariel, Angel of Divine Purification, I call upon your cleansing power'\n4. Speak about what needs to be cleansed or renewed\n5. Ask: 'Purify my spirit and renew my soul'\n6. Sprinkle water on yourself or drink some mindfully\n7. Thank Hariel for the cleansing",
        evocationGuide: "Take a ritual bath or shower, visualizing Hariel pouring pure white light over you that washes away all negativity, old patterns, and spiritual debris. Feel yourself being renewed and purified on all levels - physical, emotional, mental, and spiritual.",
        practicalUses: ["Spiritual cleansing", "Releasing old patterns", "Purifying space", "Emotional renewal", "Fresh starts"],
        meditationGuide: "Imagine standing under a waterfall of pure white light. As Hariel appears in the mist, feel the water washing away everything that no longer serves you. Emerge from the waterfall completely cleansed and renewed, like a newborn soul ready for fresh experiences.",
        offerings: ["Pure water", "White flowers", "Salt", "Cleansing herbs"],
        timing: "Monday, Moon hours, New moon"
      },
      {
        id: 16,
        name: "Hekamiah",
        title: "The Establisher",
        description: "Angel of loyalty and devotion. Strengthens faith and commitment.",
        domain: "Loyalty, Devotion",
        psalm: "Psalm 88:1",
        color: "#34495e",
        symbol: "🔗",
        invocationGuide: "1. Light a silver candle\n2. Hold a symbol of commitment (ring, contract, promise)\n3. Say: 'Hekamiah, Angel of Divine Devotion, I call upon your steadfast power'\n4. Speak about your commitments and devotions\n5. Ask: 'Strengthen my resolve and deepen my loyalty'\n6. Visualize silver chains of light binding you to your highest path\n7. Thank Hekamiah and renew your commitments",
        evocationGuide: "Kneel in meditation and visualize Hekamiah as a solemn, dignified angel holding a silver cord. Feel this cord connecting you to the divine and to your highest commitments. Let the angel's steadfast energy strengthen your resolve and deepen your devotion to your spiritual path.",
        practicalUses: ["Strengthening commitments", "Deepening devotion", "Building discipline", "Loyal relationships", "Faith development"],
        meditationGuide: "Picture yourself making a sacred vow before Hekamiah in a temple of silver light. Feel the power of your commitment resonating through your entire being. See the angel blessing your devotion and surrounding you with the strength to maintain your promises through all challenges.",
        offerings: ["Silver items", "Written commitments", "Loyalty tokens", "Devotional practices"],
        timing: "Saturday, Saturn hours, When making commitments"
      },
      {
        id: 17,
        name: "Lauviah II",
        title: "The Admirable",
        description: "Angel of revelation and spiritual insight. Brings divine revelations.",
        domain: "Revelation, Insight",
        psalm: "Psalm 8:1",
        color: "#9c88ff",
        symbol: "🌠",
        invocationGuide: "1. Light a violet candle under the stars\n2. Hold a piece of meteorite or star imagery\n3. Say: 'Lauviah, Angel of Divine Revelation, I call upon your illuminating wisdom'\n4. Ask for the specific revelation or insight you seek\n5. Say: 'Open the channels of divine communication'\n6. Meditate under the stars or starlit sky image\n7. Thank Lauviah for the revelations received",
        evocationGuide: "Go outside at night and look at the stars, or create a starry environment indoors. Visualize Lauviah as a cosmic angel made of starlight, downloading divine information directly into your consciousness. Be open to receiving insights in dreams, synchronicities, or sudden knowing.",
        practicalUses: ["Receiving divine revelations", "Understanding cosmic truths", "Prophetic dreams", "Spiritual insights", "Universal wisdom"],
        meditationGuide: "Float in space among the stars with Lauviah, an angel whose body is made of galaxies and nebulae. Feel your consciousness expanding to cosmic proportions as divine revelations flow into your awareness. Understand your place in the vast cosmic plan and receive the wisdom you've been seeking.",
        offerings: ["Star charts", "Meteorites", "Violet candles", "Dream journals"],
        timing: "Night hours, During meteor showers, Aquarius moon"
      },
      {
        id: 18,
        name: "Caliel",
        title: "The Swift to Help",
        description: "Angel of divine assistance and rapid help. Provides immediate aid.",
        domain: "Divine Assistance, Rapid Help",
        psalm: "Psalm 7:8",
        color: "#ff5722",
        symbol: "⚡",
        invocationGuide: "1. Light a red candle quickly\n2. Stand with urgency and purpose\n3. Say: 'Caliel, Angel of Swift Divine Aid, I call upon your immediate assistance'\n4. Clearly state your urgent need\n5. Ask: 'Come quickly with your divine help'\n6. Visualize lightning bringing instant solutions\n7. Thank Caliel and act immediately on any inspiration",
        evocationGuide: "In times of crisis or urgent need, call out to Caliel with complete faith. Visualize the angel as a lightning bolt of divine energy instantly arriving to provide exactly what you need. Feel the immediate shift in energy and circumstances as divine aid manifests.",
        practicalUses: ["Emergency situations", "Urgent needs", "Crisis intervention", "Immediate solutions", "Divine timing"],
        meditationGuide: "See yourself in a moment of great need, calling out to the heavens. Instantly, Caliel appears as a flash of lightning, bringing exactly what you require. Feel the relief and gratitude as divine assistance arrives at the perfect moment. Know this help is always available instantly.",
        offerings: ["Red candles", "Lightning imagery", "Urgent prayers", "Gratitude offerings"],
        timing: "Any time of urgent need, Storm hours, Emergency situations"
      },
      {
        id: 19,
        name: "Leuviah",
        title: "The Hearing of God",
        description: "Angel of memory and intelligence. Enhances mental faculties.",
        domain: "Memory, Intelligence",
        psalm: "Psalm 40:1",
        color: "#607d8b",
        symbol: "🧠",
        invocationGuide: "1. Light a blue-gray candle\n2. Hold a book or symbol of learning\n3. Say: 'Leuviah, Angel of Divine Intelligence, I call upon your mental enhancement'\n4. Describe what you need to remember or understand\n5. Ask: 'Expand my memory and sharpen my intelligence'\n6. Visualize your brain glowing with divine light\n7. Thank Leuviah and begin your mental work",
        evocationGuide: "Sit in study position with books around you. Visualize Leuviah as a scholarly angel with multiple heads, each representing different aspects of intelligence. Feel divine knowledge flowing directly into your mind, enhancing your memory and understanding capabilities.",
        practicalUses: ["Studying for exams", "Improving memory", "Mental clarity", "Learning new skills", "Problem solving"],
        meditationGuide: "Imagine your brain as a vast library where Leuviah serves as the divine librarian. Watch as the angel organizes your memories, enhances your understanding, and creates new neural pathways for learning. Feel your intelligence expanding and your memory becoming crystal clear.",
        offerings: ["Books", "Study materials", "Brain-healthy foods", "Learning tools"],
        timing: "Wednesday, Mercury hours, Before studying"
      },
      {
        id: 20,
        name: "Pahaliah",
        title: "The Redeemer",
        description: "Angel of redemption and spiritual liberation. Frees from bondage.",
        domain: "Redemption, Liberation",
        psalm: "Psalm 120:1",
        color: "#795548",
        symbol: "🔓",
        invocationGuide: "1. Light a brown candle\n2. Hold a key or symbol of freedom\n3. Say: 'Pahaliah, Angel of Divine Redemption, I call upon your liberating grace'\n4. Confess what you need redemption from\n5. Ask: 'Free me from this bondage and grant spiritual liberation'\n6. Visualize chains falling away and light entering\n7. Thank Pahaliah and commit to your new freedom",
        evocationGuide: "In a moment of deep repentance and desire for change, visualize Pahaliah as an angel with keys to every lock that binds you. Feel the angel unlocking the chains of addiction, negative patterns, or spiritual bondage. Step into the light of redemption and new life.",
        practicalUses: ["Breaking addictions", "Spiritual redemption", "Freedom from guilt", "Pattern breaking", "Soul liberation"],
        meditationGuide: "See yourself in a prison of your own making, surrounded by the chains of old patterns and mistakes. Pahaliah appears with a golden key, unlocking every chain and opening the prison door. Step out into brilliant light, completely redeemed and free to begin anew.",
        offerings: ["Keys", "Freedom symbols", "Redemption writings", "Acts of service"],
        timing: "Sunday, Solar hours, During repentance"
      }
    ];
    
    setAngels(angelicEntities);
    setFilteredAngels(angelicEntities);
  }, []);

  // Filter angels based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAngels(angels);
      return;
    }
    
    const filtered = angels.filter(angel => 
      angel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      angel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      angel.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredAngels(filtered);
  }, [searchTerm, angels]);

  const handleInvokeAngel = (angel: AngelEntity) => {
    setSelectedAngel(angel);
    setActiveTab('invocation');
    setInvocationText(`Blessed ${angel.name}, ${angel.title}, I humbly call upon your divine presence. ${angel.domain.toLowerCase()} is what I seek. Please guide me with your divine wisdom and assistance...`);
  };

  const submitInvocation = async () => {
    if (!selectedAngel || !invocationText) {
      toast({
        title: "Incomplete Invocation",
        description: "Please select an angel and enter your invocation text.",
        variant: "destructive"
      });
      return;
    }
    
    setIsInvoking(true);
    
    try {
      toast({
        title: "✨ Invocation Sent",
        description: `Your request to ${selectedAngel.name} has been received. Divine assistance is on its way.`,
      });
      
      console.log("Invocation:", {
        angel: selectedAngel.name,
        text: invocationText,
        timestamp: new Date().toISOString()
      });
      
      // Simulate connection establishing
      setTimeout(() => {
        setConnectionActive(true);
        setIsInvoking(false);
        toast({
          title: `🌟 ${selectedAngel.name} Connected`,
          description: "The angelic presence is now with you. Begin your meditation or requested work.",
        });
      }, 3000);
      
    } catch (error) {
      console.error('Invocation error:', error);
      setIsInvoking(false);
    }
  };

  const startMeditation = (angel: AngelEntity) => {
    setConnectionActive(true);
    toast({
      title: `🧘‍♀️ Meditation with ${angel.name}`,
      description: "Beginning guided meditation session. Find a comfortable position.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Angelic Assistance</h2>
        <p className="text-purple-200">Connect with divine angelic entities for protection, guidance, and assistance</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30">
          <TabsTrigger value="directory" className="data-[state=active]:bg-purple-600">
            <Sparkles className="w-4 h-4 mr-2" />
            Angelic Directory
          </TabsTrigger>
          <TabsTrigger value="invocation" className="data-[state=active]:bg-purple-600">
            <Heart className="w-4 h-4 mr-2" />
            Divine Invocation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="directory" className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
            <Input
              placeholder="Search angels by name, title, or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/30 border-purple-500/30 text-white placeholder:text-purple-300"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAngels.length > 0 ? (
              filteredAngels.map(angel => (
                <Card 
                  key={angel.id} 
                  className="bg-black/30 border-purple-500/30 backdrop-blur-sm transition-all duration-200 hover:bg-black/40 hover:border-purple-400/50 cursor-pointer"
                  onClick={() => handleInvokeAngel(angel)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2"
                        style={{ 
                          backgroundColor: `${angel.color}20`,
                          borderColor: `${angel.color}40`
                        }}
                      >
                        {angel.symbol}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{angel.name}</CardTitle>
                        <p className="text-purple-300 text-sm">{angel.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-200 text-sm mb-3">{angel.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-purple-400">Domain:</span>
                        <span className="text-purple-200">{angel.domain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-400">Psalm:</span>
                        <span className="text-purple-200">{angel.psalm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-400">Best Time:</span>
                        <span className="text-purple-200">{angel.timing}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInvokeAngel(angel);
                        }}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Invoke
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 border-purple-500/50 text-purple-200 hover:bg-purple-900/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAngel(angel);
                          startMeditation(angel);
                        }}
                      >
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Meditate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-4xl mb-4">😇</div>
                <p className="text-purple-300">No angels found matching your search</p>
                <p className="text-purple-400 text-sm mt-2">Try searching for different terms</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="invocation" className="space-y-4">
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-xl p-6 max-w-4xl mx-auto backdrop-blur-sm border border-purple-500/30">
            {selectedAngel ? (
              <div className="space-y-6">
                {/* Angel Info Header */}
                <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-purple-500/30">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2"
                    style={{ 
                      backgroundColor: `${selectedAngel.color}20`,
                      borderColor: `${selectedAngel.color}40`
                    }}
                  >
                    {selectedAngel.symbol}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-white">{selectedAngel.name}</h4>
                    <p className="text-purple-300">{selectedAngel.title}</p>
                    <p className="text-sm text-purple-400">Domain: {selectedAngel.domain}</p>
                    <p className="text-sm text-purple-400">Best Time: {selectedAngel.timing}</p>
                  </div>
                  {connectionActive && (
                    <div className="text-green-400 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Connected
                      </div>
                    </div>
                  )}
                </div>

                {/* Tabbed Content */}
                <Tabs defaultValue="guide" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-black/30">
                    <TabsTrigger value="guide">Invocation Guide</TabsTrigger>
                    <TabsTrigger value="evocation">Evocation</TabsTrigger>
                    <TabsTrigger value="meditation">Meditation</TabsTrigger>
                    <TabsTrigger value="practical">Practical Uses</TabsTrigger>
                  </TabsList>

                  <TabsContent value="guide" className="space-y-4">
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">How to Invoke {selectedAngel.name}</h5>
                      <div className="bg-black/40 p-4 rounded-lg border border-purple-500/20">
                        <pre className="text-purple-100 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                          {selectedAngel.invocationGuide}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Offerings & Timing</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/40 p-4 rounded-lg border border-purple-500/20">
                          <h6 className="text-purple-300 font-medium mb-2">Recommended Offerings:</h6>
                          <ul className="text-purple-100 text-sm space-y-1">
                            {selectedAngel.offerings.map((offering, index) => (
                              <li key={index}>• {offering}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-black/40 p-4 rounded-lg border border-purple-500/20">
                          <h6 className="text-purple-300 font-medium mb-2">Best Timing:</h6>
                          <p className="text-purple-100 text-sm">{selectedAngel.timing}</p>
                          <h6 className="text-purple-300 font-medium mb-2 mt-3">Associated Psalm:</h6>
                          <p className="text-purple-100 text-sm">{selectedAngel.psalm}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Your Personal Invocation</h5>
                      <Textarea
                        value={invocationText}
                        onChange={(e) => setInvocationText(e.target.value)}
                        className="min-h-[120px] bg-black/30 border-purple-500/30 text-white placeholder:text-purple-300"
                        placeholder="Speak from your heart with pure intention..."
                      />
                      <div className="mt-3 flex gap-3 justify-center">
                        <Button
                          onClick={submitInvocation}
                          disabled={isInvoking}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          {isInvoking ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Invoking...
                            </div>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Send Invocation
                            </>
                          )}
                        </Button>
                        <VoicePlayer 
                          script={invocationText || `Calling upon ${selectedAngel.name}, ${selectedAngel.title}`}
                          tone="compassionate"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="evocation" className="space-y-4">
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Evocation Technique</h5>
                      <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                        <p className="text-blue-100 whitespace-pre-wrap leading-relaxed">
                          {selectedAngel.evocationGuide}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button 
                        onClick={() => startMeditation(selectedAngel)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Begin Evocation
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="meditation" className="space-y-4">
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Guided Meditation with {selectedAngel.name}</h5>
                      <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                        <p className="text-green-100 whitespace-pre-wrap leading-relaxed">
                          {selectedAngel.meditationGuide}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3">
                      <Button 
                        onClick={() => startMeditation(selectedAngel)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Meditation
                      </Button>
                      <VoicePlayer 
                        script={selectedAngel.meditationGuide}
                        tone="nurturing_gentle"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="practical" className="space-y-4">
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Practical Applications</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedAngel.practicalUses.map((use, index) => (
                          <div key={index} className="bg-amber-900/30 p-3 rounded-lg border border-amber-500/30">
                            <div className="flex items-center text-amber-100">
                              <span className="mr-2 text-amber-400">✓</span>
                              <span className="text-sm">{use}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                      <h6 className="text-orange-200 font-medium mb-2">Daily Practice Ideas:</h6>
                      <ul className="text-orange-100 text-sm space-y-1 list-disc pl-5">
                        <li>Carry a small symbol or image of {selectedAngel.name}</li>
                        <li>Repeat the angel's name as a protective mantra</li>
                        <li>Visualize {selectedAngel.color} light surrounding you</li>
                        <li>Read {selectedAngel.psalm} during challenges</li>
                        <li>Offer {selectedAngel.offerings[0]} weekly as gratitude</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✨</div>
                <h4 className="text-xl font-semibold mb-2 text-white">Select an Angel for Assistance</h4>
                <p className="text-purple-200 mb-6">
                  Choose an angel from the directory to request divine assistance, protection, or guidance.
                </p>
                <Button
                  onClick={() => setActiveTab('directory')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                >
                  Browse Angelic Directory
                </Button>
              </div>
            )}
            
            <div className="mt-8 text-center text-sm text-purple-400 space-y-1">
              <p>✨ Invoke angels with pure intention and an open heart for best results</p>
              <p>🙏 Your requests are received in the divine realm instantly</p>
              <p>💫 Divine assistance flows through love, gratitude, and faith</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AngelicAssistance;
