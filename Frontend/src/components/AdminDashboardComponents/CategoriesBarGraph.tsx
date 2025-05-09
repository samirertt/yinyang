import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

function CharactersBarGraph() {
  const [characterUsage, setCharacterUsage] = useState<{ [key: string]: number }>({});
  const [characterPersonality, setCharacterPersonality] = useState<{ [key: string]: number }>({});
  const [userCount, setUserCount] = useState<Array<{ year: number, count: number }>>([]);
  const colors = ["#ffa500", "#dc143c", "#4682b4", "#301934", "#b06239"];

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    // Check if token exists; optionally redirect if not authenticated
    if (!token) {
      console.error("No token found, authentication required");
      return; // You could redirect here if using React Router
    }

    // Common headers with Authorization token
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    // Fetch character usage data
    fetch('http://localhost:8080/admin/characters/usage',{
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(data => setCharacterUsage(data));

    // Fetch character personality data
    fetch('http://localhost:8080/admin/characters/personality',{
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(data => setCharacterPersonality(data));

    // Fetch user count by year
    fetch('http://localhost:8080/admin/users/yearly',{
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(data => {
        // Data is already in the correct format from backend
        setUserCount(data);
      });
  }, []);

  // Format data for pie chart (character usage)
  const usageData = Object.entries(characterUsage)
  .filter(([_, usage]) => usage > 0) // <- this filters out 0-usage entries
  .map(([name, usage]) => ({
    name,
    usage,
    characters: 1
  }));


  // Format data for bar chart (personality count)
  // Flatten personality counts if multiple personalities are comma-separated
const personalityCountMap: { [key: string]: number } = {};

Object.entries(characterPersonality).forEach(([title, count]) => {
  const personalities = title.split(',').map(p => p.trim());
  personalities.forEach(personality => {
    if (personalityCountMap[personality]) {
      personalityCountMap[personality] += count;
    } else {
      personalityCountMap[personality] = count;
    }
  });
});

const personalityData = Object.entries(personalityCountMap).map(([title, count]) => ({
  title,
  characters: count,
  usage: 0
}));


  return (
    <div className="w-full max-w-6xl mx-auto gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 bg-[#2F2F2F] rounded-xl">
      {/* User Growth Chart */}
      <div className="w-full h-[90%] sm:h-[350px] md:h-[90%] p-4 sm:p-5 bg-[#3e3e3e] rounded-xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">User Growth</h2>
        <ResponsiveContainer>
          <LineChart
            data={userCount}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 20,
            }}
          >
            <XAxis 
              dataKey="year" 
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={true}
            />
            <YAxis 
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={true}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2F2F2F',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff'
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ffffff"
              strokeWidth={3}
              dot={{ fill: '#ffffff', stroke: '#ffffff', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Character Usage Chart */}
      <div className="w-full h-[90%] sm:h-[90%] md:h-[90%] p-4 sm:p-5 bg-[#3e3e3e] rounded-xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">Character Usage</h2>
        <ResponsiveContainer>
          <PieChart margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
            <Pie
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={true}
              data={usageData}
              dataKey="usage"
              cx="50%"
              cy="50%"
              stroke="transparent"
              paddingAngle={2}
            >
              {usageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                color: '#000000',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Character Personality Chart */}
      <div className="w-full max-w-6xl h-[90%] sm:h-[350px] md:h-[90%] p-4 sm:p-5 md:col-span-2 justify-self-center bg-[#3e3e3e] rounded-xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">Characters by Personality</h2>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <div style={{ minWidth: Math.max(700, personalityData.length * 100) }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={personalityData}
                margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
              >
                <XAxis 
                  dataKey="title" 
                  stroke="#ffffff"
                  fontSize={12}
                  tickLine={false}
                  axisLine={true}
                />
                <YAxis 
                  stroke="#ffffff"
                  fontSize={12}
                  tickLine={false}
                  axisLine={true}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2F2F2F', 
                    border: 'none',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Bar dataKey="characters" barSize={60}>
                  {personalityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharactersBarGraph;