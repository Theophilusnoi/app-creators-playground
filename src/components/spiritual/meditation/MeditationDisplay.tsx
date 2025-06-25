
import React from 'react';
import { CheckCircle2 } from "lucide-react";
import { VoicePlayer } from '../VoicePlayer';

interface MeditationDisplayProps {
  phase: 'preparation' | 'active' | 'completion';
  timeRemaining: number;
  aiGuidanceText: string;
}

export const MeditationDisplay: React.FC<MeditationDisplayProps> = ({
  phase,
  timeRemaining,
  aiGuidanceText
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate extended guided meditation script based on meditation type
  const generateExtendedGuidance = (originalGuidance: string) => {
    // Extract meditation type from the original guidance or default to mindfulness
    const isBreathing = originalGuidance.toLowerCase().includes('breath');
    const isLovingKindness = originalGuidance.toLowerCase().includes('loving') || originalGuidance.toLowerCase().includes('compassion');
    const isBodyScan = originalGuidance.toLowerCase().includes('body') || originalGuidance.toLowerCase().includes('scan');
    
    if (isBreathing) {
      return `Welcome to this sacred breathing meditation. Take a moment to settle into your chosen position, whether sitting or lying down.

Close your eyes gently, like curtains drawing closed at the end of the day. Allow your face to soften, releasing any tension from your forehead, around your eyes, your jaw.

Begin by taking three deep, cleansing breaths. Breathe in slowly through your nose... hold for a moment... and exhale completely through your mouth, releasing any stress or tension from your day.

Now, allow your breathing to return to its natural rhythm. Don't try to control it, simply observe each breath as it flows in and out of your body like gentle waves.

Notice the sensation of air entering your nostrils, cool and fresh. Feel it traveling down into your lungs, expanding your chest and belly. Then observe the warm air as it leaves your body, carrying away any worries or concerns.

If your mind begins to wander - and it will, this is perfectly natural - simply notice where it has gone without judgment. Gently, like guiding a small child, bring your attention back to your breath.

Imagine each inhale bringing in peace, calm, and clarity. With each exhale, release tension, anxiety, and anything that no longer serves you.

Continue breathing naturally, finding your own perfect rhythm. Some breaths may be deeper, others more shallow. There is no right or wrong way - simply be present with whatever arises.

As we continue, notice how your body naturally relaxes with each breath. Your shoulders may drop, your jaw may soften, your entire being settling into this moment of peace.

Stay with your breath, this constant companion that is always available to anchor you in the present moment. Each breath is a gift, each moment an opportunity to return to your center.

Continue this practice, allowing yourself to rest in the simplicity of breathing, the foundation of all life and consciousness.`;
    } else if (isLovingKindness) {
      return `Welcome to this loving-kindness meditation, a practice of opening your heart to yourself and all beings.

Find a comfortable position and close your eyes softly. Take three deep breaths, settling into this sacred space you've created for yourself.

Begin by placing your hands on your heart, feeling its steady rhythm, the center of your compassion and love.

Start by offering loving-kindness to yourself. Silently repeat these words, feeling their meaning in your heart:
"May I be happy and peaceful.
May I be healthy and strong.
May I be safe and protected.
May I live with ease and joy."

Feel these wishes for yourself deeply. You deserve all the love and kindness you're offering. If resistance arises, that's natural - simply continue with gentle persistence.

Now, bring to mind someone you love dearly - a family member, friend, or even a beloved pet. Picture them clearly and extend these same wishes:
"May you be happy and peaceful.
May you be healthy and strong.
May you be safe and protected.
May you live with ease and joy."

Send this love from your heart to theirs, imagining it as warm, golden light flowing between you.

Next, think of someone neutral - perhaps a neighbor, store clerk, or someone you see regularly but don't know well. Extend the same loving wishes to them:
"May you be happy and peaceful.
May you be healthy and strong.
May you be safe and protected.
May you live with ease and joy."

Now comes the challenging part - bring to mind someone with whom you have difficulty. Don't choose the most difficult person, but someone with whom you have minor conflicts. Breathe deeply and offer these same wishes:
"May you be happy and peaceful.
May you be healthy and strong.
May you be safe and protected.
May you live with ease and joy."

Remember, their happiness does not diminish yours. Love is infinite and grows when shared.

Finally, expand your circle to include all beings everywhere - people, animals, all life forms. Send loving-kindness to the entire world:
"May all beings be happy and peaceful.
May all beings be healthy and strong.
May all beings be safe and protected.
May all beings live with ease and joy."

Rest in this boundless love, this connection to all life. Feel yourself as part of the vast web of existence, all beings interconnected in love and compassion.

Take these final moments to simply bask in the loving energy you've cultivated, allowing it to fill every cell of your being.`;
    } else if (isBodyScan) {
      return `Welcome to this body scan meditation, a journey of awareness through your physical being.

Lie down comfortably or sit with your back straight. Close your eyes and take three deep, grounding breaths.

We'll begin at the top of your head. Bring your attention to your scalp, noticing any sensations - warmth, coolness, tingling, or perhaps nothing at all. Simply observe without trying to change anything.

Move your awareness to your forehead. Notice if there's any tension here, any tightness. Breathe into this area and let it soften.

Shift to your eyes, closed and relaxed. Notice the area around your eyes, your cheekbones, your temples. Allow any tension to melt away with each exhale.

Bring attention to your jaw - an area where we often hold stress. Let your jaw drop slightly, tongue relaxed behind your teeth. Feel the muscles of your face completely softening.

Move down to your neck and throat. This bridge between head and body often carries tension. Breathe space into your neck, allowing it to lengthen and relax.

Focus on your shoulders. Notice if they're raised toward your ears. Let them drop with your next exhale, releasing the weight of your day.

Scan your arms, starting with your upper arms, noticing the muscles, then your elbows, forearms, wrists, hands, and each finger. Each part of your arms growing heavy and relaxed.

Bring awareness to your chest. Feel it rising and falling with each breath. Notice your heartbeat, this constant rhythm of life within you.

Move to your upper back, imagining breath flowing to any tight spots, dissolving tension with warm, healing light.

Focus on your abdomen, the soft rise and fall with each breath. This center of your body, housing your vital organs, working continuously to sustain you.

Scan your lower back, often an area of holding and tension. Breathe compassion into this part of your body that supports you daily.

Move to your hips and pelvis, the foundation of your torso. Let this area soften and release into the support beneath you.

Focus on your thighs, noticing their weight, their strength. These powerful muscles that carry you through your day.

Scan your knees, these complex joints that allow you movement and flexibility. Send gratitude to your knees for their service.

Move to your calves and shins, feeling their connection to the earth beneath you.

Finally, your feet and toes. These parts of your body that literally ground you, connecting you to the earth with each step.

Now, take a moment to feel your entire body as one unified whole. Notice the sense of completeness, of integration, of being fully present in your physical form.

Rest in this awareness, this intimate connection with your body, your faithful companion in this life.`;
    } else {
      // Default mindfulness meditation
      return `Welcome to this mindfulness meditation. Find your way into a comfortable position, creating a sacred space for this practice.

Close your eyes gently and take three conscious breaths, each one bringing you more fully into this present moment.

Mindfulness is simply the practice of paying attention to what is happening right now, without judgment, without trying to change anything - just pure, open awareness.

Begin by noticing your body where it makes contact with the surface beneath you. Feel the weight of your body being supported, held by the earth.

Now bring attention to the sounds around you. You might hear traffic, birds, the hum of electronics, or perhaps silence itself. Simply listen without labeling or judging - just receiving whatever sounds arise and pass away.

Notice any physical sensations in your body. Perhaps warmth or coolness, comfort or discomfort, areas of relaxation or tension. Observe these sensations like a curious scientist, with gentle interest.

Bring awareness to your breath, not controlling it but simply observing. Notice where you feel the breath most clearly - perhaps at your nostrils, your chest, or your belly.

Watch each breath like watching clouds pass through the sky. Some breaths are deeper, others more shallow. Each one is perfect as it is.

When thoughts arise - and they will, this is natural - simply notice them like leaves floating down a stream. You don't need to follow them or push them away. Just observe and gently return to your breath.

Notice how thoughts come and go on their own. You are not your thoughts - you are the awareness that observes them. Rest in this spacious awareness.

If emotions arise, greet them with the same gentle curiosity. Emotions are like weather systems - they arise, exist for a time, and naturally pass away.

Continue resting in this open awareness, this quality of mindfulness that is your natural state. You're not trying to achieve anything or get anywhere - simply being present with what is.

Notice how this moment is always changing, always fresh. The breath you're taking now has never existed before and will never exist again. Each moment is unique and precious.

As we continue, simply rest in being. Not being anything particular, just the pure awareness that you are. This is your essential nature - always peaceful, always whole, always present.

Let yourself settle deeper into this awareness, this fundamental peace that is always available to you, no matter what is happening in your life.

Continue to rest here, in the simplicity of being present, awake, and aware. This is the gift of mindfulness - the recognition of your own natural peace and wisdom.`;
    }
  };

  if (phase === 'completion') {
    return (
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Meditation Complete</h3>
        <p className="text-green-200">
          Your mind has been stilled and your spirit renewed.
        </p>
      </div>
    );
  }

  if (phase === 'active') {
    const extendedGuidance = aiGuidanceText ? generateExtendedGuidance(aiGuidanceText) : generateExtendedGuidance('mindfulness meditation');
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">
            {formatTime(timeRemaining)}
          </div>
          <p className="text-green-200">Focus on your breath...</p>
        </div>

        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg p-6 text-center mb-6">
          <div className="text-sm text-purple-200 mb-2">Guided by Seraphina</div>
          <div className="text-purple-100 leading-relaxed text-sm whitespace-pre-line mb-4 max-h-64 overflow-y-auto">
            {extendedGuidance}
          </div>
          <VoicePlayer 
            script={extendedGuidance} 
            tone="nurturing_gentle"
          />
        </div>
      </div>
    );
  }

  return null;
};
