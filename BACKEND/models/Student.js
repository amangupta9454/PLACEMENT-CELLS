import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  skill: { type: String, required: true, trim: true },
  proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  techStack: { type: String, trim: true },
  description: { type: String },
  hostedLink: { type: String, trim: true },
  githubLink: { type: String, trim: true },
  contributors: { type: String, trim: true },
}, { _id: false });

const qualificationSchema = new mongoose.Schema({
  degree: { type: String, trim: true },
  institution: { type: String, trim: true },
  year: { type: String, trim: true },
  percentage: { type: String, trim: true },
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  company: { type: String, trim: true },
  role: { type: String, trim: true },
  duration: { type: String, trim: true },
  description: { type: String },
}, { _id: false });

const achievementSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  description: { type: String },
  year: { type: String, trim: true },
}, { _id: false });

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    branch: { type: String, required: false },
    cgpa: { type: Number, required: false },
    skills: { type: [skillSchema], default: [] },
    resumeUrl: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    role: { type: String, default: 'student' },
    isBlacklisted: { type: Boolean, default: false },
    blacklistReason: { type: String, default: '' },
    blacklistExpiry: { type: Date, default: null },
    // Extended profile sections
    mobile: { type: String, default: '' },
    course: { type: String, default: '' },
    year: { type: String, default: '' },
    linkedinLink: { type: String, default: '' },
    githubLink: { type: String, default: '' },
    portfolioLink: { type: String, default: '' },
    otherLink: { type: String, default: '' },
    projects: { type: [projectSchema], default: [] },
    qualifications: { type: [qualificationSchema], default: [] },
    experiences: { type: [experienceSchema], default: [] },
    achievements: { type: [achievementSchema], default: [] },
    responsibilities: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;
