document.addEventListener('DOMContentLoaded', function() {
    const semesterTabs = document.querySelectorAll('.semester-tab');
    const semesterContents = document.querySelectorAll('.semester-content');

    // Function to switch semesters
    function switchSemester(targetId) {
        // Remove active class from all tabs and contents
        semesterTabs.forEach(tab => tab.classList.remove('active'));
        semesterContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        const targetTab = document.querySelector(`[href="#${targetId}"]`);
        const targetContent = document.getElementById(targetId);
        
        if (targetTab && targetContent) {
            targetTab.classList.add('active');
            targetContent.classList.add('active');
        }
    }

    // Add click event listeners to semester tabs
    semesterTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            switchSemester(targetId);
        });
    });

    // Load semester content dynamically
    function loadSemesterContent(semesterId) {
        const semesterContent = document.getElementById(semesterId);
        if (!semesterContent.querySelector('.subjects-grid')) {
            // Simulated content loading
            // In a real application, this would fetch data from a server
            const subjects = getSemesterSubjects(semesterId);
            const subjectsGrid = document.createElement('div');
            subjectsGrid.className = 'subjects-grid';
            
            subjects.forEach(subject => {
                subjectsGrid.innerHTML += `
                    <div class="subject-card">
                        <div class="subject-icon">
                            <i class="${subject.icon}"></i>
                        </div>
                        <div class="subject-info">
                            <h3>${subject.name}</h3>
                            <p>Credits: ${subject.credits}</p>
                            <div class="subject-details">
                                <span><i class="fas fa-clock"></i> ${subject.hours} Hours</span>
                                <span><i class="fas fa-book"></i> ${subject.type}</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            semesterContent.appendChild(subjectsGrid);
        }
    }

    // Simulated subject data
    function getSemesterSubjects(semesterId) {
        const subjectsData = {
            sem1: [
                { name: 'Programming in C', credits: 4, hours: 60, type: 'Core', icon: 'fas fa-code' },
                { name: 'Mathematics', credits: 4, hours: 60, type: 'Core', icon: 'fas fa-square-root-alt' },
                { name: 'Digital Electronics', credits: 4, hours: 60, type: 'Core', icon: 'fas fa-microchip' }
            ],
            sem2: [
                { name: 'Object Oriented Programming', credits: 4, hours: 60, type: 'Core', icon: 'fas fa-cube' },
                { name: 'Data Structures', credits: 4, hours: 60, type: 'Core', icon: 'fas fa-project-diagram' },
                { name: 'Computer Organization', credits: 4, hours: 60, type: 'Core', icon: 'fas fa-memory' }
            ],
            // Add more semester data as needed
        };

        return subjectsData[semesterId] || [];
    }

    // Initialize first semester
    loadSemesterContent('sem1');
});
