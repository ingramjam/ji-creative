# JI Creative Design - Professional Portfolio

A self-contained, responsive professional portfolio showcasing design work, web development projects, and creative services. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Dynamic Project Loading** - Projects loaded from JSON data structure
- **Interactive Resume** - Skill-based filtering and PDF export (8.5" x 11" single-page format)
- **Project Detail Pages** - Comprehensive project showcases with imagery and descriptions
- **No External Dependencies** - All projects self-contained (no Wix linkouts)
- **Image Fallback Handling** - Graceful degradation if images unavailable

## Project Structure

```
.
├── index.html                 # Homepage with featured projects
├── pages/
│   ├── resume.html           # Interactive resume with filtering
│   ├── project-*.html        # Individual project detail pages (17 total)
├── data/
│   ├── resume.json           # Resume data (skills, experience, education)
│   ├── projects.json         # Project catalog with metadata
├── styles/
│   ├── main.css              # Base styles and typography
│   ├── resume.css            # Resume page layout and interactivity
│   ├── project-detail.css    # Project page styling
│   ├── print.css             # Print-optimized resume styles
├── scripts/
│   ├── script.js.js          # Main script (project loading, PDF setup)
│   └── resume-page.js        # Resume page interactivity and filtering
└── README.md
```

## Technologies Used

- **Frontend:** HTML5, CSS3 (Grid, Flexbox), JavaScript ES6+
- **Data:** JSON
- **Styling:** Responsive CSS with print optimization
- **PDF Export:** html2pdf.js library (CDN)
- **Fonts:** Google Fonts - Inter typeface
- **Image Hosting:** Wix CDN (static.wixstatic.com)

## Key Pages

### Homepage (index.html)
- Hero section with personal introduction
- Featured projects grid with dynamic loading
- Experience preview section
- Contact call-to-action
- Navigation to resume and projects

### Resume Page (pages/resume.html)
- Interactive skill-based filtering
- Work experience timeline
- Core competencies grid
- Education section
- Related projects filtered by skill
- Single-page PDF export (8.5" x 11")

### Project Detail Pages (pages/project-*.html)
- 17 comprehensive project showcases
- Hero section with title and tagline
- Project imagery with error fallback
- Challenge/Solution/Impact overview
- Detailed content and methodology
- Related projects sidebar
- Tech stack badges

## Development

### Local Development
Open `index.html` in a browser or use a local HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

### JSON Data Structure

**Projects** (data/projects.json):
```json
{
  "id": "project-id",
  "title": "Project Title",
  "category": "design|development|branding|etc",
  "description": "Short description",
  "image": "https://...",
  "year": "2023",
  "relatedSkills": ["Skill1", "Skill2"],
  "hasDetailPage": true,
  "link": "/pages/project-id.html"
}
```

**Resume** (data/resume.json):
- Skills organized by category
- Work experience with descriptions
- Education history
- Contact information

## Deployment

The portfolio is deployment-ready for:
- **GitHub Pages** - Free static hosting
- **Netlify** - Automated deployments from git
- **Vercel** - Next.js-style deployments
- **Traditional hosting** - Works on any HTTP/HTTPS server

### Deploy to GitHub Pages
1. Create repository on GitHub
2. Push code to main branch
3. Enable GitHub Pages in repository settings
4. Site deploys automatically on git push

## Features in Detail

### Skill-Based Resume Filtering
- Click skill buttons to filter experience and related projects
- Active state indication with visual feedback
- All skills view shows complete resume

### PDF Export
- One-click resume download
- Optimized for 8.5" x 11" printing
- Clean print styling with proper page breaks
- Filename: `JI-Creative-Resume.pdf`

### Image Fallback
- Grey background (#d3d3d3) if image fails to load
- Maintains layout integrity
- Seamless user experience

### Responsive Breakpoints
- **Mobile:** < 768px - Single column, hidden skill panel
- **Tablet:** 768px - 1024px - Adjusted spacing
- **Desktop:** > 1024px - Full multi-column layouts

## Performance Considerations

- Lightweight JSON data loading (no database)
- CSS Grid and Flexbox for efficient layouts
- Intersection Observer API for scroll animations
- Optimized image URLs with query parameters
- Minimal JavaScript dependencies

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact

**James Ingram III**
- Email: [james@jicreative.design](mailto:james@jicreative.design)
- LinkedIn: [ingramjam](https://linkedin.com/in/ingramjam)
- Instagram: [@trashimake](https://instagram.com/trashimake)

## License

© 2024 JI Creative Design. All rights reserved.
