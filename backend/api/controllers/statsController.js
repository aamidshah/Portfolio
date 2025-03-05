const express = require("express");
const Project = require("../models/Project"); // Adjust path if needed
const router = express.Router();

// Get project details grouped by month
const getStats = async (req, res) => {
    try {
        const projects = await Project.find({}, "name startDate status contributors complexity");

        const monthlyStats = {};

        projects.forEach((project) => {
            const date = new Date(project.startDate);
            const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;

            if (!monthlyStats[monthYear]) {
                monthlyStats[monthYear] = { projects: 0, details: [] };
            }

            monthlyStats[monthYear].projects++;
            monthlyStats[monthYear].details.push({
                name: project.name,
                status: project.status,
                contributors: project.contributors.length,
                complexity: project.complexity || "N/A",
            });
        });

        const formattedData = Object.keys(monthlyStats).map((month) => ({
            time: month,
            projects: monthlyStats[month].projects,
            details: monthlyStats[month].details,
        }));

        res.json(formattedData);
    } catch (error) {
        console.error("Error fetching project progress:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getStats };

