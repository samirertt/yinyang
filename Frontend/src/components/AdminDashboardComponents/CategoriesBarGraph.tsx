import { div } from "framer-motion/client";
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

function CharactersBarGraph(props: {
  categories: Array<{
    title: string;
    bgColor: string;
    usage: number;
    characters: number;
  }>;
  userCount: any;
}) {
  const colors = ["#ffa500", "#dc143c", "#4682b4", "#301934", "#b06239"];
  const categories = props.categories;
  const userCount = props.userCount;
  
  return (
    <div className="w-full max-w-6xl mx-auto gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 bg-[#2F2F2F] rounded-xl">
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
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ffffff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-[90%] sm:h-[90%] md:h-[90%] p-4 sm:p-5 bg-[#3e3e3e] rounded-xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">Character Usage</h2>
        <ResponsiveContainer>
          <PieChart
            margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
          >
            <Pie
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={true}
              data={categories}
              dataKey="usage"
              cx="50%"
              cy="50%"
              stroke="transparent"
              paddingAngle={2}
            >
              {props.categories.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full max-w-4xl h-[90%] sm:h-[350px] md:h-[90%] p-4 sm:p-5 md:col-span-2 justify-self-center bg-[#3e3e3e] rounded-xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">Number of Characters</h2>
        <ResponsiveContainer>
          <BarChart
            data={categories}
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
              {props.categories.map((entry, index) => (
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
  );
}

export default CharactersBarGraph;