// Load and populate projects from JSON
let allProjects = [];
let currentProjects = [];
let displayedCount = 0;
const projectsPerLoad = 6;

async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        allProjects = data.projects;
        currentProjects = [...allProjects];  // Initialize with all projects
        
        const projectGrid = document.getElementById('project-grid');
        if (!projectGrid) return;
        
        projectGrid.innerHTML = '';
        
        // Create project category filter buttons
        createProjectFilters(data.projects);
        
        // Initial load: display first batch
        displayedCount = 0;
        displayProjectBatch(currentProjects);
        
        // Setup infinite scroll
        setupInfiniteScroll();
        
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function createProjectFilters(projects) {
    const filterContainer = document.getElementById('project-filters');
    if (!filterContainer) return;
    
    filterContainer.innerHTML = '';
    
    // Get unique categories
    const categories = ['all', ...new Set(projects.map(p => p.category))];
    
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        if (category === 'all') {
            btn.classList.add('active');
            btn.textContent = 'All Projects';
        } else {
            btn.textContent = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        
        btn.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('#project-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter and display projects
            displayedCount = 0;
            if (category === 'all') {
                currentProjects = [...allProjects];
            } else {
                currentProjects = allProjects.filter(p => p.category === category);
            }
            displayProjectBatch(currentProjects);
        });
        
        filterContainer.appendChild(btn);
    });
}
}

function displayProjectBatch(projects) {
    const projectGrid = document.getElementById('project-grid');
    
    // Clear grid if this is the first batch for a filter
    if (displayedCount === 0) {
        projectGrid.innerHTML = '';
    }
    
    const batch = projects.slice(displayedCount, displayedCount + projectsPerLoad);
    
    batch.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        let cardHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="this.style.backgroundColor='#d3d3d3'; this.style.objectFit='cover';">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
        `;
        
        if (project.hasDetailPage && project.link) {
            cardHTML += `<a href="${project.link}" class="text-link">View Project →</a>`;
        } else {
            cardHTML += `<a href="javascript:void(0)" class="text-link">View Details →</a>`;
        }
        
        cardHTML += `</div>`;
        card.innerHTML = cardHTML;
        projectGrid.appendChild(card);
        
        // Animate in
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
    });
    
    displayedCount += batch.length;
}

function setupInfiniteScroll() {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Load more projects when we reach the end
                if (displayedCount < currentProjects.length) {
                    displayProjectBatch(currentProjects);
                }
            }
        });
    });
    
    observer.observe(projectGrid);
}

// Expand project (placeholder for inline projects)
function expandProject(event, projectId) {
    event.preventDefault();
    console.log('Project expanded:', projectId);
    // Implement inline expansion logic here if needed
}

// Load and populate resume preview
async function loadResumePreview() {
    try {
        const response = await fetch('data/resume.json');
        const data = await response.json();
        
        const resumePreview = document.getElementById('resume-preview');
        if (!resumePreview) return;
        
        resumePreview.innerHTML = '';
        
        // Show first 2 experience items as preview
        data.experience.slice(0, 2).forEach(exp => {
            const item = document.createElement('div');
            item.className = 'resume-item';
            
            item.innerHTML = `
                <h3>${exp.company}</h3>
                <h4>${exp.title} | ${exp.startDate} – ${exp.endDate}</h4>
                <ul>
                    ${exp.responsibilities.slice(0, 2).map(r => `<li>${r}</li>`).join('')}
                </ul>
            `;
            
            resumePreview.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading resume preview:', error);
    }
}

// PDF Export functionality
function setupPDFExport() {
    const downloadButtons = document.querySelectorAll('.download-resume');
    
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            generatePDF();
        });
    });
}

function generatePDF() {
    const printResume = document.getElementById('print-resume');
    
    if (!printResume) {
        // Fallback to print dialog
        window.print();
        return;
    }
    
    // Use html2pdf library or fallback to print
    const element = printResume;
    const opt = {
        margin: 10,
        filename: 'James_Ingram_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
    };
    
    // If html2pdf is available, use it
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save();
    } else {
        // Fallback to print
        window.print();
    }
}

// Fade in elements on scroll
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    
    // Load projects and resume preview
    loadProjects();
    loadResumePreview();
    
    // Setup PDF export
    setupPDFExport();
});