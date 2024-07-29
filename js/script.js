const notescontainer = document.querySelector(".notes-container");
const addNote = document.querySelector(".new__note");
let noteEditIndex;

//Note class

class Note {
  constructo() {}
  //adding method for a note
  new() {
    const notecontainer = document.createElement("div");
    notecontainer.classList.add("note");
    notecontainer.classList.add("note-card");
    notecontainer.innerHTML = `
       <textarea class="textarea"></textarea>
       <i class="fa-solid fa-trash"></i>`;

    notescontainer.insertBefore(notecontainer, addNote);
  }

  //store note in local storage

  save(note) {
    let notes = [];
    if (localStorage.getItem("notes") === null) {
      notes.push(note);

      //saving to local storage
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      notes = JSON.parse(localStorage.getItem("notes"));
      if(notes.find((noteItem,index)=>noteEditIndex===index)){

        notes.splice(noteEditIndex,1,note)
        localStorage.setItem("notes", JSON.stringify(notes));


      }
      else{
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    }

  }
  render() {
    let notes = [];
    if (localStorage.getItem("notes") !== null) {
      notes = JSON.parse(localStorage.getItem("notes"));
      notes.map((note) => {
        const notecontainer = document.createElement("div");
        notecontainer.classList.add("note");
        notecontainer.classList.add("note-card");
        notecontainer.innerHTML = `
    <textarea class="textarea">${note}</textarea>
    <i class="fa-solid fa-trash"></i>`;

        notescontainer.insertBefore(notecontainer, addNote);
      });
    }
  }

  //remove note from dom
  delete(note) {
    const message = window.confirm(
      "Are you sure you want to delete this Note?"
    );

    if (message) {
      const notecontainer = note.parentElement;
      notecontainer.remove();
      let notes;
      notes = JSON.parse(localStorage.getItem("notes"));
      const noteIndex = notes.indexOf(note.value);
      notes.splice(noteIndex, 1);
      localStorage.setItem("notes", JSON.stringify(notes));

    }
  }
  
}

//Event listerner to run when all dom content is loaded

document.addEventListener("DOMContentLoaded", () => {
  const myNote = new Note();
  myNote.render();

  //event listener to add anew note
  addNote.addEventListener("click", () => {
    myNote.new();
  });

  //add event to notescontainer
  notescontainer.addEventListener("click", (e) => {
    const notes=notes = JSON.parse(localStorage.getItem("notes"))
    let noteEditIndex=notes.indexOf(e.target.value)
    if (e.target.classList.contains("textarea")) {
      e.target.addEventListener("change", () => {
        myNote.save(e.target.value);

      });
    }
    if (e.target.classList.contains("fa-trash")) {
      e.target.addEventListener("click", () => {
        myNote.delete(e.target);
      });
    }
  });
});
