// util.js or relevant JS file

const notes = {
    note1: {
        text: 'Hello Miss Amy, Welcome to Mr. Wacky House. You may know who I am, if not, it doesn\'t matter. Now you are my hostage, but I have prepare some puzzle in the house to give you a chance to escape. Once I come back, WE MAY HAVE SOME FUN :)'
    },
    note2: {
        text: 'I can be a pet, or I can be wild,I\'m often aloof but sometimes beguiled.I have sharp claws and a penchant for play,And I might nap on your lap on a lazy day.What am I?'
    },
    note3: {
        text: '1. This is a five digit number.  2. The number is only consist of 1,2,3,4.  3. The formed of first and second digit will be a prime number.  4. Third digit is the sum of second and fifth digit.  5. First and fourth digit are the same number.  6. All the 4 numbers are used. 7. The sum of last two digit will be 6.'
    },
    note4:{
        text:'The monitor of this room is quite suspicious'
    },
    note5:{
        text:'Do you find anything in this house that\'s conflicting or suspicious? Password:_ _ _ _ _ _ _ _ 5'
    },

    newspaper:{
        text:'Breaking News: "Mr. Wacky" Strikes Fear     Residents of Westearn Town are gripped by fear as the elusive serial killer "Mr. Wacky" continues his deadly spree. Randomly selecting victims, he subjects them to a harrowing game where their survival hinges on winning. With each abduction, the city remains on edge, unsure of where he will strike next. Authorities are urging vigilance as they intensify efforts to apprehend the perpetrator and bring an end to the terrifying ordeal gripping the community.'
    },
};

function showNote(noteId) {
    const note = notes[noteId];
    if (note) {
        const noteContainer = document.getElementById('note-container');
        const noteImage = document.getElementById('note-image');
        const noteText = document.getElementById('note-text');
        
        if (note.imageSrc) {
            noteImage.src = note.imageSrc;
            noteImage.style.display = 'block';
        } else {
            noteImage.style.display = 'none';
        }
        
        noteText.textContent = note.text;
        
        noteContainer.style.display = 'block';
    }
}

function closeNote() {
    const noteContainer = document.getElementById('note-container');
    noteContainer.style.display = 'none';
}