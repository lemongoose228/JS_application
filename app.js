new Vue({
    el: '#app',
    data: {
        noteTitle: '',
        noteContent: '',
        notePriority: 'low',
        noteStatus: 'in process', 
        notes: [],
        isEditing: false,
        editingIndex: null,
    },

    created() {

        if (localStorage.getItem('notes')) {
            const savedNotes = JSON.parse(localStorage.getItem('notes'));
            if (savedNotes) {
                this.notes = savedNotes;
            }
        }
        else {
            localStorage.setItem('notes', "");
            this.notes = [];
        }
    }, 

    methods: {
        saveNote() {

            if (!this.noteTitle || !this.noteContent || !this.notePriority || !this.noteStatus) {
                alert("Пожалуйста, заполните все поля!");
            } else {
                if (this.isEditing) {
                    this.notes[this.editingIndex] = {
                        title: this.noteTitle,
                        content: this.noteContent,
                        priority: this.notePriority,
                        status: this.noteStatus
                    };
                    this.isEditing = false;
                    this.editingIndex = null;

                    localStorage.setItem("notes", JSON.stringify(this.notes));
                } else {
                    this.notes.push({
                        title: this.noteTitle,
                        content: this.noteContent,
                        priority: this.notePriority,
                        status: this.noteStatus
                    });

                    localStorage.setItem("notes", JSON.stringify(this.notes));
                }
            }
            
            this.noteTitle = '';
            this.noteContent = '';
            this.notePriority = 'low';
            this.noteStatus = '';
        },
        editNote(index) {
            this.noteTitle = this.notes[index].title;
            this.noteContent = this.notes[index].content;
            this.notePriority = this.notes[index].priority;
            this.noteStatus = this.notes[index].status;

            this.isEditing = true; 
            this.editingIndex = index; 

            this.deleteNote(index); 
        },
        deleteNote(index) {
            this.notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
        resetNotes() {
            this.notes = [];
            localStorage.setItem("notes", "");
        },
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        clearInputs() {
            this.noteTitle = '';
            this.noteContent = '';
        }
    }
});