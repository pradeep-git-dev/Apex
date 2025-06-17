document.addEventListener('DOMContentLoaded', () => {
    const noteTitleInput = document.getElementById('noteTitleInput');
    const noteContentInput = document.getElementById('noteContentInput');
    const addNoteButton = document.getElementById('addNoteButton');
    const notesContainer = document.getElementById('notesContainer');
    const emptyNotesMessage = document.getElementById('emptyNotesMessage');

    const confirmationModal = document.getElementById('confirmationModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    let notes = [];
    let noteIndexToDelete = null;

    function loadNotes() {
        const storedNotes = localStorage.getItem('modernNotes');
        if (storedNotes) {
            notes = JSON.parse(storedNotes);
        }
        renderNotes();
    }

    function saveNotes() {
        localStorage.setItem('modernNotes', JSON.stringify(notes));
        updateEmptyMessageVisibility();
    }

    function updateEmptyMessageVisibility() {
        if (notes.length === 0) {
            emptyNotesMessage.classList.remove('hidden');
        } else {
            emptyNotesMessage.classList.add('hidden');
        }
    }

    function renderNotes() {
        notesContainer.innerHTML = '';
        if (notes.length === 0) {
            updateEmptyMessageVisibility();
            return;
        }

        notes.forEach((note, index) => {
            const noteCard = document.createElement('div');
            noteCard.classList.add('note-card');
            noteCard.setAttribute('data-index', index);

            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <div class="timestamp">${new Date(note.timestamp).toLocaleString()}</div>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            `;
            notesContainer.appendChild(noteCard);
        });
        updateEmptyMessageVisibility();
    }

    addNoteButton.addEventListener('click', () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();

        if (title || content) {
            const newNote = {
                title: title || "Untitled Note",
                content: content || "",
                timestamp: new Date().toISOString()
            };
            notes.push(newNote);
            saveNotes();
            renderNotes();
            noteTitleInput.value = '';
            noteContentInput.value = '';
        } else {
            console.log("Both title and content are empty. Please add some text to create a note.");
        }
    });

    notesContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn') || event.target.closest('.delete-btn')) {
            const deleteButton = event.target.closest('.delete-btn');
            const noteCard = deleteButton.closest('.note-card');
            if (noteCard) {
                noteIndexToDelete = Array.from(notesContainer.children).indexOf(noteCard);
                confirmationModal.classList.add('active');
            }
        }
    });

    confirmDeleteBtn.addEventListener('click', () => {
        if (noteIndexToDelete !== null) {
            notes.splice(noteIndexToDelete, 1);
            saveNotes();
            renderNotes();
            noteIndexToDelete = null;
            confirmationModal.classList.remove('active');
        }
    });

    cancelDeleteBtn.addEventListener('click', () => {
        noteIndexToDelete = null;
        confirmationModal.classList.remove('active');
    });

    window.addEventListener('click', (event) => {
        if (event.target === confirmationModal) {
            noteIndexToDelete = null;
            confirmationModal.classList.remove('active');
        }
    });

    loadNotes();
});
