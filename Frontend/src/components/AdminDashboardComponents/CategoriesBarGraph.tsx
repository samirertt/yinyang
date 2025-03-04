import { div } from "framer-motion/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip,Cell,PieChart,Pie,LineChart, Line, ResponsiveContainer } from "recharts";

function  CharactersBarGraph(props: {categories:Array<{title: string, bgColor: string, usage:number,characters:number}>, userCount:any})
{
    const colors = ["#ffa500","#dc143c","#4682b4","#301934","#b06239"];
    const categories = props.categories;
    const userCount = props.userCount;
    return (
        <div className="gap-5 p-10 grid grid-cols-2 bg-[#2F2F2F] rounded-xl w-[90%] "> 
        
            <div className="w-full h-100 p-5 bg-[#3e3e3e] rounded-xl">
                <h2 className="text-xl font-bold">User Growth</h2>
                <ResponsiveContainer >
                    <LineChart
                        data={userCount}
                        margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 20,
                        }}
                    >
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Line type="monotone" dataKey="count" stroke="#ffffff" strokeWidth={3}  />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="w-full h-80 p-5 bg-[#3e3e3e] rounded-xl">
                <h2 className="text-xl font-bold">Character Usage</h2>
                <ResponsiveContainer >
                    <PieChart margin={{ top: 10, right: 0, left: 0, bottom: 10 }} width={600} height={600}>
                        <Pie label data={categories} dataKey="usage" cx="50%" cy="50%" stroke="transparent" >
                            {props.categories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))} 
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="w-[90%] h-80 p-5 col-span-2 justify-self-center bg-[#3e3e3e] rounded-xl">
                <h2 className="text-xl font-bold">Number of Characters</h2>
                <ResponsiveContainer>
                    <BarChart data={categories} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <XAxis dataKey="title" />
                        <YAxis /> 
                        <Tooltip />
                        <Bar dataKey="characters" barSize={100} >
                            {props.categories.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}    
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default CharactersBarGraph;
