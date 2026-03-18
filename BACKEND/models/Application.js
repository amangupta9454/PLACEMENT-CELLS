import mongoose from 'mongoose';

const skillEntrySchema = new mongoose.Schema({
  skill: { type: String, trim: true },
  proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  techStack: { type: String, trim: true },
  description: { type: String },
  hostedLink: { type: String, trim: true, default: '' },
  githubLink: { type: String, trim: true, default: '' },
  contributors: { type: String, trim: true, default: '' },
}, { _id: false });

const applicationSchema = new mongoose.Schema(
  {
    // ── References ───────────────────────────────────────────────────
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },

    // ── Status ───────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected', 'Withdrawn'],
      default: 'Applied',
    },

    // ── Applicant Submitted Details ──────────────────────────────────
    applicantName: { type: String, trim: true, default: '' },
    applicantEmail: { type: String, trim: true, lowercase: true, default: '' },
    mobile: { type: String, trim: true, default: '' },
    course: { type: String, trim: true, default: '' },
    branch: { type: String, trim: true, default: '' },
    year: { type: String, trim: true, default: '' },

    // ── Links ────────────────────────────────────────────────────────
    linkedinLink: { type: String, trim: true, default: '' },
    githubLink: { type: String, trim: true, default: '' },
    portfolioLink: { type: String, trim: true, default: '' },
    otherLink: { type: String, trim: true, default: '' },

    // ── Skills & Projects ────────────────────────────────────────────
    skills: { type: [skillEntrySchema], default: [] },
    projects: { type: [projectSchema], default: [] },

    // ── Resume at time of application ───────────────────────────────
    resumeUrl: { type: String, default: '' },
    coverLetter: { type: String, default: '' },
  },
  { timestamps: true }
);

// Prevent duplicate applications for the same job by the same student
applicationSchema.index({ student: 1, job: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
