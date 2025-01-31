document.addEventListener('DOMContentLoaded', function() {
    // Set default date to today
    document.getElementById('attendanceDate').valueAsDate = new Date();

    // Initialize filters
    const courseFilter = document.getElementById('courseFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const subjectFilter = document.getElementById('subjectFilter');

    // Sample subject data (you can replace this with your actual data)
    const subjectsByCourse = {
        'bca': {
            '1': ['Programming in C', 'Mathematics', 'Digital Logic'],
            '2': ['Data Structures', 'OOP with C++', 'Database Management'],
            '3': ['Java Programming', 'Web Technologies', 'Operating Systems']
        },
        'mca': {
            '1': ['Advanced Java', 'Data Mining', 'Cloud Computing'],
            '2': ['Machine Learning', 'Big Data Analytics', 'Software Engineering'],
            '3': ['Artificial Intelligence', 'Network Security', 'Mobile Computing']
        }
    };

    // Update subjects when course or semester changes
    function updateSubjects() {
        const course = courseFilter.value;
        const semester = semesterFilter.value;
        subjectFilter.innerHTML = '<option value="">Select Subject</option>';

        if (course && semester && subjectsByCourse[course] && subjectsByCourse[course][semester]) {
            subjectsByCourse[course][semester].forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.toLowerCase().replace(/\s+/g, '-');
                option.textContent = subject;
                subjectFilter.appendChild(option);
            });
        }
    }

    courseFilter.addEventListener('change', updateSubjects);
    semesterFilter.addEventListener('change', updateSubjects);

    // Sample student data (replace with your actual data)
    const sampleStudents = [
        { rollNo: '2023001', name: 'John Doe' },
        { rollNo: '2023002', name: 'Jane Smith' },
        { rollNo: '2023003', name: 'Mike Johnson' },
        { rollNo: '2023004', name: 'Sarah Williams' },
        { rollNo: '2023005', name: 'David Brown' }
    ];

    // Populate attendance table
    function populateAttendanceTable() {
        const tableBody = document.getElementById('attendanceTableBody');
        tableBody.innerHTML = '';

        sampleStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>
                    <select class="attendance-status" data-roll="${student.rollNo}">
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="late">Late</option>
                    </select>
                </td>
                <td>
                    <input type="text" class="remarks" placeholder="Add remarks">
                </td>
            `;
            tableBody.appendChild(row);
        });

        updateSummary();
    }

    // Update attendance summary
    function updateSummary() {
        const statuses = document.querySelectorAll('.attendance-status');
        let present = 0;
        let absent = 0;

        statuses.forEach(status => {
            if (status.value === 'present') present++;
            if (status.value === 'absent') absent++;
        });

        document.getElementById('presentCount').textContent = present;
        document.getElementById('absentCount').textContent = absent;
        document.getElementById('totalCount').textContent = statuses.length;
    }

    // Event listeners for status changes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('attendance-status')) {
            updateSummary();
        }
    });

    // Save attendance
    document.getElementById('saveAttendance').addEventListener('click', function() {
        const attendance = [];
        const date = document.getElementById('attendanceDate').value;
        const course = courseFilter.value;
        const semester = semesterFilter.value;
        const subject = subjectFilter.value;

        document.querySelectorAll('#attendanceTableBody tr').forEach(row => {
            const status = row.querySelector('.attendance-status').value;
            const remarks = row.querySelector('.remarks').value;
            const rollNo = row.querySelector('.attendance-status').dataset.roll;

            attendance.push({
                date,
                course,
                semester,
                subject,
                rollNo,
                status,
                remarks
            });
        });

        // Here you would typically send this data to your backend
        console.log('Saving attendance:', attendance);
        alert('Attendance saved successfully!');
    });

    // Export to Excel
    document.getElementById('exportAttendance').addEventListener('click', function() {
        // Here you would implement the Excel export functionality
        alert('Attendance data will be exported to Excel');
    });

    // Generate Report
    document.getElementById('generateReport').addEventListener('click', function() {
        const course = courseFilter.value;
        const semester = semesterFilter.value;
        const subject = subjectFilter.value;

        if (!course || !semester || !subject) {
            alert('Please select all filters before generating report');
            return;
        }

        // Here you would typically generate and display the report
        alert('Generating attendance report...');
    });

    // Initialize the table
    populateAttendanceTable();
});
