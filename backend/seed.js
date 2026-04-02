import mongoose from "mongoose";
import dotenv from "dotenv";
import SiteContent from "./models/SiteContent.js";
import Event from "./models/Event.js";
import Activity from "./models/Activity.js";
import TeamMember from "./models/TeamMember.js";
import Contributor from "./models/Contributor.js";
import GD from "./models/GD.js";
import Admin from "./models/Admin.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB for seeding"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // Clear existing data
        await Promise.all([
            SiteContent.deleteMany({}),
            Event.deleteMany({}),
            Activity.deleteMany({}),
            TeamMember.deleteMany({}),
            Contributor.deleteMany({}),
            GD.deleteMany({}),
            Admin.deleteMany({})
        ]);

        console.log("Cleared existing data.");

        // === Admin ===
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
        await Admin.create({ username: adminUsername, password: adminPassword });
        console.log("Seeded Admin.");

        // === SiteContent ===
        const siteContents = [
            { key: "hero_title", value: "AI CLUB", category: "Hero" },
            { key: "hero_subtitle", value: "Innovate. Build. Deploy.", category: "Hero" },
            { key: "hero_description", value: "Join a community of passionate innovators, developers, and AI enthusiasts. We explore cutting-edge technologies, brainstorm about current AI trends and shape the future together.", category: "Hero" },
            { key: "about_title", value: "Empowering the Next Generation of AI Innovators", category: "About" },
            { key: "about_p1", value: "AI Club is a student-driven community for anyone curious about artificial intelligence and how it actually works in the real world. Instead of just focusing on theory, we regularly conduct group discussions where members explore current AI trends, share ideas, and break down complex topics in a simple way.", category: "About" },
            { key: "about_p2", value: "We also organize practical events, workshops, and hands-on sessions to help members understand tools and technologies step by step. What makes our club different is that it provides a space for students who are interested in research whether it's exploring new ideas, working on problem statements, or understanding how real-world AI systems are built.", category: "About" },
            { key: "about_p3", value: "The club is open to learners at all levels. If you're someone who likes asking questions, discussing new tech, or experimenting with ideas, this is a place where you can actively learn, contribute, and grow with others who share the same interest.", category: "About" }

        ];
        await SiteContent.insertMany(siteContents);
        console.log("Seeded SiteContent.");

        // === Activities ===
        const activities = [
            {
                title: "Group Discussions",
                category: "Discussions",
                description: "Weekly brainstorming sessions where ideas collide and innovation sparks. Share knowledge, debate concepts, and explore new frontiers in AI together.",
                iconType: "Users",
                status: "Active"
            },
            {
                title: "Hackathons",
                category: "Events",
                description: "Intense coding marathons that push boundaries. Build, break, and create amazing AI projects under pressure with your team.",
                iconType: "Trophy",
                status: "Active"
            },
            {
                title: "Workshops",
                category: "Learning",
                description: "Hands-on learning experiences led by industry experts. From basics to advanced techniques, master the tools of the trade.",
                iconType: "BookOpen",
                status: "Active"
            }
        ];
        await Activity.insertMany(activities);
        console.log("Seeded Activities.");

        // === Events ===
        const events = [
            {
                title: "Aarunya Stall 2026: Bot and Roll",
                type: "Stall",
                date: "February 2026",
                description: "An AI-themed stall featuring 6 interactive games designed to make learning fun and engaging. Students participated in quick challenges, explored simple AI concepts, and won exciting prizes instantly, making it one of the most lively attractions of the fest.",
                image: "/Photos/Event1.jpeg"
            },
            { 
                title: "AIQ Battle 2.0",
                type: "Competition",
                date: "February 2026",
                description: "A 3-round competitive event inspired by a Shark Tank-style format, where participants presented ideas, solved AI-based challenges, and competed for top positions. The event combined creativity, innovation, and problem-solving with exciting rewards.",
                image: "/Photos/Event2.jpeg"
            },
            {
                title: "Orientation Session",
                type: "Session",
                date: "February 2026",
                description: "A welcoming session for new members where they got introduced to the club, interacted with the team, and participated in fun activities. It also included basic AI discussions to understand their interests and encourage participation.",
                image: "/Photos/Event3.png"
            },
            {
                title: "AIQ Battle",
                type: "Competition",
                date: "February 2026",
                description: "A multi-round event focused on AI-related tasks and idea sharing. Participants collaborated, solved challenges, and explored different approaches to real-world problems in an interactive setting.",
                image: "/Photos/Event4.png"
            },
            {
                title: "AI Exhibition – Aarunya 2025",
                type: "Exhibition",
                date: "February 2026",
                description: "A competitive exhibition where students showcased their AI models and projects. It provided a platform to demonstrate practical skills, with the best project being awarded exciting prizes.",
                image: "/Photos/Event5.png"
            }
        ];
        await Event.insertMany(events);
        console.log("Seeded Events.");

        // === Team Members ===
        const teamMembers = [
            { name: "Vanshika Varun", role: "President", hierarchyLevel: "president", image: "./Photos/Vanshika.jpg" },
            { name: "Unnati Jadon", role: "Vice President", hierarchyLevel: "vicepresident", image: "./Photos/unnati.jpeg" },
            { name: "Manya Suranglikar", role: "Vice President", hierarchyLevel: "vicepresident", image: "./Photos/Manya.JPG" },
            { name: "Anirudh Parmar", role: "Co-ordinator", hierarchyLevel: "operations", image: "./Photos/Anirudh Parmar.jpg" },
            { name: "Aastha Pyasi", role: "Jr. Co-ordinator", hierarchyLevel: "junior", image: "./Photos/aastha.jpg" },
            { name: "Samarth Agrawal", role: "Jr. Co-ordinator", hierarchyLevel: "junior", image: "./Photos/Samarth.png" },
            { name: "Shashwat Verma", role: "Technical Head", hierarchyLevel: "lead", image: "./Photos/Shashwat verma.JPG" },
            { name: "Devansh Mishra", role: "PR & Marketing Head", hierarchyLevel: "lead", image: "./Photos/devansh mishra.jpeg" },
            { name: "Akash Rathore", role: "Treasurer", hierarchyLevel: "lead", image: "./Photos/Akash Rathore.jpg" },
            { name: "Kushagra Malviya", role: "Logistics Head", hierarchyLevel: "lead", image: "./Photos/Kushagra Malviya.jpg" },
            { name: "Chanpreet Singh Chitrath", role: "Digital Creators Head", hierarchyLevel: "lead", image: "./Photos/Chanpreet.jpeg" },
            { name: "Suyash Khare", role: "Research and Development Head", hierarchyLevel: "lead", image: "./Photos/Suyash.jpg" },
            { name: "Akriti Kushwaha", role: "Logistics Co-Lead", hierarchyLevel: "colead", image: "./Photos/Akriti.jpeg" },
            { name: "Dr. Rakesh Singh Jadon", role: "Faculty Coordinator", hierarchyLevel: "faculty", subRole: "Dean, Students Administration", image: "./Photos/Faculty.png" }
        ];
        await TeamMember.insertMany(teamMembers);
        console.log("Seeded Team Members.");

        // === Contributors ===
        const contributors = [
            { name: "Naitik Jain", avatar: "./Photos/naitik_air.PNG", contributions: 47, projects: ["Course Hero", "Write"], github: "https://github.com/Naitikk-J", linkedin: "https://www.linkedin.com/in/naitik-jain-9290b8324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"},
            { name: "Naitik Jain", avatar: "./Photos/naitik_jain_ec.jpeg", contributions: 32, projects: ["Course Hero", "Write"], github: "https://github.com/jnaitik", linkedin: "https://www.linkedin.com/in/naitik-jain-522095328" },
            { name: "Arman", avatar: "./Photos/arman.jpeg", contributions: 28, projects: ["Devlopers"], github: "https://github.com/armansinghh", linkedin: "https://www.linkedin.com/in/armansingh24"},
            { name: "Kartik", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face", contributions: 28, projects: ["Developers"], github: "#", linkedin: "#"},
            { name: "Harshita", avatar: "./Photos/harshita.jpeg", contributions: 28, projects: ["Developers"], github: "https://github.com/Harshita-043", linkedin: "https://www.linkedin.com/in/harshita-gupta-1a7124326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
            { name: "Ojas", avatar: "./Photos/Ojas.jpeg", contributions: 56, projects: ["Developers"], github: "https://github.com/ojaswii333", linkedin: "https://www.linkedin.com/in/ojaswi-anand-sharma-7080b434a?utm_source=share_via&utm_content=profile&utm_medium=member_android"}
        ];
        await Contributor.insertMany(contributors);
        console.log("Seeded Contributors.");

        // === GDs ===
        const gds = [
            {
                title: "AI in Legal Decision-Making",
                description: "From arguments in favor of efficiency and consistency to concerns around bias, ethics, and accountability, the discussion sparked diverse perspectives. Members explored how AI could revolutionize legal research and case prediction, while raising critical questions about transparency and judicial discretion. The debate highlighted the tension between technological progress and fundamental legal principles. Some advocated for AI as a tool to reduce backlog and assist judges, while others warned of algorithmic bias perpetuating systemic inequalities. The consensus emerged that AI should augment rather than replace human judgment, with proper safeguards and oversight mechanisms. The group agreed that balance is key - leveraging AI's capabilities while maintaining human-centric justice.",
                image: "/Photos/GD3-JAN26.jpeg",
                date: "2026-01-15",
                topic: "AI in Legal Decision-Making"
            },
            {
                title: "AI's Loop: Is It Running the Internet?",
                description: "From the rise of low-quality AI-generated content to its profound impact on creativity and information trust, members shared thorough perspectives and debated real challenges shaping today's online world. The discussion examined how AI algorithms now curate our news feeds, recommend content, and even generate articles and art. Concerns about filter bubbles, misinformation, and the devaluation of human creativity were balanced against AI's ability to personalize experiences and democratize content creation. Members explored the paradox of AI both enabling and potentially undermining authentic human expression. The conversation concluded that while AI is indeed running significant portions of the internet, human oversight and ethical guidelines remain essential to maintain digital integrity and foster genuine innovation.",
                image: "/Photos/GD2-NOV.png",
                date: "2025-11-20",
                topic: "AI's Loop: Is It Running the Internet?"
            },
            {
                title: "The Future of Jobs: Will AI Create More Jobs Than It Replaces?",
                description: "From exploring automation and new-age careers to debating the balance between human creativity and machine efficiency, the discussion was full of fresh insights and diverse viewpoints. Members analyzed historical technological shifts and their impact on employment, drawing parallels to the AI revolution. Optimists highlighted emerging roles in AI ethics, prompt engineering, and human-AI collaboration. Skeptics pointed to potential job displacement in creative fields and white-collar professions. The group explored how education systems must adapt to prepare future generations for an AI-augmented workforce. The consensus acknowledged that while AI will transform many roles, uniquely human skills like emotional intelligence, creative problem-solving, and ethical reasoning will become even more valuable.",
                image: "/Photos/GD1-SEP25.jpeg",
                date: "2025-09-10",
                topic: "The Future of Jobs"
            }
        ];
        await GD.insertMany(gds);
        console.log("Seeded GDs.");

        console.log("Seeding completed successfully.");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
