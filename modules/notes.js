const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
    name:String,
    text:String,
})

const Note = new mongoose.model("Note",NoteSchema);
module.exports = Note;

module.exports.notesave = (data,callback)=>{
    let notes = new Note(data);
    notes.save(callback)
}
module.exports.get_all_notes = (callback)=>{
    Note.find({},(err,notes)=>{
        if(err)return callback(err,null);
        else return callback(null,notes);
    })
}
module.exports.delete_note = (data,callback)=>{
    Note.deleteOne({name:data.name,text:data.text}, function (err) {
        if (err) return handleError(err);
    });
    Note.find({},(err,notes)=>{
        if(err)return callback(err,null);
        else return callback(null,notes);
    })
}
module.exports.update = (data,callback)=>{
    Note.findByIdAndUpdate(data._id,data,callback);
}