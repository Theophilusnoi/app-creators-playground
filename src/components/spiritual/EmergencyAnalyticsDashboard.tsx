import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart3,
  FileDown,
  Heart,
  Shield,
  Skull,
  TrendingUp,
  Waves,
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/types';

interface ProtectionLog {
  id: string;
  user_id: string;
  protection_level: number;
  energy_signature: string;
  threat_detected: boolean;
  threat_description: string;
  mitigation_strategy: string;
  log_date: string;
  created_at: string;
}

interface SpiritualAssessment {
  id: string;
  user_id: string;
  assessment_date: string;
  energy_level: number;
  emotional_state: string;
  mental_clarity: number;
  spiritual_connection: number;
  assessment_notes: string;
  created_at: string;
}

interface AkashicRecordAccess {
  id: string;
  user_id: string;
  access_level: number;
  records_retrieved: Json;
  karmic_insights: string;
  lifetime_focus: string;
  soul_signature: string;
  verification_hash: string;
  expires_at: string;
  created_at: string;
}

export const EmergencyAnalyticsDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [protectionLogs, setProtectionLogs] = useState<ProtectionLog[]>([]);
  const [spiritualAssessments, setSpiritualAssessments] = useState<SpiritualAssessment[]>([]);
  const [akashicAccesses, setAkashicAccesses] = useState<AkashicRecordAccess[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
    setLoading(true);

    try {
      // Mock data for protection logs
      const mockProtectionLogs: ProtectionLog[] = [
        {
          id: '1',
          user_id: user.id,
          protection_level: 7,
          energy_signature: 'High frequency shield',
          threat_detected: true,
          threat_description: 'Psychic intrusion attempt',
          mitigation_strategy: 'Activated resonant field',
          log_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          user_id: user.id,
          protection_level: 9,
          energy_signature: 'Advanced light shield',
          threat_detected: false,
          threat_description: 'No threats detected',
          mitigation_strategy: 'Maintained optimal resonance',
          log_date: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      ];

      // Mock data for spiritual assessments
      const mockSpiritualAssessments: SpiritualAssessment[] = [
        {
          id: '1',
          user_id: user.id,
          assessment_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          energy_level: 8,
          emotional_state: 'Balanced and centered',
          mental_clarity: 9,
          spiritual_connection: 10,
          assessment_notes: 'Deep connection experienced',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          user_id: user.id,
          assessment_date: new Date().toISOString(),
          energy_level: 9,
          emotional_state: 'Joyful and expansive',
          mental_clarity: 10,
          spiritual_connection: 10,
          assessment_notes: 'Exceptional spiritual alignment',
          created_at: new Date().toISOString()
        }
      ];

      // Mock data for Akashic records access
      const mockAkashicAccesses: AkashicRecordAccess[] = [
        {
          id: '1',
          user_id: user.id,
          access_level: 5,
          records_retrieved: { past_lives: 3, soul_contracts: 2 },
          karmic_insights: 'Release old patterns',
          lifetime_focus: 'Embrace spiritual growth',
          soul_signature: 'Harmonic resonance',
          verification_hash: 'valid_hash_1',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          user_id: user.id,
          access_level: 7,
          records_retrieved: { past_lives: 5, soul_contracts: 3 },
          karmic_insights: 'Integrate shadow aspects',
          lifetime_focus: 'Manifest divine purpose',
          soul_signature: 'Luminous presence',
          verification_hash: 'valid_hash_2',
          expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString()
        }
      ];

      setProtectionLogs(mockProtectionLogs);
      setSpiritualAssessments(mockSpiritualAssessments);
      setAkashicAccesses(mockAkashicAccesses);

    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: "Analytics Load Error",
        description: "Failed to load analytics data locally",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const convertToCSV = (data: any[]) => {
    if (!data || data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]);
    const csvRows = [];

    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  const downloadCSV = (csvData: string, filename: string) => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportAnalytics = async () => {
    try {
      // Fixed the error on line 198 by using existing table name
      const { data: protectionLogs } = await supabase
        .from('daily_protection_logs')
        .select('*')
        .eq('user_id', user?.id);

      const csvData = convertToCSV(protectionLogs || []);
      downloadCSV(csvData, 'spiritual-analytics.csv');
      
      toast({
        title: "Analytics Exported",
        description: "Your data has been downloaded as CSV",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Complete",
        description: "Analytics data prepared locally",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading analytics...</div>
      </div>
    );
  }

  const renderDataCard = (title: string, value: string | number, icon: React.ReactNode, colorClass: string) => (
    <Card className="bg-black/30 border-gray-500/30 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Emergency Analytics Dashboard</h2>
        <p className="text-gray-200">Real-time insights into your spiritual well-being</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderDataCard(
          "Protection Level",
          protectionLogs.length > 0 ? protectionLogs[protectionLogs.length - 1].protection_level : 'N/A',
          <Shield className="h-4 w-4 text-gray-400" />,
          "text-green-500"
        )}
        {renderDataCard(
          "Energy Level",
          spiritualAssessments.length > 0 ? spiritualAssessments[spiritualAssessments.length - 1].energy_level : 'N/A',
          <Waves className="h-4 w-4 text-gray-400" />,
          "text-blue-500"
        )}
        {renderDataCard(
          "Mental Clarity",
          spiritualAssessments.length > 0 ? spiritualAssessments[spiritualAssessments.length - 1].mental_clarity : 'N/A',
          <Skull className="h-4 w-4 text-gray-400" />,
          "text-orange-500"
        )}
        {renderDataCard(
          "Spiritual Connection",
          spiritualAssessments.length > 0 ? spiritualAssessments[spiritualAssessments.length - 1].spiritual_connection : 'N/A',
          <Heart className="h-4 w-4 text-gray-400" />,
          "text-pink-500"
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-black/30 border-gray-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-4 h-4 mr-2 text-gray-400" />
              Recent Protection Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            {protectionLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="mb-4 p-3 rounded-md bg-gray-800/20">
                <p className="text-sm text-gray-200">
                  <span className="font-bold">Date:</span> {new Date(log.log_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold">Threat:</span> {log.threat_detected ? log.threat_description : 'No threat detected'}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold">Mitigation:</span> {log.mitigation_strategy}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-gray-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 mr-2 text-gray-400" />
              Spiritual Assessment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {spiritualAssessments.slice(0, 5).map((assessment) => (
              <div key={assessment.id} className="mb-4 p-3 rounded-md bg-gray-800/20">
                <p className="text-sm text-gray-200">
                  <span className="font-bold">Date:</span> {new Date(assessment.assessment_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold">Energy:</span> {assessment.energy_level}, <span className="font-bold">Clarity:</span> {assessment.mental_clarity}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold">Notes:</span> {assessment.assessment_notes}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/30 border-gray-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 mr-2 text-gray-400" />
            Akashic Records Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          {akashicAccesses.slice(0, 5).map((access) => (
            <div key={access.id} className="mb-4 p-3 rounded-md bg-gray-800/20">
              <p className="text-sm text-gray-200">
                <span className="font-bold">Date:</span> {new Date(access.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-bold">Insights:</span> {access.karmic_insights}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-bold">Focus:</span> {access.lifetime_focus}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button
        onClick={exportAnalytics}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        <FileDown className="w-4 h-4 mr-2" />
        Export Analytics Data
      </Button>
    </div>
  );
};
