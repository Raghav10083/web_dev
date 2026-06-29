# Wise Language Academy - Premium Web Redesign

A complete redesign of the [Wise Language Academy](https://wiselanguageacademy.com/) website. It features a modern, professional, dynamic, and trustworthy Single-Page Application (SPA) designed to drive student engagement and establish authority for German language training and study abroad consultation.

---

## 🌟 Key Highlights & Features

1. **Stunning Visual Aesthetics**
   * Premium typography using *Outfit* and *Plus Jakarta Sans*.
   * Vibrant, curated HSL-tailored color palette representing academic success.
   * Full **Dark & Light Mode** support with smooth color-fade transitions (state persisted in `localStorage`).
   * Subtle glassmorphism card layouts, hover micro-animations, and dynamic shadow glows.
   
2. **Dynamic Interactive Tools**
   * **German Level Selector (Placement Quiz)**: An interactive 3-step questionnaire calculating and recommending CEFR levels (A1 to B2) and durations matching the student's study capacity and career path.
   * **Testimonial Slider**: Filterable category carousel (All, Study Visa, Medical/Nurses, telc Qualified) with automated sliding transitions.
   * **FAQ Accordion**: Custom height-animating accordions answering standard telc and visa questions.
   
3. **Trust & Trustworthiness Builders**
   * Integrated banners highlighting official **telc Examination Venue** status.
   * Association highlighting with **SIOC (Seema's Institute of Competition)** educational trust active since 2001.
   * Complete client-side input validations for the Consultation Booking form to ensure secure data capture.
   
4. **Embedded Local Media**
   * Custom video showcase player displaying the virtual campus tour.
   * Direct-download drawers for brochures (`brochure.png` and `txnb_services_brochure.png`).

---

## 🛠️ Tech Stack & Structure

* **Core**: Semantic HTML5 markup
* **Styling**: Vanilla CSS3 Custom Properties (CSS variables), Grid, Flexbox, Keyframes
* **Logic**: Modern Vanilla ES6+ JavaScript (Zero external dependencies)
* **Assets**: High-fidelity flat vector illustrations

### File Structure
```text
Pico Ui/
├── index.html                   # Main web page structure & content
├── style.css                    # Design tokens, variables, & responsive grid rules
├── app.js                       # Logic for quiz, slider, video, validation, & theme switcher
├── hero_german.png              # Vector illustration for German education hero section
├── study_abroad.png             # Vector illustration for visa guidance section
├── brochure.png                 # General Academy Brochure (PNG)
├── txnb_services_brochure.png   # SIOC Services Brochure (PNG)
└── VID_20260605_174827712.mp4   # Local virtual campus tour video file
```

---

## 🚀 How to Run Locally

Since this project is built entirely on native HTML/CSS/JS web tech with **no build steps or dependencies**:
1. Clone or download the repository files.
2. Double-click the `index.html` file to open it directly in any modern web browser (Chrome, Edge, Safari, Firefox).
3. (Optional) Run a simple server in the directory if you wish to host it on a local IP:
   * **Python**: `python -m http.server 8000`
   * **Node.js**: `npx serve .`
