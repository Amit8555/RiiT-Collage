document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const yearFilter = document.getElementById('yearFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const examTypeFilter = document.getElementById('examTypeFilter');
    const semesterSections = document.querySelectorAll('.semester-section');
    const noResults = document.querySelector('.no-results');

    // Function to filter question papers
    function filterPapers() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedYear = yearFilter.value;
        const selectedSemester = semesterFilter.value;
        const selectedExamType = examTypeFilter.value;
        let hasVisiblePapers = false;

        semesterSections.forEach(section => {
            const papers = section.querySelectorAll('.paper-card');
            let hasVisibleInSection = false;

            papers.forEach(paper => {
                const title = paper.querySelector('h3').textContent.toLowerCase();
                const details = paper.querySelector('p').textContent.toLowerCase();
                const semester = section.getAttribute('data-semester');

                const matchesSearch = !searchTerm || 
                    title.includes(searchTerm) || 
                    details.includes(searchTerm);
                const matchesYear = !selectedYear || 
                    details.includes(selectedYear);
                const matchesSemester = !selectedSemester || 
                    semester === selectedSemester;
                const matchesExamType = !selectedExamType || 
                    details.toLowerCase().includes(selectedExamType.toLowerCase());

                if (matchesSearch && matchesYear && matchesSemester && matchesExamType) {
                    paper.style.display = 'flex';
                    hasVisibleInSection = true;
                    hasVisiblePapers = true;
                } else {
                    paper.style.display = 'none';
                }
            });

            section.style.display = hasVisibleInSection ? 'block' : 'none';
        });

        noResults.style.display = hasVisiblePapers ? 'none' : 'block';
    }

    // Event listeners for filters
    searchInput.addEventListener('input', filterPapers);
    yearFilter.addEventListener('change', filterPapers);
    semesterFilter.addEventListener('change', filterPapers);
    examTypeFilter.addEventListener('change', filterPapers);

    // Download functionality
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const paperTitle = this.closest('.paper-card').querySelector('h3').textContent;
            alert(`Downloading ${paperTitle}...\nNote: This is a demo. In production, this would download the actual PDF file.`);
        });
    });
});
