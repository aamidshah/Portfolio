// import React from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import useGlobalStateStore from "../../../store/useProjectStore";
// import dayjs from "dayjs";
// import _ from "lodash";

// const ContributionTrendArea = () => {
//   const { projects } = useGlobalStateStore();

//   // Generate contribution data
//   const generateContributionData = () => {
//     const contributionsMap = projects.reduce((acc, project) => {
//       if (!project.startDate || !project.endDate || !project.technologyUsage) return acc;

//       const start = dayjs(project.startDate);
//       const end = dayjs(project.endDate);
//       let current = start;

//       while (current.isBefore(end) || current.isSame(end, "month")) {
//         const monthYear = current.format("MMM YYYY");

//         if (!acc[monthYear]) acc[monthYear] = {};

//         Object.entries(project.technologyUsage).forEach(([tech, usage]) => {
//           acc[monthYear][tech] = (acc[monthYear][tech] || 0) + usage;
//         });

//         current = current.add(1, "month");
//       }

//       return acc;
//     }, {});

//     return Object.entries(contributionsMap).map(([month, contributions]) => ({
//       month,
//       ...contributions,
//     }));
//   };

//   const data = generateContributionData();
//   const allTechnologies = _.uniq(
//     projects.flatMap((p) => (p.technologyUsage ? Object.keys(p.technologyUsage) : []))
//   );

//   const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF3", "#FFC133"];

//   return (
//     <div className="p-6 xl:px-40 pt-20 shadow-md rounded-lg">
//       <h2 className="text-xl flex items-center justify-center font-bold mb-4">📉 Contribution Trend (Area Chart)</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" angle={-25} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           {allTechnologies.map((tech, index) => (
//             <Area
//               key={tech}
//               type="monotone"
//               dataKey={tech}
//               stroke={colors[index % colors.length]}
//               fill={colors[index % colors.length]}
//               stackId="1"
//             />
//           ))}
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ContributionTrendArea;
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useGlobalStateStore from "../../../store/useProjectStore";
import dayjs from "dayjs";
import _ from "lodash";

const ContributionTrend = () => {
  const { projects } = useGlobalStateStore();

  // Function to generate contribution data by technology per month
  const generateContributionData = () => {
    const sortedProjects = [...projects].sort((a, b) => 
      dayjs(a.startDate).year() - dayjs(b.startDate).year()
    );
  
    const contributionsMap = sortedProjects.reduce((acc, project) => {
      if (!project.startDate || !project.endDate || !project.technologyUsage || typeof project.technologyUsage !== "object") {
        return acc;
      }

      const start = dayjs(project.startDate);
      const end = dayjs(project.endDate);
      let current = start;

      while (current.isBefore(end) || current.isSame(end, "month")) {
        const monthYear = current.format("MMM YYYY"); // Example: "Jan 2025"

        if (!acc[monthYear]) acc[monthYear] = {};

        Object.entries(project.technologyUsage).forEach(([tech, usage]) => {
          acc[monthYear][tech] = (acc[monthYear][tech] || 0) + usage;
        });

        current = current.add(1, "month");
      }

      return acc;
    }, {});

    return Object.entries(contributionsMap).map(([month, contributions]) => ({
      month,
      ...contributions,
    }));
  };

  const data = generateContributionData();
  const allTechnologies = _.uniq(
    projects.flatMap((p) =>
      p.technologyUsage && typeof p.technologyUsage === "object" ? Object.keys(p.technologyUsage) : []
    )
  );

  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF3", "#FFC133"];

  return (
    <div className="p-6 xl:px-40 pt-20 ">
      <h2 className="text-xl flex items-center justify-center font-bold mb-4">📈 Contribution Trend by Technology</h2>
      <p className="text-center text-gray-600 mb-6">
    This chart displays the contribution trends across different technologies over time, helping visualize which technologies have been used the most in various projects.
  </p>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            angle={-25}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Legend
        
          />
          {allTechnologies.map((tech, index) => (
            <Line
              key={tech}
              type="monotone"
              dataKey={tech}
              stroke={colors[index % colors.length]} // Cycles through predefined colors
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContributionTrend;

