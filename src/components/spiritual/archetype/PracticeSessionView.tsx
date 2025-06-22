import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw, Check } from "lucide-react";
import { CulturalTradition } from '@/types/archetype';

interface PracticeSessionViewProps {
  tradition: CulturalTradition;
  onBack: () => void;
}

interface PracticeStep {
  id: string;
  title: string;
  duration: number; // in minutes
  instructions: string;
  mantra?: string;
}

export const PracticeSessionView: React.FC<PracticeSessionViewProps> = ({
  tradition,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const getPracticeSteps = (): PracticeStep[] => {
    const practiceSteps = {
      'buddhist': [
        {
          id: 'preparation',
          title: 'Sacred Space Preparation',
          duration: 5,
          instructions: `Begin by finding a quiet, clean space where you won't be disturbed. This is your sacred sanctuary for practice.

1. Sit comfortably with your spine naturally straight - not rigid, but upright and dignified. You may sit on a cushion, chair, or meditation bench.

2. If available, light a stick of incense (sandalwood or jasmine are traditional) to purify the space and create a sacred atmosphere.

3. Place your hands in the traditional meditation mudra: Rest your right hand on top of your left hand, both palms facing upward, with your thumbs gently touching to form a small oval. This hand position helps maintain alertness and creates energetic balance.

4. Close your eyes gently or maintain a soft, downward gaze about 3 feet in front of you.

5. Take three deep breaths, releasing any tension from your day. With each exhale, let go of worldly concerns and prepare your mind for spiritual practice.

6. Silently recite your intention: "I practice for the benefit of all sentient beings, that they may be free from suffering and find lasting happiness."`,
          mantra: 'Buddham saranam gacchami, Dhammam saranam gacchami, Sangham saranam gacchami (I take refuge in the Buddha, the Dharma, and the Sangha)'
        },
        {
          id: 'breathing',
          title: 'Mindful Breathing (Anapanasati)',
          duration: 10,
          instructions: `This is the foundation of Buddhist meditation - developing concentrated awareness through mindful breathing.

1. Begin by simply observing your natural breath without trying to change it. Notice the sensation of breathing in and breathing out.

2. Feel the breath at your nostrils - the cool air entering and the warm air leaving. This is your anchor point.

3. Count your breaths to develop concentration: Inhale (1), exhale (1), inhale (2), exhale (2), continuing up to 10, then start again at 1.

4. When your mind wanders (and it will - this is completely normal), gently acknowledge the wandering thought without judgment, then kindly return your attention to the breath count.

5. As you continue, notice the three parts of each breath: the beginning of the inhalation, the middle pause, and the completion of the exhalation.

6. If you lose count, simply start again at 1. This isn't a failure - it's practice. Each return to the breath is a moment of awakening.

7. In the final minutes, let go of counting and simply rest in pure awareness of breathing, developing what Buddha called "samatha" - peaceful concentration.`,
          mantra: 'Breathing in, I know this is an in-breath. Breathing out, I know this is an out-breath. Breathing in, I calm my body. Breathing out, I smile.'
        },
        {
          id: 'loving-kindness',
          title: 'Metta (Loving-Kindness) Meditation',
          duration: 15,
          instructions: `This practice develops unconditional love and compassion, starting with yourself and extending to all beings.

**Phase 1 - Self-Love (3 minutes):**
Place your hand on your heart. Visualize yourself as you are right now, with all your imperfections and struggles. Send yourself genuine loving-kindness by silently repeating:
- "May I be happy and joyful"
- "May I be peaceful and at ease"
- "May I be free from suffering and pain"
- "May I live with love and compassion"
- "May I be healthy and strong"

Feel these wishes arising from your heart. If resistance comes up, that's normal - be patient and gentle with yourself.

**Phase 2 - Loved Ones (3 minutes):**
Bring to mind someone you love easily - a family member, friend, or pet. See their face clearly and feel your natural love for them. Extend the same wishes:
- "May you be happy and joyful"
- "May you be peaceful and at ease"
- Continue with all five phrases, genuinely wishing for their wellbeing.

**Phase 3 - Neutral Person (3 minutes):**
Think of someone neutral - a cashier, neighbor, or acquaintance. Someone you neither love nor dislike. This is where the practice deepens. Send them the same loving wishes, recognizing their humanity and their desire for happiness just like yours.

**Phase 4 - Difficult Person (3 minutes):**
This is the most challenging phase. Bring to mind someone who has hurt or annoyed you. Start with someone mildly difficult, not your worst enemy. Remember, you're not condoning their actions - you're freeing your heart from resentment. Send them loving-kindness for your own liberation.

**Phase 5 - All Beings (3 minutes):**
Expand your circle of compassion to include all living beings everywhere - in your city, country, world, and throughout the universe. Visualize your loving-kindness radiating out like sunlight:
- "May all beings everywhere be happy"
- "May all beings be free from suffering"
- "May all beings live in peace and harmony"

End by resting in the warm feeling of universal love you've cultivated.`,
          mantra: 'May all beings be happy. May all beings be peaceful. May all beings be free from suffering. May all beings awaken to their true nature.'
        },
        {
          id: 'contemplation',
          title: 'Dharma Contemplation - Impermanence',
          duration: 10,
          instructions: `This contemplation develops wisdom by deeply understanding the Buddha's teaching on impermanence (anicca).

1. **Begin with Personal Impermanence (3 minutes):**
Reflect on your own body and mind. Notice how your thoughts are constantly changing - one thought arises, exists briefly, then passes away, replaced by another. Your emotions shift throughout the day. Your body is aging moment by moment. Contemplate: "This body is not permanent. These thoughts are not permanent. This very experience right now is passing away."

2. **Contemplate Relationships (2 minutes):**
Think about people in your life. Everyone you know will someday pass away, including yourself. All relationships are temporary. This isn't morbid - it's the truth that helps us appreciate each moment we have together. Feel both the sadness and the preciousness this brings.

3. **Contemplate Material Things (2 minutes):**
Look around you. Your home, possessions, even the Earth itself will not last forever. Nations rise and fall. Mountains erode. Stars burn out. Everything constructed will eventually be deconstructed. Notice any attachment you feel and gently let it go.

4. **Contemplate Experiences (2 minutes):**
Remember your happiest moments and your most difficult times. All have passed. Current joys will pass, and current sorrows will also pass. This understanding brings both humility about good times and comfort during difficulties.

5. **Rest in Wisdom (1 minute):**
Having deeply contemplated impermanence, rest in the peace that comes from not grasping. When we truly understand that everything changes, we can appreciate each moment without clinging to it. This is the beginning of liberation from suffering.

End by appreciating this very moment of practice, knowing it too is impermanent and therefore precious.`,
          mantra: 'Gate gate pāragate pārasaṃgate bodhi svāhā (Gone, gone, gone beyond, gone completely beyond - awakening!)'
        }
      ],
      'celtic': [
        {
          id: 'grounding',
          title: 'Earth Connection Ritual',
          duration: 5,
          instructions: `Connect with the ancient Celtic wisdom of the Earth and your ancestral roots.

1. **Physical Grounding (2 minutes):**
If possible, step outside and stand barefoot on natural earth, grass, or stone. If indoors, place your hands on a wooden surface or hold a stone. Feel the solid support beneath you.

2. **Visualization (2 minutes):**
Close your eyes and imagine strong, golden roots growing from the soles of your feet deep into the earth. These roots extend down through soil, rock, and underground streams, connecting you to the very heart of Mother Earth. Feel her ancient strength flowing up through your roots.

3. **Ancestral Connection (1 minute):**
Remember that this same earth supported your ancestors for thousands of years. The Celts who walked these lands, who celebrated the seasons, who honored the sacred groves - their wisdom flows in your blood. Feel their presence supporting you.

As you breathe, draw up the earth's stability and the ancestors' wisdom. Let it fill your entire being, grounding you in ancient strength and timeless connection to the land.`,
          mantra: 'I am rooted in the sacred earth, connected to all that came before. The wisdom of my ancestors flows through me.'
        },
        {
          id: 'tree-wisdom',
          title: 'Tree Spirit Communication',
          duration: 15,
          instructions: `In Celtic tradition, trees are sacred teachers and portals to the Otherworld. Each tree offers different wisdom.

**Preparation (2 minutes):**
If possible, sit with your back against a living tree, or hold a piece of wood (oak, ash, or thorn are especially sacred to the Celts). If neither is available, strongly visualize your chosen tree. Close your eyes and place your hands on the tree or wood.

**Tree Selection and Connection (3 minutes):**
Choose your tree ally:
- **Oak**: For strength, endurance, and protection
- **Ash**: For connection between worlds and cosmic wisdom  
- **Hawthorn**: For protection and fairy magic
- **Birch**: For new beginnings and purification
- **Willow**: For intuition and lunar wisdom
- **Apple**: For love, healing, and Otherworld journeys

Feel into the tree's energy. Trees experience time differently than humans - they have witnessed decades or centuries of seasons, storms, and growth.

**Listening Practice (5 minutes):**
Place your forehead against the tree (or visualize this clearly). Ask silently: "Ancient tree, what wisdom do you have for me today?" Then listen with your whole being - not just your ears, but your heart and intuition.

Tree wisdom often comes as:
- Images or visions
- Feelings of peace, strength, or clarity
- Sudden insights about your life
- A sense of deep, wordless knowing
- Physical sensations of energy or tingling

**Integration (3 minutes):**
Thank the tree spirit for sharing its wisdom. Promise to honor what you've received by living more in harmony with natural cycles. Feel yourself as part of the great web of life that connects all growing things.

**Closing (2 minutes):**
Before leaving, offer something in return - water for the tree's roots, a prayer of gratitude, or a promise to protect nature. This maintains the sacred reciprocity that is central to Celtic spirituality.`,
          mantra: 'Ancient tree, wise and true, share your wisdom, make me new. In the dance of earth and sky, teach me how to live and die.'
        },
        {
          id: 'ancestor-calling',
          title: 'Ancestor Invocation Ceremony',
          duration: 10,
          instructions: `The Celts maintained strong connections with their ancestors, believing they continued to guide and protect the living.

**Sacred Space Preparation (2 minutes):**
Light a white or gold candle to represent the eternal flame of memory. Place it in front of you along with any photos of deceased loved ones, family heirlooms, or symbols of your heritage. If you have none, that's fine - the connection exists in your blood and spirit.

**Calling the Ancestors (3 minutes):**
Speak aloud or silently:
"Ancestors of my blood and spirit, I call upon you now. Those who came before me, who struggled and loved and dreamed, whose lives made my life possible. I honor the sacrifices you made, the wisdom you gained, the love you shared."

If you know their names, speak them: "I call upon [name], and [name], and [name]..." If you don't know specific names, say: "I call upon all my ancestors, known and unknown, recent and ancient."

**Listening for Guidance (3 minutes):**
Sit quietly and open your heart to receive their presence. Ancestral guidance often comes as:
- Sudden knowing about a situation you're facing
- Memories of family stories or sayings that now seem relevant
- A feeling of being held or supported
- Images or dreams of deceased loved ones
- A sense of strength or courage flowing into you

Ask them: "What guidance do you have for me? How can I honor your memory in how I live my life?"

**Offering Gratitude (2 minutes):**
Thank your ancestors for their presence and guidance. Promise to carry forward their best qualities - their love, their strength, their wisdom. Commit to being a good ancestor yourself for future generations.

End by saying: "I carry your love in my heart and your wisdom in my actions. Until we meet again in the Summerland, watch over me and guide my steps."`,
          mantra: 'Ancestors wise, hear my call, guide my steps through rise and fall. In my heart your wisdom dwells, through my life your story tells.'
        },
        {
          id: 'blessing',
          title: 'Celtic Blessing and Closing',
          duration: 5,
          instructions: `End your practice with traditional Celtic blessings that invoke protection and guidance.

**Gratitude to the Land (2 minutes):**
Face each direction if possible, or simply turn your attention to each in your mind:
- **East**: "I thank the East, place of new dawns and fresh beginnings"
- **South**: "I thank the South, place of growth and fullness of life"  
- **West**: "I thank the West, place of wisdom and the Otherworld"
- **North**: "I thank the North, place of ancestors and ancient wisdom"
- **Center**: "I thank the sacred center, the place where all directions meet in my heart"

**Personal Blessing (2 minutes):**
Place your hands over your heart and speak this traditional Irish blessing, personalizing it for your life:

"May the road rise up to meet me,
May the wind be always at my back,
May the sun shine warm upon my face,
May the rain fall softly on my fields.
And until we meet again,
May the spirits of the land hold me in the palm of their hands."

**Closing Commitment (1 minute):**
Make a commitment to live in harmony with the natural world and to honor the wisdom you've received. Say: "I go forth with the blessings of the earth, the wisdom of the ancestors, and the protection of the ancient ones. Blessed be this day and all who share it with me."

Blow out your candle, sending your prayers up with the smoke, carrying your intentions to the Otherworld.`,
          mantra: 'May the ancient blessings be upon me, may the old ways guide my steps, and may I walk in beauty all the days of my life.'
        }
      ],
      'norse': [
        {
          id: 'preparation',
          title: 'Warrior\'s Sacred Stance',
          duration: 5,
          instructions: `Prepare yourself as the ancient Norse warriors did before battle or sacred ritual.

**Physical Preparation (2 minutes):**
Stand tall with your feet shoulder-width apart, grounding yourself like the roots of Yggdrasil, the World Tree. Feel your connection to the earth below and the sky above. Roll your shoulders back, lift your chest, and hold your head high with the dignity of one who walks between the worlds.

Place your right fist over your heart (the traditional gesture of honor) and speak aloud: "I stand before the gods as a warrior of the spirit, ready to face truth, seek wisdom, and live with honor."

**Invoking the Gods (2 minutes):**
Call upon the Norse pantheon for guidance and strength:

"All-Father Odin, one-eyed seeker of wisdom, grant me your insight and courage to see truth even when it's difficult."

"Mighty Thor, protector of Midgard, lend me your strength to face life's challenges with bravery."

"Beautiful Freya, mistress of love and war, help me balance fierce determination with compassion."

"Wise Frigg, all-mother who sees the threads of fate, grant me acceptance of what cannot be changed and wisdom to change what I can."

**Sacred Declaration (1 minute):**
Declare your intention for this practice: "I come before you, gods of my ancestors, seeking to grow in wisdom, courage, and honor. I ask for your guidance as I walk the path of the warrior-spirit in this modern world. Help me to be worthy of the ancient ways while serving the present moment."

Feel the presence of the gods witnessing your sincerity and your commitment to growth.`,
          mantra: 'By Odin\'s wisdom, Thor\'s strength, and Freya\'s love, I stand ready. The blood of warriors flows in my veins, the fire of the gods burns in my heart.'
        },
        {
          id: 'rune-casting',
          title: 'Rune Wisdom Seeking',
          duration: 15,
          instructions: `Use the ancient Norse runes to seek guidance from the gods and the Well of Urd (fate).

**Preparation and Intention (3 minutes):**
If you have physical runes, hold them in your hands and feel their weight and texture. If not, visualize them clearly - 24 ancient symbols carved in wood or stone, each holding cosmic power and wisdom.

Speak your question clearly: "What wisdom do the runes offer me today?" or ask about a specific situation you're facing. The runes respond best to questions about understanding, growth, and right action rather than simple yes/no questions.

**Three Rune Spread - The Norns (9 minutes):**
Draw or visualize three runes representing the three Norns (goddesses of fate):

**First Rune - Urd (Past/Foundation) - 3 minutes:**
This rune reveals what from your past influences your current situation. Contemplate its meaning:
- What patterns, lessons, or experiences shaped this moment?
- What wisdom have you gained that applies now?
- What do you need to release or honor from what came before?

**Second Rune - Verdandi (Present/Action) - 3 minutes:**
This rune shows what you need to understand or do right now. Reflect deeply:
- What is your true situation, stripped of illusions?
- What action does honor require of you?
- How can you embody the warrior spirit in this moment?

**Third Rune - Skuld (Future/Potential) - 3 minutes:**
This rune reveals the potential outcome if you follow the path of wisdom and honor. Consider:
- What could manifest if you act with courage and wisdom?
- What are you being called to become?
- How might the gods be guiding your growth?

**Integration and Gratitude (3 minutes):**
Thank the Norns for their guidance and the runes for their wisdom. Journal the insights if possible, or commit them firmly to memory. The runes have spoken - now it's your responsibility to act on their guidance with courage and integrity.

Remember: The runes don't predict a fixed future - they reveal the currents of fate and possibility, empowering you to navigate with wisdom.`,
          mantra: 'Runes of power, runes of might, symbols carved in wood and stone, guide me through the sacred night, make your ancient wisdom known.'
        },
        {
          id: 'inner-journey',
          title: 'Journey to Asgard via Yggdrasil',
          duration: 15,
          instructions: `Take a shamanic journey up the World Tree to seek counsel from the gods in Asgard.

**Beginning the Journey (3 minutes):**
Lie down or sit comfortably with your back straight. Close your eyes and begin to visualize:

You stand at the base of Yggdrasil, the mighty World Tree whose roots extend through all the nine realms. Its trunk is so vast you cannot see around it, its branches disappear into the cosmic sky. Feel the power radiating from this axis of all existence.

At the base of the tree, you see a small door carved into the bark, glowing with soft golden light. This is your entrance to the sacred journey.

**Climbing the World Tree (4 minutes):**
Step through the door and find yourself inside the hollow trunk of Yggdrasil. A spiraling staircase of living wood winds upward, glowing with runic symbols that pulse with each of your heartbeats.

Begin climbing. With each step, feel yourself becoming lighter, more luminous. The runes on the walls whisper ancient secrets as you pass. You hear the sound of the Well of Urd bubbling far below, and the rustling of Yggdrasil's leaves high above.

As you climb, you shed the concerns of Midgard (the human world). Your ordinary identity falls away, and you become a seeker of divine wisdom.

**Entering Asgard (3 minutes):**
You emerge onto a vast plain of golden light - Asgard, realm of the gods. The air here thrums with power and ancient wisdom. Before you stretches a great hall with many doors - Gladsheim, where the gods hold council.

Choose which god to visit based on your current needs:
- **Odin's Hall**: For wisdom, magic, and understanding of sacrifice
- **Thor's Hall**: For strength, protection, and facing challenges
- **Freya's Hall**: For love, beauty, and warrior spirit combined
- **Frigg's Hall**: For motherly wisdom and seeing the bigger picture
- **Balder's Hall**: For peace, purity, and healing

**Divine Counsel (4 minutes):**
Enter your chosen hall and approach the god or goddess. They appear as feels right to you - sometimes as the traditional depictions, sometimes in forms your psyche can best understand.

Bow with respect and state your question or need for guidance. Divine guidance often comes as:
- Direct words or images
- Symbolic visions that require interpretation
- Gifts or tools they place in your hands
- Changes in how you feel or see your situation
- Sudden knowing or clarity

Ask any follow-up questions you need. The gods respect sincere seekers.

**Return Journey (1 minute):**
Thank the deity for their wisdom and ask for their continued guidance in your daily life. Walk back to Yggdrasil and descend the spiral staircase, carrying their wisdom back to Midgard.

Step out through the door at the base of the tree and return to your physical body, but retain the divine guidance you've received.`,
          mantra: 'Up the tree of worlds I climb, seeking wisdom beyond time. Gods of old, hear my call, grant me strength to stand up tall.'
        },
        {
          id: 'oath-taking',
          title: 'Sacred Oath of Honor',
          duration: 5,
          instructions: `In Norse tradition, oaths were sacred bonds witnessed by the gods themselves. Create your oath for this day.

**Preparation (1 minute):**
Stand with your right hand raised toward the sky (the traditional oath-taking posture). Feel the presence of the gods witnessing this moment. Your word, once given, becomes a sacred bond that shapes your fate.

**Crafting Your Oath (2 minutes):**
Based on the wisdom you've received in this practice, create a specific, achievable oath for today. Examples:

"By Thor's hammer and Odin's wisdom, I swear to face this day's challenges with courage and speak only truth."

"I swear by the gods who watch over me to treat myself and others with the respect due to fellow warriors on life's journey."

"By the fire of Freya and the steadfastness of the ash tree, I oath to act with both strength and compassion in all my dealings today."

Make it personal and specific to your current situation and needs.

**Speaking the Oath (1 minute):**
Speak your oath aloud with conviction and power. Let your voice carry the weight of sacred commitment. Feel the gods witnessing and accepting your pledge.

**Sealing the Oath (1 minute):**
Lower your hand to your heart and say: "This oath I swear by my honor, my ancestors, and the gods who guide me. May my actions today prove worthy of their trust and make my ancestors proud. If I break this sacred word, may the gods judge me accordingly, but I swear by all that's holy that I shall keep faith."

Feel the binding power of your oath. This isn't just a promise - it's a sacred commitment that connects you to the cosmic order and your highest self.

Throughout your day, remember this oath and let it guide your choices. Tonight, reflect on how well you honored it, celebrating your successes and learning from any moments you fell short.`,
          mantra: 'By my word and sacred oath, I walk the path of honor both. The gods witness what I swear, by their strength my burden bear.'
        }
      ],
      'egyptian': [
        {
          id: 'purification',
          title: 'Sacred Purification Ritual',
          duration: 5,
          instructions: `Purify yourself as the ancient Egyptian priests did before entering the sacred temples.

1. **Physical Preparation (2 minutes):**
If possible, wash your hands and face with cool water, imagining you're performing ablutions in the sacred Nile. As you do this, visualize the water washing away not just physical impurities, but negative thoughts, doubts, and spiritual obstacles.

2. **Visualization of the Nile (2 minutes):**
Close your eyes and imagine yourself standing on the banks of the sacred Nile at dawn. The sun god Ra is rising in the east, painting the sky gold and crimson. Step into the cool, life-giving waters of the Nile - the same waters that blessed the pharaohs and nourished the land of Egypt for millennia.

3. **Invocation of Purity (1 minute):**
As you stand in the visualized waters, speak: "By the power of Ra, the light of truth, I am purified. By the wisdom of Thoth, the scribe of the gods, I am prepared. By the protection of Isis, the great mother, I am blessed. I enter this sacred practice with a clean heart and clear mind, ready to receive the wisdom of the ancient ones."

Feel yourself emerging from the Nile renewed, carrying the blessing of the life-giving waters into your spiritual practice.`,
          mantra: 'By the power of Ra, I am purified. By the wisdom of Thoth, I am prepared. By the love of Isis, I am blessed.'
        },
        {
          id: 'maat-balance',
          title: 'Ma\'at Balance and Truth Meditation',
          duration: 15,
          instructions: `Work with Ma'at, the goddess of truth, justice, and cosmic balance, to align your life with divine order.

**Understanding Ma'at (3 minutes):**
Visualize Ma'at, the goddess with an ostrich feather in her hair, representing absolute truth and balance. In the afterlife, Egyptians believed their hearts would be weighed against her feather. A heart lighter than the feather - meaning a life lived in truth and harmony - would be granted eternal life.

**Heart Examination (5 minutes):**
Place your hands over your heart and ask Ma'at to help you examine your life honestly:

- **Truth in Speech**: How often do you speak with complete honesty? Where do you need to be more truthful with yourself and others?
- **Justice in Actions**: Are your actions fair and considerate of others? Where might you need to make amends?
- **Balance in Living**: What areas of your life are out of balance? Work and rest, giving and receiving, solitude and community?
- **Harmony with Natural Order**: How well do you live in harmony with natural cycles and universal principles?

Don't judge what you discover - simply observe with the clear sight of Ma'at.

**The Weighing Ceremony (4 minutes):**
Visualize yourself in the Hall of Two Truths. Your heart sits on one side of Ma'at's golden scales, her feather of truth on the other. Watch the scales:

- If your heart is heavy (weighted with dishonesty, cruelty, or imbalance), visualize what you need to release or change
- If your heart is light (aligned with truth and justice), feel the peace of living in harmony with cosmic order

**Commitment to Truth (3 minutes):**
Make specific commitments to live more in alignment with Ma'at's principles:
- "I commit to speaking more truthfully about..."
- "I will restore balance in my life by..."
- "I will act more justly toward..."

Feel Ma'at's presence blessing your sincere intention to live in greater harmony with divine truth.`,
          mantra: 'Ma\'at, goddess of truth and justice, balance my heart with your feather. Help me live in harmony with divine order and cosmic truth.'
        },
        {
          id: 'ankh-breathing',
          title: 'Ankh Life Force Breathing',
          duration: 10,
          instructions: `Work with the ankh, the Egyptian symbol of eternal life, to circulate divine life force through your being.

**Ankh Visualization (2 minutes):**
Visualize a glowing golden ankh at your heart center. The ankh represents the union of masculine and feminine, earth and heaven, mortal and divine. Feel this sacred symbol pulsing with the eternal life force that flows through all existence.

**Breathing the Life Force (6 minutes):**
Begin a rhythmic breathing pattern:

**Inhale (4 counts)**: Breathe golden light up from the earth through the bottom of the ankh (the cross portion). This earthly energy grounds you and provides stability.

**Hold (2 counts)**: The breath pauses at the heart, where earthly and heavenly energies meet in the ankh.

**Exhale (4 counts)**: Breathe golden light up through the loop of the ankh toward the heavens, connecting you to divine consciousness.

**Hold (2 counts)**: Rest in the space of unity before beginning the next breath.

With each complete breath cycle, feel more life force circulating through your entire being. The ankh at your heart becomes brighter and more vibrant.

**Full Body Circulation (2 minutes):**
Now expand the visualization: As you inhale, golden ankh energy flows from your heart to every cell of your body. As you exhale, this divine life force radiates out from your body to bless all beings around you.

Feel yourself as a living ankh - a bridge between earth and heaven, a conduit for divine life force to flow into the world.`,
          mantra: 'Ankh of life, breath of gods, fill me with eternal light. Through me flows the sacred force that makes all darkness bright.'
        },
        {
          id: 'pyramid-ascension',
          title: 'Great Pyramid Consciousness Journey',
          duration: 10,
          instructions: `Journey into the Great Pyramid of Giza for an initiation into higher consciousness.

**Entering the Pyramid (2 minutes):**
Visualize yourself standing before the Great Pyramid at sunset. The massive limestone blocks tower above you, built with mathematical precision that mirrors cosmic harmonies. You approach the entrance with reverence, knowing you're entering one of humanity's most sacred spaces.

Pass through the descending passage and begin climbing the Grand Gallery - a soaring corridor that rises toward the heart of the pyramid. Each step takes you deeper into ancient mysteries.

**The King's Chamber (3 minutes):**
You arrive at the King's Chamber, a precisely proportioned room at the pyramid's heart. In the center sits an empty stone sarcophagus - not a tomb, but an initiation chamber where pharaohs underwent spiritual death and rebirth.

Lie down in the sarcophagus (or visualize this if you're sitting). Feel the massive weight of stone above you, the silence and stillness of this sacred space. You're at the geometric center of the pyramid, aligned with cosmic forces.

**Initiation of Consciousness (4 minutes):**
As you lie in the sacred chamber, feel your ordinary consciousness beginning to expand:

- **First Expansion**: Your awareness grows beyond your physical body to fill the entire chamber
- **Second Expansion**: Your consciousness expands to encompass the entire pyramid, feeling its geometric perfection
- **Third Expansion**: You become aware of the pyramid's connection to the stars, particularly Orion (associated with Osiris)
- **Fourth Expansion**: Your consciousness merges with cosmic consciousness itself - you experience yourself as both individual and universal

In this expanded state, receive whatever insights or guidance the ancient Egyptian mysteries have for you.

**Return and Integration (1 minute):**
Slowly bring your consciousness back to your physical body, but retain the expanded awareness you've gained. Rise from the sarcophagus transformed, carrying the light of higher consciousness back into the world.

You are now an initiate of the pyramid mysteries, responsible for using this elevated consciousness to serve the highest good.`,
          mantra: 'In the pyramid of light, I ascend to divine sight. Ancient wisdom fills my soul, consciousness becomes whole.'
        }
      ],
      'indigenous': [
        {
          id: 'smudging',
          title: 'Sacred Smudging Ceremony',
          duration: 5,
          instructions: `Perform the traditional smudging ceremony to purify your space and being.

**Gathering Sacred Plants (1 minute):**
If you have sage, cedar, sweetgrass, or other sacred plants, light them now in a fireproof bowl. If not, you can use any natural incense or simply visualize the sacred smoke. The four traditional plants each have specific purposes:
- **White Sage**: Cleansing negative energy
- **Cedar**: Protection and grounding
- **Sweetgrass**: Calling in positive spirits
- **Tobacco**: Offering prayers to the Creator

**Purifying Yourself (2 minutes):**
Light your sacred plant and let it smolder, creating cleansing smoke. Using your hand or a feather, gently waft the smoke over your body:

- Start at your feet (grounding to Mother Earth)
- Move up your legs (strength for your journey)
- Across your torso (purifying your heart and emotions)
- Over your arms and hands (blessing your actions)
- Around your head (clearing your thoughts and opening your mind)

As you smudge, pray: "Great Spirit, cleanse me of all negative thoughts, emotions, and energies. Prepare me to walk in beauty and receive your guidance."

**Purifying Your Space (1 minute):**
Carry the smudge around your practice space, paying special attention to corners where stagnant energy can collect. Offer prayers of gratitude for this sacred space and ask for protection during your practice.

**Offering to the Four Directions (1 minute):**
Hold the smudge and turn to each direction, offering smoke and prayers:
- **East**: "To the East, place of new beginnings and the rising sun, I offer this smoke and ask for fresh insight."
- **South**: "To the South, place of growth and warmth, I offer this smoke and ask for healing."
- **West**: "To the West, place of wisdom and going within, I offer this smoke and ask for understanding."
- **North**: "To the North, place of the ancestors and ancient wisdom, I offer this smoke and ask for guidance."

End by offering smoke to Sky Father above and Earth Mother below, and to the sacred center within your heart.`,
          mantra: 'Great Spirit, purify this space, cleanse my heart and mind. Bless all beings with your grace, leave no darkness behind.'
        },
        {
          id: 'four-directions',
          title: 'Four Directions Prayer Ceremony',
          duration: 15,
          instructions: `Connect with the sacred power and wisdom of the four directions according to Indigenous tradition.

**Understanding the Directions (2 minutes):**
Each direction holds specific teachings and powers:
- **East (Yellow)**: New beginnings, sunrise, spring, childhood, eagle medicine, air element
- **South (Red)**: Growth, midday, summer, youth, mouse medicine, fire element  
- **West (Black)**: Introspection, sunset, autumn, adulthood, bear medicine, water element
- **North (White)**: Wisdom, midnight, winter, elderhood, buffalo medicine, earth element

**East - Place of New Beginnings (3 minutes):**
Face East and speak: "To the East, I offer my prayers. Spirit of the rising sun, bringer of new day, I ask for:
- Fresh perspective on my challenges
- Clarity of vision like the soaring eagle
- The courage to begin new chapters in my life
- Inspiration to see possibilities I've missed"

Breathe in the energy of new beginnings. What wants to be born in your life?

**South - Place of Growth and Trust (3 minutes):**
Face South and speak: "To the South, I offer my prayers. Spirit of midday sun, time of growth and abundance, I ask for:
- Trust in the process of my growth
- Patience with myself as I learn and change
- The innocence and wonder of the child within
- Healing for my heart and relationships"

Feel the warm energy of growth and trust. Where do you need to trust the process more?

**West - Place of Going Within (3 minutes):**
Face West and speak: "To the West, I offer my prayers. Spirit of the setting sun, time of looking within, I ask for:
- Courage to face my shadows with compassion
- Wisdom to learn from my experiences
- The strength of the bear to go within and emerge renewed
- Understanding of life's deeper mysteries"

Feel the contemplative energy of the West. What inner work is calling you?

**North - Place of Wisdom (3 minutes):**
Face North and speak: "To the North, I offer my prayers. Spirit of winter and the wise elders, I ask for:
- Ancient wisdom to guide my decisions
- The endurance of the buffalo to weather life's storms
- Connection to my ancestors and their teachings
- Gratitude for the lessons of all my experiences"

Feel the profound wisdom of the North. What wisdom are your experiences trying to teach you?

**Closing Integration (1 minute):**
Return to face East and speak: "Great Spirit, I thank all four directions for their teachings. Help me to walk in balance, carrying the gifts of each direction - the vision of the East, the trust of the South, the introspection of the West, and the wisdom of the North. May I live in harmony with all my relations."`,
          mantra: 'To the East, South, West, and North, I call your sacred powers forth. In the center of my heart, all directions have their part.'
        },
        {
          id: 'animal-spirit',
          title: 'Animal Spirit Guide Connection',
          duration: 10,
          instructions: `Connect with your animal spirit guide to receive their medicine and wisdom.

**Opening Sacred Space (2 minutes):**
Sit quietly and call upon the spirit world: "Animal spirits, teachers of the natural world, I call upon you with respect and humility. I seek to learn from your wisdom and receive the medicine I need for my journey. Come to me now in love and truth."

**Journey to Find Your Guide (4 minutes):**
Close your eyes and visualize yourself walking through a beautiful natural landscape - a forest, prairie, desert, or wherever you feel called. This is the realm where animal spirits dwell.

Walk slowly and with reverence, open to whatever animal appears. Your spirit guide might be:
- An animal you've always felt drawn to
- An animal that appears repeatedly in your life or dreams
- An animal that shows up unexpectedly now
- An animal whose qualities you need in your current situation

When an animal appears, approach slowly and respectfully. Ask: "Are you my spirit guide? Do you have medicine for me?" Trust your intuition about which animal is truly yours.

**Receiving Animal Medicine (3 minutes):**
Once you've connected with your animal guide, ask them:
- "What medicine do you bring me?"
- "What do I need to learn from you?"
- "How can I embody your qualities in my daily life?"

Listen with your whole being. Animal medicine often comes as:
- Understanding of qualities you need to develop (courage, patience, playfulness, etc.)
- Insight into how to handle current challenges
- Healing for emotional or spiritual wounds
- Guidance about your life path or purpose

**Gratitude and Commitment (1 minute):**
Thank your animal guide for sharing their medicine with you. Ask how you can honor them - perhaps by learning more about their species, supporting wildlife conservation, or embodying their positive qualities more fully.

Promise to call upon them when you need their particular medicine, and to treat all animals with greater respect and understanding.

Throughout your day, notice when animals appear in your life - in person, in media, or in conversation. Your spirit guide may be sending you reminders through these encounters.`,
          mantra: 'Animal spirits, teachers true, share your medicine, make me new. In your wisdom I find my way, guide my steps throughout this day.'
        },
        {
          id: 'gratitude-offering',
          title: 'Gratitude Offering to Mother Earth',
          duration: 5,
          instructions: `Complete your practice by offering gratitude and reciprocity to Mother Earth, the source of all life.

**Preparing Your Offering (1 minute):**
Traditional offerings include tobacco, cornmeal, sage, water, or small portions of food. If you don't have these, you can offer prayers, songs, or commit to earth-honoring actions. The sincerity of your heart matters more than the physical offering.

Hold your offering in your hands and infuse it with your gratitude and love.

**Speaking Your Gratitude (2 minutes):**
Address Mother Earth directly:

"Mother Earth, provider and sustainer of all life, I offer this gift in gratitude for all you give us:
- The air I breathe, freely given from your green plants
- The water I drink, circulating through your sacred cycles  
- The food that nourishes my body, grown in your fertile soil
- The materials that shelter and clothe me, gifts from your abundance
- The beauty that feeds my soul - your sunsets, storms, seasons, and creatures"

"I acknowledge that I am your child, made from your elements, sustained by your generosity. Everything I have comes from you."

**Making Sacred Commitment (1 minute):**
"Mother Earth, how can I give back to you who gives so much? I commit to:
- [Make specific commitments like: reducing waste, spending more time in nature, supporting environmental causes, teaching children to respect nature, etc.]
- Living more simply and taking only what I need
- Treating all your creatures as my relations
- Speaking for you when you need protection"

**Offering Ceremony (1 minute):**
If outdoors, place your physical offering on the earth with reverence. If indoors, you can place it in a plant pot or save it to offer outside later. As you make your offering, say:

"I give this gift to you, Mother Earth, as you have given so much to me. Accept my gratitude and help me to walk more gently upon your sacred body. Teach me to be a good ancestor for the seven generations to come."

Feel the sacred reciprocity - the giving and receiving that keeps all life in balance. You are part of the great web of existence, both receiver and giver of life's gifts.`,
          mantra: 'Mother Earth, provider true, I offer my deep love to you. Teach me how to give back in kind, leave only love and blessings behind.'
        }
      ],
      'hindu': [
        {
          id: 'preparation',
          title: 'Sacred Space and Intention Setting',
          duration: 5,
          instructions: `Prepare yourself for spiritual practice in the ancient Vedic tradition.

**Physical Preparation (2 minutes):**
Sit comfortably facing East (the direction of new beginnings and spiritual awakening) if possible. If you have a meditation cushion or mat, use it to create a sacred boundary for your practice. 

Light a small candle, oil lamp (diya), or incense to represent the divine light within and without. The flame symbolizes the eternal light of consciousness that illuminates all existence.

**Sacred Gesture and Intention (2 minutes):**
Place your palms together at your heart center in Anjali Mudra (prayer position). This gesture honors the divine spark within your heart and connects you to the universal consciousness.

Speak your intention: "I begin this practice to purify my mind, open my heart, and realize my true nature as consciousness itself. May this practice benefit not only myself but all beings everywhere. I dedicate these moments to the Divine in all its forms."

**Invocation for Guidance (1 minute):**
Chant or speak: "Om Gam Ganapataye Namaha" (I bow to Ganesha, remover of obstacles). This traditional invocation asks for the removal of any physical, mental, or spiritual obstacles that might interfere with your practice.

Feel yourself entering sacred time and space, leaving behind the ordinary concerns of daily life to commune with the eternal.`,
          mantra: 'Om Gam Ganapataye Namaha - I bow to the remover of obstacles, grant me clear passage on the spiritual path.'
        },
        {
          id: 'pranayama',
          title: 'Pranayama - Sacred Breath Control',
          duration: 15,
          instructions: `Practice Nadi Shodhana (alternate nostril breathing) to balance your subtle energy and prepare for meditation.

**Understanding Pranayama (2 minutes):**
Pranayama means "extension of life force." In Hindu philosophy, breath carries prana (vital energy) throughout your subtle body via energy channels called nadis. Alternate nostril breathing balances the solar (pingala) and lunar (ida) energy channels, creating harmony in body and mind.

**Hand Position - Vishnu Mudra (1 minute):**
Using your right hand, fold your index and middle fingers toward your palm. You'll use your thumb to close your right nostril and your ring finger to close your left nostril. Rest your hand gently on your face - don't press hard.

**The Practice - Cycles 1-5 (4 minutes):**
Begin with natural breathing for 30 seconds to center yourself.

**Round 1**: Close your right nostril with your thumb. Inhale slowly through your left nostril for 4 counts. Close your left nostril with your ring finger, release your thumb, and exhale through your right nostril for 4 counts.

**Round 2**: Inhale through the right nostril for 4 counts. Close the right nostril, release the left, and exhale through the left nostril for 4 counts.

This completes one full cycle. Continue for 5 complete cycles, maintaining smooth, even breathing.

**Advanced Practice - Cycles 6-10 (4 minutes):**
If comfortable, extend to 6 counts inhale, 2 counts retention (holding the breath), 6 counts exhale. This creates a 6-2-6 rhythm:
- Inhale left nostril (6 counts)
- Close both nostrils, retain breath (2 counts)  
- Exhale right nostril (6 counts)
- Inhale right nostril (6 counts)
- Close both nostrils, retain breath (2 counts)
- Exhale left nostril (6 counts)

**Integration and Completion (4 minutes):**
After 10 cycles, lower your hand and breathe naturally through both nostrils. Notice the sense of balance and clarity. Feel the subtle energy (prana) circulating harmoniously throughout your being.

Observe any changes in your mental state - often practitioners experience greater calm, focus, and inner stillness after this practice.`,
          mantra: 'Om So Hum - I am That (the universal consciousness). With each breath, I remember my true nature as infinite awareness.'
        },
        {
          id: 'mantra-meditation',
          title: 'Mantra Japa Meditation',
          duration: 15,
          instructions: `Practice the ancient technique of mantra repetition to purify the mind and connect with divine consciousness.

**Choosing Your Mantra (2 minutes):**
For this practice, we'll use "Om Namah Shivaya" (I bow to the divine consciousness within). This is one of the most powerful mantras in Hinduism, addressing Shiva as the consciousness that pervades all existence.

If you have mala beads (prayer beads), hold them in your right hand. If not, you can count on your fingers or simply focus on the repetition itself.

**Understanding the Mantra (2 minutes):**
- **Om**: The primordial sound, the vibration from which all creation emerges
- **Namah**: I bow, I honor, I surrender  
- **Shivaya**: To Shiva, the auspicious one, pure consciousness, the divine within

As you chant, you're not just repeating words - you're aligning your entire being with divine consciousness.

**Beginning the Practice (3 minutes):**
Start chanting aloud or silently, whichever feels more natural. If using mala beads, use your thumb to move each bead with each repetition, starting with the bead next to the guru bead (the larger central bead).

Begin slowly: "Om... Namah... Shivaya..." Feel each syllable vibrating in your body. Let the sound resonate in your heart center.

**Deepening the Practice (5 minutes):**
As you continue, let the mantra begin to chant itself. Notice how it wants to find its own rhythm. Sometimes it may speed up, sometimes slow down. Follow its natural flow.

Allow the mantra to penetrate deeper:
- Feel it vibrating in your heart
- Let it resonate in your entire body
- Allow it to fill your mind, leaving no room for other thoughts
- Experience how the sound creates a sacred space within you

**Silent Integration (3 minutes):**
In the final minutes, let the audible chanting fade into mental repetition, then into silence. Sit in the sacred silence that the mantra has created, resting in the pure awareness that is your true nature.

If you used mala beads, when you reach the guru bead, don't cross over it. Instead, reverse direction and begin again, showing respect for the tradition.

The mantra continues to work within you even after you stop actively repeating it, purifying your consciousness at subtle levels.`,
          mantra: 'Om Namah Shivaya - I bow to the divine consciousness within me, within all beings, within all existence.'
        },
        {
          id: 'gratitude',
          title: 'Gratitude and Universal Dedication',
          duration: 5,
          instructions: `Complete your practice by offering gratitude and dedicating the spiritual merit to all beings.

**Gratitude to the Divine (2 minutes):**
Place your hands at your heart in prayer position and offer heartfelt gratitude:

"Divine Consciousness, by whatever name you are called - Brahman, Atman, Krishna, Shiva, Devi - I offer my deepest gratitude:
- For the gift of this human birth and the opportunity to seek you
- For the ancient teachings that guide me toward truth
- For the breath of life that sustains me moment by moment
- For the consciousness that allows me to experience and understand
- For the love that connects me to all existence"

**Gratitude to Teachers and Tradition (1 minute):**
"I bow in gratitude to all the great teachers who preserved and transmitted these sacred practices:
- The ancient rishis (sages) who received divine revelation
- The unbroken lineage of gurus who kept the flame of wisdom alive
- All sincere practitioners who walk this path with devotion
- The sacred texts that preserve eternal truths for each generation"

**Universal Dedication (2 minutes):**
This is perhaps the most important part - offering the spiritual merit of your practice for the benefit of all:

"Whatever spiritual merit, purification, or positive energy has been generated through this practice, I offer it freely for the highest good of all beings:

May all beings everywhere be free from suffering and the causes of suffering.
May all beings find happiness and the causes of happiness.
May all beings live with ease and in harmony with the divine plan.
May all beings realize their true nature as pure consciousness and attain liberation.

Lokah Samastah Sukhino Bhavantu - May all the worlds and all beings be happy and free."

**Final Surrender (Brief moment):**
End by surrendering the fruits of your practice: "I offer all the results of this practice to the Divine. May thy will be done, not mine. Om Shanti Shanti Shanti - Peace in body, mind, and spirit."

Feel yourself as an instrument of divine love and wisdom, purified and ready to serve the highest good in all your daily activities.`,
          mantra: 'Lokah Samastah Sukhino Bhavantu - May all beings everywhere be happy and free. Om Shanti Shanti Shanti.'
        }
      ]
    };

    return practiceSteps[tradition.id as keyof typeof practiceSteps] || [
      {
        id: 'basic',
        title: 'Sacred Practice',
        duration: 20,
        instructions: 'Engage in contemplative practice according to this sacred tradition. Sit quietly, breathe deeply, and open your heart to the wisdom of the ages.',
        mantra: 'May wisdom and peace fill my heart.'
      }
    ];
  };

  const steps = getPracticeSteps();
  const currentStepData = steps[currentStep];

  React.useEffect(() => {
    if (currentStepData) {
      setTimeRemaining(currentStepData.duration * 60);
    }
  }, [currentStep, currentStepData]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            if (!completedSteps.includes(currentStep)) {
              setCompletedSteps(prev => [...prev, currentStep]);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, currentStep, completedSteps]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressValue = currentStepData ? ((currentStepData.duration * 60 - timeRemaining) / (currentStepData.duration * 60)) * 100 : 0;

  const startPause = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(currentStepData.duration * 60);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsActive(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsActive(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 border-purple-400 text-purple-200 hover:bg-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teachings
          </Button>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {tradition.name} Practice Session
            </h1>
            <p className="text-purple-200 text-lg">Sacred Practice Guidance</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Session Progress</h3>
              <Badge className="bg-purple-600">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
            <div className="flex gap-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded ${
                    completedSteps.includes(index) 
                      ? 'bg-green-500' 
                      : index === currentStep 
                        ? 'bg-purple-500' 
                        : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Step */}
        <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>{currentStepData.title}</span>
              {completedSteps.includes(currentStep) && (
                <Check className="w-6 h-6 text-green-400" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer */}
            <div className="text-center space-y-4">
              <div className="text-6xl font-mono font-bold text-white bg-gray-800 rounded-lg py-4 px-6 border border-gray-600">
                {formatTime(timeRemaining)}
              </div>
              <Progress value={progressValue} className="h-4 bg-gray-800 border border-gray-600" />
              <div className="text-white text-lg font-semibold">
                {Math.round(progressValue)}% Complete
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={startPause}
                className={`${isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-purple-900/20 rounded-lg p-6">
              <h4 className="text-white font-semibold mb-3">Practice Instructions:</h4>
              <div className="text-purple-100 leading-relaxed mb-4 whitespace-pre-line">
                {currentStepData.instructions}
              </div>
              {currentStepData.mantra && (
                <div className="bg-gray-800 rounded-lg p-4 border border-purple-400">
                  <h5 className="text-purple-200 font-semibold mb-2">Sacred Mantra:</h5>
                  <p className="text-purple-100 italic">
                    "{currentStepData.mantra}"
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-700 disabled:opacity-50"
              >
                Previous Step
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
