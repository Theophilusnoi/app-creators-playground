
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Heart, Lightbulb, Anchor, Users } from 'lucide-react';

interface SafetyProtocolsProps {
  onProtocolChange?: (protocols: Record<string, boolean>) => void;
  initialProtocols?: Record<string, boolean>;
  showEmergencyTools?: boolean;
  className?: string;
}

const SafetyProtocols: React.FC<SafetyProtocolsProps> = ({ 
  onProtocolChange,
  initialProtocols = {},
  showEmergencyTools = true,
  className = ""
}) => {
  const [protocols, setProtocols] = useState({
    whiteLight: true,
    spiritGuides: true,
    grounding: true,
    intention: true,
    ...initialProtocols
  });

  const [emergencyActive, setEmergencyActive] = useState(false);

  useEffect(() => {
    if (onProtocolChange) {
      onProtocolChange(protocols);
    }
  }, [protocols, onProtocolChange]);

  const protocolDefinitions = [
    {
      id: 'whiteLight',
      name: 'White Light Shield',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-blue-400',
      description: 'Visualize brilliant white light surrounding your entire being',
      instructions: [
        'Close your eyes and take three deep breaths',
        'Visualize a sphere of brilliant white light around you',
        'Feel the light as protective and loving energy',
        'Maintain this visualization throughout your session',
        'Reinforce the shield if you feel any negativity'
      ],
      benefits: [
        'Creates energetic protection barrier',
        'Repels negative entities or energies',
        'Increases confidence and peace',
        'Establishes sacred space for practice'
      ]
    },
    {
      id: 'spiritGuides',
      name: 'Spirit Guide Connection',
      icon: <Users className="w-5 h-5" />,
      color: 'text-purple-400',
      description: 'Call upon spiritual guides for protection and guidance',
      instructions: [
        'Set intention to connect with highest good guides',
        'Ask for protection during your journey',
        'Request guidance and wisdom',
        'Trust in their presence and support',
        'Thank them before and after sessions'
      ],
      benefits: [
        'Provides spiritual guidance and protection',
        'Offers wisdom from higher consciousness',
        'Reduces fear and anxiety',
        'Ensures positive spiritual experiences'
      ]
    },
    {
      id: 'grounding',
      name: 'Grounding Anchor',
      icon: <Anchor className="w-5 h-5" />,
      color: 'text-green-400',
      description: 'Maintain strong connection to physical body and Earth',
      instructions: [
        'Feel your physical body\'s weight and presence',
        'Visualize roots extending from you into the Earth',
        'Maintain awareness of your breathing',
        'Keep part of consciousness in physical realm',
        'Use grounding techniques if feeling unsteady'
      ],
      benefits: [
        'Ensures safe return to physical body',
        'Prevents getting lost in astral realms',
        'Maintains energetic stability',
        'Provides emergency return pathway'
      ]
    },
    {
      id: 'intention',
      name: 'Clear Intention',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'text-yellow-400',
      description: 'Set positive, clear intentions for your astral journey',
      instructions: [
        'Define specific purpose for your session',
        'Focus on learning, healing, or exploration',
        'Avoid negative or fear-based intentions',
        'Maintain loving, curious mindset',
        'Adjust intention if session changes direction'
      ],
      benefits: [
        'Attracts positive experiences',
        'Provides direction and purpose',
        'Prevents random or chaotic experiences',
        'Enhances spiritual growth and learning'
      ]
    }
  ];

  const emergencyTools = [
    {
      id: 'instantReturn',
      name: 'Instant Return',
      icon: <Heart className="w-4 h-4" />,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => handleEmergencyReturn(),
      description: 'Immediately return to physical body'
    },
    {
      id: 'calmCenter',
      name: 'Calm & Center',
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => handleCalmCenter(),
      description: 'Activate calming and centering protocol'
    },
    {
      id: 'callHelp',
      name: 'Call for Help',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => handleCallHelp(),
      description: 'Request spiritual assistance and guidance'
    }
  ];

  const toggleProtocol = (protocolId: string) => {
    setProtocols(prev => ({
      ...prev,
      [protocolId]: !prev[protocolId]
    }));
  };

  const handleEmergencyReturn = () => {
    setEmergencyActive(true);
    // Trigger emergency return sequence
    setTimeout(() => setEmergencyActive(false), 5000);
  };

  const handleCalmCenter = () => {
    // Activate calming protocol
    console.log('Activating calm and center protocol');
  };

  const handleCallHelp = () => {
    // Request spiritual assistance
    console.log('Calling for spiritual assistance');
  };

  const getProtocolStatus = () => {
    const activeCount = Object.values(protocols).filter(Boolean).length;
    const totalCount = Object.keys(protocols).length;
    
    if (activeCount === totalCount) return { status: 'optimal', color: 'text-green-400', message: 'All protocols active - Optimal safety' };
    if (activeCount >= totalCount * 0.75) return { status: 'good', color: 'text-yellow-400', message: 'Good safety coverage' };
    return { status: 'warning', color: 'text-red-400', message: 'Insufficient safety protocols' };
  };

  const safetyStatus = getProtocolStatus();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Safety Status Overview */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Safety Protocols
          </h3>
          <div className={`flex items-center gap-2 ${safetyStatus.color}`}>
            <div className="w-3 h-3 rounded-full bg-current"></div>
            <span className="text-sm font-medium">{safetyStatus.message}</span>
          </div>
        </div>
        
        <p className="text-purple-200 text-sm mb-4">
          Essential protection measures for safe astral travel. Activate all protocols before beginning your session.
        </p>
      </div>

      {/* Protocol Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {protocolDefinitions.map((protocol) => (
          <div
            key={protocol.id}
            className={`
              p-4 rounded-lg border transition-all cursor-pointer
              ${protocols[protocol.id] 
                ? 'bg-white/15 border-green-400/50' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
              }
            `}
            onClick={() => toggleProtocol(protocol.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`${protocol.color}`}>
                  {protocol.icon}
                </div>
                <h4 className="text-white font-medium">{protocol.name}</h4>
              </div>
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${protocols[protocol.id] 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-400'
                }
              `}>
                {protocols[protocol.id] && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
            </div>
            
            <p className="text-purple-200 text-sm mb-3">{protocol.description}</p>
            
            {protocols[protocol.id] && (
              <div className="space-y-2">
                <h5 className="text-white text-sm font-medium">Quick Instructions:</h5>
                <ul className="space-y-1">
                  {protocol.instructions.slice(0, 2).map((instruction, index) => (
                    <li key={index} className="text-purple-300 text-xs flex items-start gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Emergency Tools */}
      {showEmergencyTools && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Emergency Tools
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {emergencyTools.map((tool) => (
              <button
                key={tool.id}
                onClick={tool.action}
                className={`
                  ${tool.color} text-white px-4 py-3 rounded-lg 
                  flex items-center gap-2 transition-colors text-sm font-medium
                `}
                disabled={emergencyActive}
              >
                {tool.icon}
                {tool.name}
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <strong>Remember:</strong> The silver cord connecting you to your physical body cannot be broken. 
              You are always safe and can return instantly by focusing on your physical body.
            </p>
          </div>
        </div>
      )}

      {/* Safety Education */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Safety Reminders</h4>
        <div className="space-y-2 text-sm text-purple-200">
          <p>• Always maintain positive intentions and loving thoughts</p>
          <p>• Trust in your natural protection mechanisms</p>
          <p>• Practice in a safe, comfortable environment</p>
          <p>• Never attempt projection under the influence of substances</p>
          <p>• End sessions if you feel uncomfortable or unsafe</p>
          <p>• Ground yourself thoroughly after each session</p>
        </div>
      </div>

      {/* Emergency Active Indicator */}
      {emergencyActive && (
        <div className="fixed inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-red-600 text-white p-6 rounded-lg text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-bold mb-2">Emergency Protocol Active</h3>
            <p>Returning to physical body safely...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyProtocols;
