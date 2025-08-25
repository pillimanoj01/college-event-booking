const mongoose=require("mongoose");



const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Student", "Admin", "Club"],
    required: true
  },

  // Student-specific
  rollNo: {
    type: String,
    required: function () { return this.role === "Student"; }
  },
  year: {
    type: Number,
    required: function () { return this.role === "Student"; }
  },
  branch: {
    type: String,
    required: function () { return this.role === "Student"; }
  },
  section: {
    type: String,
    required: function () { return this.role === "Student"; }
  },

  // Admin-specific
  designation: {
    type: String,
    required: function () { return this.role === "Admin"; }
  },

  // Club-specific
  clubName: {
    type: String,
    required: function () { return this.role === "Club"; }
  },
  facultyCoordinator: {
    type: String,
    required: function () { return this.role === "Club"; }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports=mongoose.model("userModel",UserSchema);