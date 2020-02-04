import Note from './js/noteModel';
import * as view from './js/view';
import $ from 'jquery';

const state = {
    notes: []
};

// Creating a new note

const createNewNote = () => {

    state.notes.push(new Note('', ''));
    let lastID = state.notes[state.notes.length - 1].getOwnId();
    local('set', lastID, state.notes[state.notes.length - 1]);

    console.log(state);

    view.createNewNoteView(lastID);

};

$('#add').click(createNewNote);

// Delete note
$('#container-notes').on('click', '.delete', el => {

    // Remove note from the state
    let removeID = el.target.parentNode.parentNode.id;
    state.notes.forEach((cur, ind, arr) => {
        if (cur.ID == removeID) {
            state.notes.splice(ind, 1);
            console.log(state.notes);
        }
    });

    // Remove note from the UI
    view.deleteNote(removeID);
    console.log(removeID);
    local('remove', removeID);

});

$("body").on('keypress', 'textarea, input', (el) => {
    let id = el.target.parentNode.parentNode.id;
    state.notes.forEach((cur, ind, arr) => {
        if (cur.ID == id) {
            cur.title = view.getInput('title', id);
            cur.body = view.getInput('body', id);
            local('set', id, cur);
        }
    });
});

// Put the object into storage
const local = (type, noteid, noteObject) => {
    if (type == 'set') {
        localStorage.setItem(`uu${noteid}uu`, JSON.stringify(noteObject));
    } else if (type == 'get') {
        let note = localStorage.getItem(`uu${noteid}uu`);
        return JSON.parse(note);
    } else if (type == 'getRender') {
        let note = localStorage.getItem(`${noteid}`);
        return JSON.parse(note);
    } else if (type == 'remove') {
        localStorage.removeItem(`uu${noteid}uu`);
    }
};

// Load new notes
const renderLocal = () => {
    Object.entries(localStorage).forEach((cur, ind, arr) => {
        if (cur[0].includes('uu')) {
            var newid = cur[0].split('uu');
            newid = newid[1];
            console.log(newid);
            state.notes.push(
                (new Note (local('getRender', cur[0]).title, local('getRender', cur[0]).body, newid))
                );
        }
    });

    state.notes.forEach((cur, ind, arr) => {
        view.renderNote(cur.ID, cur.title, cur.body);
    });

    console.log(state.notes);
};

renderLocal();

// Create the darkmode effect

$('.slider').click((el) => {
    $("body").toggleClass('dark-mode-2');
})
