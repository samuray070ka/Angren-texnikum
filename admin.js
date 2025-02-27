function openSidebar() {
    document.getElementById("sidebar").style.display = "block";
}

function closeSidebar() {
    document.getElementById("sidebar").style.display = "none";
}

// saveData funksiyasi backendga ma'lumotlarni yuborish uchun
function saveData(section) {
    const formData = new FormData();
    formData.append('section', section);

    switch (section) {
        case 'results':
            formData.append('number', document.getElementById('results-number')?.value || '');
            break;
        default:
            formData.append('title_uz', document.getElementById(`${section}-title-uz`)?.value || '');
            formData.append('desc_uz', document.getElementById(`${section}-desc-uz`)?.value || '');
            break;
    }

    const imgInput = document.getElementById(`${section}-img`);
    if (imgInput?.files.length > 0) {
        formData.append('img', imgInput.files[0]);
    }

    fetch('http://localhost:5000/admin', {
        method: 'POST',
        body: formData
        
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Xatolik: ' + data.error);
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Xatolik yuz berdi:', error);
    });
}