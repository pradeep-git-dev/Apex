const personalInfo = {
    name: "Pradeep Naru",
    institute: "Anil Neerukonda Institute of Technology and Sciences",
    tagline1: "A passionate coding enthusiast and AI enthusiast",
    tagline2: "I thrive on solving complex problems with elegant code and exploring the vast possibilities of Artificial Intelligence. I am eager to learn, contribute, and innovate.",
    status: "Open to work",
    linkedin: "https://www.linkedin.com/in/pradeep-naru-78967a320",
    github: "https://github.com/pradeep-git-dev",
    email: "narupradeep001@gmail.com",
    mobile: "6302072191",
    location: "Visakhapatnam, Andhra Pradesh, India",
    hobbies: ["reading novels", "coding", "playing cricket"]
};

const skills = [
    "Java", "Python", "C++", "JavaScript",
    "Machine Learning", "Deep Learning",
    "Computer Vision",
    "HTML", "CSS", "Web Development Basics",
    "Git", "GitHub",
    "Data Structures", "Object-Oriented Programming (OOP)",
    "Problem-Solving", "Critical Thinking", "Collaboration", "Communication", "Adaptability"
];

const projects = [
    {
        name: "Joke Generator",
        description: "Developed an application that generates jokes, showcasing skills in basic programming logic and potentially API integration or text manipulation.",
        link: "https://github.com/pradeep-git-dev/Apex/tree/task3"
    },
    {
        name: "To-Do List",
        description: "Created a functional to-do list application, demonstrating front-end development skills, data persistence (if implemented), and user interface design.",
        link: "https://github.com/pradeep-git-dev/Apex/tree/task2"
    },
    {
        name: "Quiz Platform",
        description: "Designed and built an interactive quiz platform, highlighting abilities in dynamic content generation, user input handling, and score tracking.",
        link: "https://github.com/pradeep-git-dev/Apex/tree/task3"
    }
];

function populateSkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.classList.add('skill-item');
            skillItem.textContent = skill;
            skillsContainer.appendChild(skillItem);
        });
    }
}

function populateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="project-link">View Project on GitHub</a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }
}

function populateContactInfo() {
    const contactInfoContainer = document.getElementById('contact-info-container');
    if (contactInfoContainer) {
        const contactData = [
            { label: 'Mobile', value: `+91 ${personalInfo.mobile}`, link: `tel:+91${personalInfo.mobile}`, class: 'mobile' },
            { label: 'Email', value: personalInfo.email, link: `mailto:${personalInfo.email}`, class: 'email' },
            { label: 'LinkedIn', value: personalInfo.linkedin.replace('https://', ''), link: personalInfo.linkedin, class: 'linkedin' },
            { label: 'GitHub', value: personalInfo.github.replace('https://', ''), link: personalInfo.github, class: 'github' },
            { label: 'Location', value: personalInfo.location, class: 'location' }
        ];

        contactData.forEach(item => {
            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-item', item.class);
            if (item.link) {
                contactItem.innerHTML = `<strong>${item.label}:</strong> <a href="${item.link}" target="_blank">${item.value}</a>`;
            } else {
                contactItem.innerHTML = `<strong>${item.label}:</strong> <span>${item.value}</span>`;
            }
            contactInfoContainer.appendChild(contactItem);
        });
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateSkills();
    populateProjects();
    populateContactInfo();
    setupSmoothScroll();
    setCurrentYear();
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
        if (section.id !== 'hero' && index % 2 !== 0) {
            section.classList.add('alt-bg');
        }
    });
});
