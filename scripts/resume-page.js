// Resume Page Functionality
let resumeData = null;
let projectsData = null;
let currentFilter = null;

// Initialize resume page
document.addEventListener('DOMContentLoaded', async () => {
    await loadResumeData();
    await loadProjectsData();
    
    if (resumeData) {
        renderFilterButtons();
        renderExperience();
        renderSkills();
        renderEducation();
        renderProjects();
        setupPDFExport();
    }
});

// Load resume data from JSON
async function loadResumeData() {
    try {
        const response = await fetch('../data/resume.json');
        resumeData = await response.json();
        return resumeData;
    } catch (error) {
        console.error('Error loading resume data:', error);
        return null;
    }
}

// Load projects data from JSON
async function loadProjectsData() {
    try {
        const response = await fetch('../data/projects.json');
        const data = await response.json();
        projectsData = data;
        return data;
    } catch (error) {
        console.error('Error loading projects:', error);
        return null;
    }
}

// Render filter buttons
function renderFilterButtons() {
    const container = document.getElementById('skill-filters');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Add "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'All Skills';
    allBtn.addEventListener('click', () => filterBySkill(null, allBtn));
    container.appendChild(allBtn);
    
    // Add skill category buttons
    Object.keys(resumeData.skills).forEach(skill => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = skill;
        btn.addEventListener('click', () => filterBySkill(skill, btn));
        container.appendChild(btn);
    });
}

// Filter by skill
function filterBySkill(skill, buttonElement) {
    currentFilter = skill;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    buttonElement.classList.add('active');
    
    // Re-render experience
    renderExperience(skill);
    renderProjects(skill);
}

// Render experience section
function renderExperience(filterSkill = null) {
    const container = document.getElementById('experience-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    resumeData.experience.forEach(exp => {
        // Filter by skill if specified
        if (filterSkill && !exp.skills.includes(filterSkill)) {
            return;
        }
        
        const item = document.createElement('div');
        item.className = 'experience-item';
        
        let responsibilitiesHTML = exp.responsibilities
            .map(r => `<li>${r}</li>`)
            .join('');
        
        item.innerHTML = `
            <h3>${exp.company}</h3>
            <div class="job-title">${exp.title}</div>
            <div class="job-dates">${exp.location} | ${exp.startDate} – ${exp.endDate}</div>
            <ul>${responsibilitiesHTML}</ul>
        `;
        
        container.appendChild(item);
    });
}

// Render skills section
function renderSkills() {
    const container = document.getElementById('skills-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        let skillsHTML = skills
            .map(skill => `<li>${skill}</li>`)
            .join('');
        
        categoryDiv.innerHTML = `
            <h3>${category}</h3>
            <ul>${skillsHTML}</ul>
        `;
        
        container.appendChild(categoryDiv);
    });
}

// Render education section
function renderEducation() {
    const container = document.getElementById('education-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    resumeData.education.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'education-item';
        
        item.innerHTML = `
            <h3>${edu.school}</h3>
            <div class="degree">${edu.degree} in ${edu.field}</div>
        `;
        
        container.appendChild(item);
    });
}

// Render projects
function renderProjects(filterSkill = null) {
    const container = document.getElementById('related-projects');
    if (!container || !projectsData) return;
    
    container.innerHTML = '';
    
    projectsData.projects.forEach(project => {
        // Filter by skill if specified
        if (filterSkill && !project.relatedSkills.includes(filterSkill)) {
            return;
        }
        
        const card = document.createElement('div');
        card.className = 'project-card';
        
        let link = project.hasDetailPage ? project.link : '../index.html#work';
        
        card.innerHTML = `
            <div class="project-category">${project.category}</div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${link}">View Project →</a>
        `;
        
        container.appendChild(card);
    });
}

// PDF Export functionality
function setupPDFExport() {
    const printBtn = document.getElementById('print-btn');
    if (!printBtn) return;
    
    printBtn.addEventListener('click', generatePDF);
    
    // Also setup download link
    const downloadBtn = document.querySelector('.download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            generatePDF();
        });
    }
}

function generatePDF() {
    // Populate print resume data
    populatePrintResume();
    
    // Use html2pdf library if available, otherwise print
    const element = document.getElementById('print-resume');
    
    if (typeof html2pdf !== 'undefined') {
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5], // inches
            filename: 'James_Ingram_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    } else {
        // Fallback: use print dialog
        window.print();
    }
}

function populatePrintResume() {
    // Populate skills
    const printSkills = document.getElementById('print-skills');
    if (printSkills && resumeData) {
        printSkills.innerHTML = '';
        Object.entries(resumeData.skills).forEach(([category, skills]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'print-skills-category';
            
            const skillsList = skills.map(s => `<li>${s}</li>`).join('');
            categoryDiv.innerHTML = `
                <h3>${category}</h3>
                <ul class="print-skills-list">${skillsList}</ul>
            `;
            printSkills.appendChild(categoryDiv);
        });
    }
    
    // Populate experience
    const printExperience = document.getElementById('print-experience');
    if (printExperience && resumeData) {
        printExperience.innerHTML = '';
        resumeData.experience.forEach(exp => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'print-experience-item';
            
            const respList = exp.responsibilities.map(r => `<li>${r}</li>`).join('');
            itemDiv.innerHTML = `
                <h3>${exp.company}</h3>
                <div class="company-role">${exp.title}</div>
                <div class="job-dates">${exp.location} | ${exp.startDate} – ${exp.endDate}</div>
                <ul>${respList}</ul>
            `;
            printExperience.appendChild(itemDiv);
        });
    }
    
    // Populate education
    const printEducation = document.getElementById('print-education');
    if (printEducation && resumeData) {
        printEducation.innerHTML = '';
        resumeData.education.forEach(edu => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'print-education-item';
            itemDiv.innerHTML = `
                <h3>${edu.school}</h3>
                <p><strong>${edu.degree}</strong> in ${edu.field}</p>
            `;
            printEducation.appendChild(itemDiv);
        });
    }
}
