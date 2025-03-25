document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const classValue = document.getElementById('classSelect').value;
    const boardValue = document.getElementById('boardSelect').value;
    const subjectValue = document.getElementById('subjectSelect').value;
    const fileInput = document.getElementById('fileInput').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        const base64File = reader.result.split(',')[1];

        fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                classValue,
                boardValue,
                subjectValue,
                fileName: fileInput.name,
                fileContent: base64File
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'File uploaded successfully!') {
                alert(data.message);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('File upload failed. Please try again.');
        });
    };
    reader.readAsDataURL(fileInput);
});

document.getElementById('classSelect').addEventListener('change', function() {
    loadSubjects();
});
document.getElementById('boardSelect').addEventListener('change', function() {
    loadSubjects();
});

function loadSubjects() {
    const classValue = document.getElementById('classSelect').value;
    const boardValue = document.getElementById('boardSelect').value;

    const subjects = {
        nursery: ["Mathematics", "English", "Environmental Studies"],
        1: ["Mathematics", "English", "Environmental Studies"],
        2: ["Mathematics", "English", "Environmental Studies"],
        3: ["Mathematics", "English", "Science", "Social Studies"],
        4: ["Mathematics", "English", "Science", "Social Studies"],
        5: ["Mathematics", "English", "Science", "Social Studies"],
        6: ["Mathematics", "English", "Science", "Social Studies"],
        7: ["Mathematics", "English", "Science", "Social Studies"],
        8: ["Mathematics", "English", "Science", "Social Studies"],
        9: ["Mathematics", "English", "Science", "Social Studies"],
        10: ["Mathematics", "English", "Science", "Social Studies"],
        11: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics"],
        12: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics"]
    };

    const subjectSelect = document.getElementById('subjectSelect');
    subjectSelect.innerHTML = '';

    if(subjects[classValue]) {
        subjects[classValue].forEach(subject => {
            const option = document.createElement('option');
            option.value = subject.toLowerCase();
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
    }
}
