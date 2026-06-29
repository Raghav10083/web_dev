/* ==========================================================================
   Wise Language Academy Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Theme Toggle System (Dark / Light Mode)
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const bodyElement = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        bodyElement.className = savedTheme;
    } else {
        // Default to light-mode
        bodyElement.className = 'light-mode';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('light-mode')) {
            bodyElement.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            bodyElement.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    /* --------------------------------------------------------------------------
       2. Announcement Bar Closer
       -------------------------------------------------------------------------- */
    const announcementBar = document.getElementById('announcementBar');
    const closeAnnouncementBtn = document.getElementById('closeAnnouncement');

    if (announcementBar && closeAnnouncementBtn) {
        closeAnnouncementBtn.addEventListener('click', () => {
            announcementBar.style.display = 'none';
        });
    }

    /* --------------------------------------------------------------------------
       3. Header Shrink & Active Scroll Navigation
       -------------------------------------------------------------------------- */
    const mainHeader = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Header Shrink
        if (window.scrollY > 50) {
            mainHeader.classList.add('shrink');
        } else {
            mainHeader.classList.remove('shrink');
        }

        // Active Navigation Link on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Back to Top Button Visibility
        const backToTopBtn = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Back to Top Click
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------------
       4. Mobile Drawer Navigation
       -------------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (mobileToggle && mobileDrawer && closeDrawerBtn) {
        mobileToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });

        closeDrawerBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });

        // Close drawer when clicking a link
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
            });
        });
    }

    /* --------------------------------------------------------------------------
       5. Hero Dynamic Text Rotator
       -------------------------------------------------------------------------- */
    const textRotator = document.getElementById('textRotator');
    const words = ["Germany & Europe", "Global Careers", "telc Credentials", "Fluent German"];
    let wordIndex = 0;

    setInterval(() => {
        wordIndex = (wordIndex + 1) % words.length;
        textRotator.style.opacity = '0';
        setTimeout(() => {
            textRotator.textContent = words[wordIndex];
            textRotator.style.opacity = '1';
        }, 300);
    }, 3000);

    /* --------------------------------------------------------------------------
       6. Campus Video Custom Playback Controls
       -------------------------------------------------------------------------- */
    const videoOverlay = document.getElementById('videoOverlay');
    const campusVideo = document.getElementById('campusVideo');

    if (videoOverlay && campusVideo) {
        videoOverlay.addEventListener('click', () => {
            videoOverlay.classList.add('hidden');
            campusVideo.play();
        });

        campusVideo.addEventListener('pause', () => {
            videoOverlay.classList.remove('hidden');
        });

        campusVideo.addEventListener('ended', () => {
            videoOverlay.classList.remove('hidden');
        });
    }

    /* --------------------------------------------------------------------------
       7. Programs Tab Switcher
       -------------------------------------------------------------------------- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* --------------------------------------------------------------------------
       8. German Course Cards Hover Highlighting
       -------------------------------------------------------------------------- */
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        const hintElement = card.querySelector('.german-hint');
        if (hintElement) {
            const originalText = hintElement.textContent;
            const germanText = hintElement.getAttribute('data-german');

            card.addEventListener('mouseenter', () => {
                hintElement.textContent = `🇩🇪 ${germanText}`;
                hintElement.style.color = 'var(--accent-color)';
            });

            card.addEventListener('mouseleave', () => {
                hintElement.textContent = originalText;
                hintElement.style.color = 'var(--text-muted)';
            });
        }
    });

    /* --------------------------------------------------------------------------
       9. German Level Placement Quiz Logic
       -------------------------------------------------------------------------- */
    let currentStep = 1;
    const totalSteps = 3;
    
    const quizPrevBtn = document.getElementById('quizPrevBtn');
    const quizNextBtn = document.getElementById('quizNextBtn');
    const quizProgressBar = document.getElementById('quizProgressBar');
    const quizNavigation = document.getElementById('quizNavigation');
    
    const stepsElements = document.querySelectorAll('.quiz-step');
    const quizResultElement = document.getElementById('quizResult');

    function updateQuizProgress() {
        const percentage = (currentStep / totalSteps) * 100;
        quizProgressBar.style.width = `${percentage}%`;
    }

    function showStep(stepNum) {
        stepsElements.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === stepNum) {
                step.classList.add('active');
            }
        });

        // Handle prev button state
        if (stepNum === 1) {
            quizPrevBtn.setAttribute('disabled', 'true');
        } else {
            quizPrevBtn.removeAttribute('disabled');
        }

        // Handle next button label
        if (stepNum === totalSteps) {
            quizNextBtn.textContent = 'Calculate Result';
        } else {
            quizNextBtn.textContent = 'Next Question';
        }
    }

    quizNextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateQuizProgress();
        } else if (currentStep === totalSteps) {
            calculateQuizResult();
        }
    });

    quizPrevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateQuizProgress();
        }
    });

    function calculateQuizResult() {
        const selectedGoal = document.querySelector('input[name="goal"]:checked').value;
        const selectedKnowledge = document.querySelector('input[name="knowledge"]:checked').value;
        const selectedTime = document.querySelector('input[name="time"]:checked').value;

        // Elements to update
        const resLevel = document.getElementById('resLevel');
        const resDesc = document.getElementById('resDesc');
        const resDuration = document.getElementById('resDuration');
        const resCert = document.getElementById('resCert');

        let level = '';
        let desc = '';
        let duration = '';
        let targetExam = '';

        if (selectedGoal === 'spouse') {
            if (selectedKnowledge === 'none') {
                level = 'Deutsch A1 Program';
                desc = 'Spouse and family reunion visa applications require a basic command of German (A1 level). We recommend our standard A1 course, focusing on basic everyday vocabulary, greetings, and simple statements.';
                duration = '2 Months';
                targetExam = 'telc A1';
            } else {
                level = 'Deutsch A2 Course';
                desc = 'Since you already possess some basic greetings, you can challenge the A2 level. This course expands your vocabulary, focuses on complex sentences, and qualifies you fully for a family reunion pathway.';
                duration = '2 Months';
                targetExam = 'telc A2';
            }
        } else if (selectedGoal === 'study' || selectedGoal === 'job') {
            if (selectedKnowledge === 'none') {
                level = 'Deutsch A1-B2 Intensive Combo';
                desc = 'Higher education and career opportunities (Nurses, Engineers) in Germany require at least B2 level fluency. Our intensive combo takes you from an absolute beginner to advanced proficiency with dedicated telc B2 test prep.';
                duration = selectedTime === 'full' ? '6 Months' : '8 Months';
                targetExam = 'telc B2';
            } else if (selectedKnowledge === 'basic') {
                level = 'Deutsch A2-B2 Combo Course';
                desc = 'With basic knowledge, you can bypass parts of A1. We recommend jumping into early A2 and completing B2 intermediate fluency, qualifying you for internships, job visas, and German-taught universities.';
                duration = selectedTime === 'full' ? '5 Months' : '7 Months';
                targetExam = 'telc B2';
            } else {
                level = 'Deutsch B1-B2 Advanced Combo';
                desc = 'Since you can frame basic sentences, you are ready to master professional German. Our B1-B2 program refines your grammar, sharpens writing skills, and prepares you for specialized workplace communication.';
                duration = selectedTime === 'full' ? '4 Months' : '5 Months';
                targetExam = 'telc B2';
            }
        } else {
            // hobby
            if (selectedKnowledge === 'none') {
                level = 'Deutsch A1 + A2 Package';
                desc = 'For personal enrichment or travel, reaching an elementary (A2) level is highly fulfilling. Learn to understand basic travel conversations, request directions, order food, and converse with natives.';
                duration = '4 Months';
                targetExam = 'telc A2';
            } else if (selectedKnowledge === 'basic') {
                level = 'Deutsch A2 Course';
                desc = 'Continue your personal journey with the A2 course. Ideal for hobbyists wanting to expand conversational capability, simple story reading, and basic tourist dialogues.';
                duration = '2 Months';
                targetExam = 'telc A2';
            } else {
                level = 'Deutsch B1 Course';
                desc = 'Achieve intermediate fluency. Read German news articles, watch movies with subtitles, and express opinions on broad topics. Highly recommended for language enthusiasts!';
                duration = '2.5 Months';
                targetExam = 'telc B1';
            }
        }

        // Apply results to text nodes
        resLevel.textContent = level;
        resDesc.textContent = desc;
        resDuration.textContent = duration;
        resCert.textContent = targetExam;

        // Hide steps, hide nav and show result
        stepsElements.forEach(s => s.classList.remove('active'));
        quizNavigation.style.display = 'none';
        quizProgressBar.style.width = '100%';
        quizResultElement.style.display = 'block';

        // Pre-fill interest select in contact form
        const formInterest = document.getElementById('formInterest');
        if (formInterest) {
            if (level.includes('B2')) {
                formInterest.value = 'German B2';
            } else if (level.includes('B1')) {
                formInterest.value = 'German B1';
            } else if (level.includes('A2')) {
                formInterest.value = 'German A2';
            } else {
                formInterest.value = 'German A1';
            }
        }
    }

    // Reset Quiz
    const quizResetBtn = document.getElementById('quizResetBtn');
    if (quizResetBtn) {
        quizResetBtn.addEventListener('click', () => {
            currentStep = 1;
            quizResultElement.style.display = 'none';
            quizNavigation.style.display = 'flex';
            showStep(1);
            updateQuizProgress();
        });
    }

    // Register button in result points to contact section
    const quizRegisterBtn = document.getElementById('quizRegisterBtn');
    if (quizRegisterBtn) {
        quizRegisterBtn.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------------
       10. Testimonials Slider & Filters
       -------------------------------------------------------------------------- */
    const testimonialSlides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const testimonialSlider = document.getElementById('testimonialSlider');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const dotsContainer = document.getElementById('sliderDots');
    
    let activeTestimonials = [...testimonialSlides];
    let slideIndex = 0;

    function buildDots() {
        dotsContainer.innerHTML = '';
        activeTestimonials.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = idx === 0 ? 'dot active' : 'dot';
            dot.setAttribute('data-index', idx);
            dot.addEventListener('click', () => {
                goToSlide(idx);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        slideIndex = index;
        const offset = -100 * slideIndex;
        testimonialSlider.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(d => d.classList.remove('active'));
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }
    }

    // Filter Trigger
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Transition fadeout
            testimonialSlider.style.opacity = '0';

            setTimeout(() => {
                // Clear display filters
                testimonialSlides.forEach(slide => {
                    slide.style.display = 'none';
                });

                if (filterValue === 'all') {
                    activeTestimonials = [...testimonialSlides];
                } else {
                    activeTestimonials = testimonialSlides.filter(slide => 
                        slide.getAttribute('data-category').includes(filterValue)
                    );
                }

                activeTestimonials.forEach(slide => {
                    slide.style.display = 'flex';
                });

                // Reset position & build dots
                buildDots();
                goToSlide(0);
                
                testimonialSlider.style.opacity = '1';
            }, 300);
        });
    });

    // Auto Slider
    let autoSlideInterval = setInterval(() => {
        if (activeTestimonials.length <= 1) return;
        let nextIndex = (slideIndex + 1) % activeTestimonials.length;
        goToSlide(nextIndex);
    }, 6000);

    // Pause auto slide on user action
    dotsContainer.addEventListener('click', () => clearInterval(autoSlideInterval));
    filterBtns.forEach(b => b.addEventListener('click', () => clearInterval(autoSlideInterval)));

    // Initialize testimonials dots
    buildDots();

    /* --------------------------------------------------------------------------
       11. FAQs Accordion height transitions
       -------------------------------------------------------------------------- */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const faqItem = q.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If not active, open clicked one
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* --------------------------------------------------------------------------
       12. Contact Form Validations & Mock Success Toast
       -------------------------------------------------------------------------- */
    const consultationForm = document.getElementById('consultationForm');
    
    // Form Inputs
    const formName = document.getElementById('formName');
    const formEmail = document.getElementById('formEmail');
    const formPhone = document.getElementById('formPhone');
    
    // Error spans
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const formSuccessToast = document.getElementById('formSuccessToast');

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePhone(phone) {
        // Simple regex for 10 digits
        const regex = /^[6-9]\d{9}$/;
        return regex.test(phone.replace(/\s+/g, ''));
    }

    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            phoneError.style.display = 'none';
            formName.style.borderColor = 'var(--border-color)';
            formEmail.style.borderColor = 'var(--border-color)';
            formPhone.style.borderColor = 'var(--border-color)';

            // Validate Name
            if (formName.value.trim() === '') {
                nameError.style.display = 'block';
                formName.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }

            // Validate Email
            if (!validateEmail(formEmail.value.trim())) {
                emailError.style.display = 'block';
                formEmail.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }

            // Validate Phone
            if (!validatePhone(formPhone.value.trim())) {
                phoneError.style.display = 'block';
                formPhone.style.borderColor = 'var(--danger-color)';
                isValid = false;
            }

            if (isValid) {
                // Submit Form: mock success
                const submitBtn = document.getElementById('submitFormBtn');
                submitBtn.setAttribute('disabled', 'true');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

                setTimeout(() => {
                    // Show success toast
                    formSuccessToast.style.display = 'flex';
                    consultationForm.reset();

                    // Reset button
                    submitBtn.removeAttribute('disabled');
                    submitBtn.innerHTML = originalText;

                    // Hide toast after 8 seconds
                    setTimeout(() => {
                        formSuccessToast.style.display = 'none';
                    }, 8000);
                }, 1500);
            }
        });
    }

    // Direct Course Card Inquiry Link triggers
    const courseInquireButtons = document.querySelectorAll('.course-inquire');
    courseInquireButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseName = btn.getAttribute('data-course');
            const formInterest = document.getElementById('formInterest');
            if (formInterest) {
                // Find matching option
                for (let i = 0; i < formInterest.options.length; i++) {
                    if (formInterest.options[i].value.includes(courseName)) {
                        formInterest.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });
});
