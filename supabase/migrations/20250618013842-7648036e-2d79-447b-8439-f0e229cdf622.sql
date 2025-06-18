
-- Fix the get_emergency_metrics function to resolve GROUP BY errors
CREATE OR REPLACE FUNCTION get_emergency_metrics()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'responseTimes', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'timestamp', triggered_at,
          'value', response_time_seconds
        )
      ), '[]'::json)
      FROM (
        SELECT triggered_at, response_time_seconds
        FROM spiritual_emergencies
        WHERE response_time_seconds IS NOT NULL
        ORDER BY triggered_at DESC
        LIMIT 100
      ) rt
    ),
    'traditionDistribution', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'tradition', tradition,
          'count', count
        )
      ), '[]'::json)
      FROM (
        SELECT tradition, COUNT(*) as count
        FROM spiritual_emergencies
        WHERE tradition IS NOT NULL
        GROUP BY tradition
      ) t
    ),
    'resolutionRates', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'crisis_level', crisis_level,
          'rate', resolution_rate
        )
      ), '[]'::json)
      FROM (
        SELECT 
          crisis_level,
          ROUND(100.0 * SUM(CASE WHEN resolved THEN 1 ELSE 0 END) / COUNT(*)) as resolution_rate
        FROM spiritual_emergencies
        WHERE crisis_level IS NOT NULL
        GROUP BY crisis_level
      ) r
    ),
    'totalEmergencies', (
      SELECT COUNT(*) FROM spiritual_emergencies
    ),
    'averageResponseTime', (
      SELECT COALESCE(ROUND(AVG(response_time_seconds)), 0) 
      FROM spiritual_emergencies 
      WHERE response_time_seconds IS NOT NULL
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
