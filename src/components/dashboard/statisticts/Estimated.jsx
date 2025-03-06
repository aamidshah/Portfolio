import { useEffect, useState } from "react";
import useGlobalStateStore from "../../../store/useProjectStore";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line } from "recharts";

const EstimatedTime = () => {
  const projects = useGlobalStateStore((state) => state.projects); // Fetch projects from store
  const [stats, setStats] = useState({
    avgCompletionTime: 0,
    categoryAverages: [],
    estimatedVsActual: [],
    efficiencyScores: [],
  });

  useEffect(() => {
    if (projects.length) {
      setStats({
        avgCompletionTime: calculateAverageCompletionTime(projects),
        categoryAverages: calculateCategoryWiseAverage(projects),
        estimatedVsActual: compareEstimatedVsActual(projects),
        efficiencyScores: calculateEfficiency(projects),
      });
    }
  }, [projects]);

  return (
    <div className="p-6 !bg-white xl:px-[150px]">
      <div className="flex flex-col  items-center ">
      <h2 className="text-xl font-bold mb-4">📊 Project Statistics</h2>
      <p className="mb-3 text-md">Average Completion Time: <strong>{stats.avgCompletionTime} days</strong></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-18">
      <div>
  <h3 className="text-lg font-medium mt-4">📌 Category-wise Average Completion Time</h3>
  <p className="text-sm text-gray-500 mt-2">
    This table provides the average completion time for projects categorized by type. 
    It helps in identifying which categories typically take longer to complete and where optimizations can be made.
  </p>

  <div className="mt-9 overflow-x-auto">
    <table className="w-full border-collapse">
      {/* Table Head */}
      <thead>
        <tr className=" text-gray-700 text-sm">
          <th className="p-2 text-left">Category</th>
          <th className="p-2 text-left">Avg Completion Time </th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        {stats.categoryAverages.map(({ category, averageTime }) => (
          <tr key={category} className=" text-sm">
            <td className="p-2">{category}</td>
            <td className="p-2 font-medium text-blue-600">{averageTime}(days)</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        <div>
        <div>
  <h3 className="text-lg font-medium mt-4">📌 Estimated vs Actual Completion</h3>
  <p className="text-sm text-gray-500 mt-2">
    This table compares the estimated time versus the actual time taken to complete each project. 
    The difference column highlights whether the project exceeded or met its expected timeline, 
    helping to analyze efficiency and predict future project durations more accurately.
  </p>
  <div className="mt-4 overflow-x-auto">
    <table className="w-full border-collapse">
      {/* Table Head */}
      <thead>
        <tr className=" text-gray-700 text-sm">
          <th className="p-2 text-left">Project</th>
          <th className="p-2 text-left">Estimated  </th>
          <th className="p-2 text-left">Actual </th>
          <th className="p-2 text-left">Difference</th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        {stats.estimatedVsActual.map(({ name, estimatedTime, actualTime, difference }) => (
          <tr key={name} className=" text-bold text-sm">
            <td className="p-2">{name}</td>
            <td className="p-2">{estimatedTime}</td>
            <td className="p-2">{actualTime}</td>
            <td className={`p-2 font-medium ${difference > 0 ?  "text-red-500"  : "text-green-500"}`}>
              {difference} <span className="text-blue-500  font-bold">(days)</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        </div>


        <div>
  <h3 className="text-lg font-medium mt-4">📌 Efficiency Score</h3>
  <p className="text-sm text-gray-500 mt-2">
    This table measures how efficiently projects were completed compared to their estimated time. 
    A higher percentage indicates better time management.
  </p>

  <div className="mt-4 pt-8 overflow-x-auto">
    <table className="w-full border-collapse">
      {/* Table Head */}
      <thead>
        <tr className=" text-gray-700  text-sm">
          <th className="p-2 text-left">Project Name</th>
          <th className="p-2 text-left">Efficiency (%)</th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        {stats.efficiencyScores.map(({ name, efficiency }) => (
          <tr key={name} className=" text-sm">
            <td className="p-2">{name}</td>
            <td className={`p-2 font-medium ${efficiency >= 100 ? 'text-green-600' : 'text-red-600'}`}>
              {efficiency}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


<div>
  <h3 className="text-lg font-medium mt-4">📌 Time Trend Graph</h3>
  <p className="text-sm text-gray-600 mt-2">
    This graph visualizes the estimated vs. actual completion time for projects over time. 
    It helps in identifying trends, potential delays, and areas where project timelines can be improved.
  </p>
  <div className="pt-8 ">
    <TimeTrendGraph projects={projects} />
  </div>
</div>
      </div>
    </div>
  );
};

// **Helper Functions**
const calculateAverageCompletionTime = (projects) => {
  if (!projects.length) return 0;
  const totalTime = projects.reduce((sum, project) => sum + parseEstimatedTime(project.estimatedTime), 0);
  return Math.round((totalTime / projects.length).toFixed(2));
};

const calculateCategoryWiseAverage = (projects) => {
  const categoryTimes = {};
  projects.forEach(({ category, estimatedTime }) => {
    const estimatedDays = parseEstimatedTime(estimatedTime);
    if (!categoryTimes[category]) categoryTimes[category] = { total: 0, count: 0 };
    categoryTimes[category].total += estimatedDays;
    categoryTimes[category].count += 1;
  });

  return Object.keys(categoryTimes).map((category) => ({
    category,
    averageTime: Math.round((categoryTimes[category].total / categoryTimes[category].count).toFixed(2)),
  }));
};

const parseEstimatedTime = (estimatedTime) => {
  if (!estimatedTime) return 0;
  const match = estimatedTime.match(/(\d+)\s*(day|week|month|year)s?/i);
  if (!match) return 0;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  const unitToDays = {
    day: 1,
    week: 7,
    month: 30,
    year: 365
  };

  return value * (unitToDays[unit] || 0);
};
const calculateActualCompletionTime = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  return Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)); // Convert ms to days
};

  const compareEstimatedVsActual = (projects) => {
    return projects.map(({ name, estimatedTime, startDate, endDate }) => {
      const estimatedDays = parseEstimatedTime(estimatedTime); // Convert estimated time to days
      const actualDays = calculateActualCompletionTime(startDate, endDate); // Calculate actual completion time
  
      return {
        name,
        estimatedTime: estimatedDays,
        actualTime: actualDays,
        difference: Math.round((actualDays - estimatedDays).toFixed(2)), // Difference calculation
      };
    });
  };
  

  const calculateEfficiency = (projects) => {
    return projects.map(({ name, estimatedTime, startDate, endDate }) => {
      const estimatedDays = parseEstimatedTime(estimatedTime); // Convert estimated time to days
      const actualDays = calculateActualCompletionTime(startDate, endDate); // Calculate actual completion time
  
      return {
        name,
        efficiency: actualDays > 0 ? Math.round((estimatedDays / actualDays) * 100) : "N/A", // Prevent division by zero
      };
    });
  };
  
  

// **Time Trend Graph Component**
const TimeTrendGraph = ({ projects }) => {
  const data = projects.map((project) => ({
    name: project.name,
    estimatedTime: parseEstimatedTime(project.estimatedTime), // Convert estimated time to days
    actualTime: project.startDate && project.endDate 
      ? calculateActualCompletionTime(project.startDate, project.endDate) 
      : 0, // Ensure actualTime is calculated properly
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line type="monotone" dataKey="estimatedTime" stroke="#8884d8" />
      <Line type="monotone" dataKey="actualTime" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
  );
};

export default EstimatedTime;
