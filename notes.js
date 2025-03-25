document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const classValue = urlParams.get('class');
    const boardValue = urlParams.get('board');
    const subjectValue = urlParams.get('subject');

    const notesContainer = document.getElementById('notes');

    // Fetch notes from the sneha-tution-admin repository
    fetch(`https://api.github.com/repos/CompeteX001/sneha-tution-admin/contents/uploads/${classValue}/${boardValue}/${subjectValue}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(file => {
                    const fileLink = document.createElement('a');
                    fileLink.href = file.download_url;
                    fileLink.textContent = file.name;
                    fileLink.classList.add('note-link');
                    notesContainer.appendChild(fileLink);
                });
            } else {
                notesContainer.textContent = 'No notes available for this subject.';
            }
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
            notesContainer.textContent = 'Error fetching notes. Please try again later.';
        });
});