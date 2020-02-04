import $ from 'jquery';

export const createNewNoteView = (id) => {
    const markup = `                
    <div class="notes color-4" id="${id}">
        <div class="text-body">
                <input id="note_block_${id}_title" class="title" type="text" placeholder="Type a title..." value="" maxlength="20">
                <textarea id="note_block_${id}_body" class="text" maxlength="200" placeholder="e.g. Be Vegan!"></textarea>
        </div>
        <a href="#"><div id="note_block_${id}_delete" class="delete">DELETE</div></a>
    </div>
    `;

    $('#container-notes').prepend(markup);
};

export const deleteNote = (id) => {
    $(`#${id}`).remove();
}

export const getInput = (type, id) => {
    
    let newID = `#note_block_${id}_${type}`;
    
    return $(newID).val();
}

export const renderNote = (id, titleContent, bodyContent) => {
    const markup = `                
    <div class="notes color-4" id="${id}">
        <div class="text-body">
                <input id="note_block_${id}_title" class="title" type="text" placeholder="Type a title..." value="${titleContent}" maxlength="20">
                <textarea id="note_block_${id}_body" class="text" maxlength="200" placeholder="e.g. Be Vegan!">${bodyContent}</textarea>
        </div>
        <a href="#"><div id="note_block_${id}_delete" class="delete">DELETE</div></a>
    </div>
    `;

    $('#container-notes').prepend(markup);
};
