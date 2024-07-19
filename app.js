document.addEventListener('DOMContentLoaded', () => {
    const teacherLink = document.getElementById('teacherLink');
    const studentLink = document.getElementById('studentLink');
    const teacherView = document.getElementById('teacherView');
    const studentView = document.getElementById('studentView');
    const gradeForm = document.getElementById('gradeForm');
    const studentForm = document.getElementById('studentForm');
    const gradeOutput = document.getElementById('gradeOutput');
    const teacherOutput = document.getElementById('teacherOutput');

    let grades = {};

    function showView(view) {
        teacherView.style.display = 'none';
        studentView.style.display = 'none';
        teacherLink.style.display = 'none';
        studentLink.style.display = 'none';
        view.style.display = 'block';

        if (view === teacherView) {
            studentLink.style.display = 'block';
            teacherOutput.textContent = ''; // Clear the previous output message
        } else if (view === studentView) {
            teacherLink.style.display = 'block';
        }
    }

    teacherLink.addEventListener('click', () => {
        showView(teacherView);
    });

    studentLink.addEventListener('click', () => {
        showView(studentView);
    });

    gradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const subjectMarks = [
            parseInt(document.getElementById('subject1').value),
            parseInt(document.getElementById('subject2').value),
            parseInt(document.getElementById('subject3').value),
            parseInt(document.getElementById('subject4').value),
            parseInt(document.getElementById('subject5').value)
        ];

        grades[studentName] = subjectMarks.map(mark => {
            if (mark > 90) return 'O';
            if (mark >= 80) return 'A+';
            if (mark >= 70) return 'A';
            if (mark >= 60) return 'B+';
            if (mark >= 50) return 'B';
            if (mark >= 40) return 'C';
            return 'F';
        });

        teacherOutput.textContent = `Grades for ${studentName} are saved.`;
        gradeForm.reset();
    });

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentNameInput').value;
        if (grades[studentName]) {
            const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'];
            let table = `<table>
                <tr><th>Subject</th><th>Grade</th></tr>`;
            for (let i = 0; i < subjects.length; i++) {
                table += `<tr><td>${subjects[i]}</td><td>${grades[studentName][i]}</td></tr>`;
            }
            table += `</table>`;
            gradeOutput.innerHTML = `Grades for ${studentName}:<br>${table}`;
        } else {
            gradeOutput.textContent = 'No grade found for your name.';
        }
    });

    // Default view
    showView(teacherView);
});
