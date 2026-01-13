mongoose.connect('mongodb://127.0.0.1:27017/SkillUser');

let userSchema = mongoose.Schema({

    name: String,
    email: String,
    password: String,
    resume: {
      originalName: String,
      fileName: String,
      filePath: String,
      fileSize: Number,
      mimeType: String
    }
  },
  { timestamps: true }
   
);

module.exports = mongoose.model('user',userSchema);
