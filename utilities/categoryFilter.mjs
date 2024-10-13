import { projects } from "../data/projects.mjs";

// Query middleware to filter by category
export const filterByCategory = (req, res, next) => {
    // Extract category from query string (e.g., ?category=design)
    const category = req.query.category;

    if (category) {
        // Filter projects by category
        req.filteredProjects = projects.filter(proj => 
            proj.userId == req.params.userId && proj.category === category
        );
    } else {
        // No category filter, pass all projects for the user
        req.filteredProjects = projects.filter(proj => 
            proj.userId == req.params.userId
        );
    }

    // Proceed to the next middleware or route handler
    next();
};