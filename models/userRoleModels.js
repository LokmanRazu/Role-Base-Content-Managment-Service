const {Schema,model} = require('mongoose');

const roleSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    value:{
        type:String
    }
});

roleSchema.pre('save', function(){
    this.value = this.title.toLowerCase().split(' ').join('-')
})

const Role = model('Role',roleSchema);
module.exports = Role;