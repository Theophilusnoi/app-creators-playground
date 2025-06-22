
export const useZodiacAdjustments = () => {
  const getZodiacAdjustments = (zodiacProfile: any) => {
    if (!zodiacProfile) return null;
    
    const adjustments: any = {
      fire: '🔥 Visualize golden light entering through your breath',
      earth: '🌱 Add grounding crystal (hematite) to your setup',
      air: '💨 Focus on silver winds clearing mental fog',
      water: '🌊 Use selenite for psychic purification'
    };

    return adjustments[zodiacProfile.elements?.primary];
  };

  return { getZodiacAdjustments };
};
