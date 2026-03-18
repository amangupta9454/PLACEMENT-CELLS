import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
  roundName: { type: String, trim: true },
  mode: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
}, { _id: false });

const jobSchema = new mongoose.Schema(
  {
    // ── Company Information ──────────────────────────────────────────
    companyName: { type: String, required: true, trim: true },
    companyWebsite: { type: String, trim: true, default: '' },
    aboutCompany: { type: String, default: '' },
    industryType: { type: String, trim: true, default: '' },
    companyLocation: { type: String, trim: true, default: '' },

    // ── Job Details ──────────────────────────────────────────────────
    role: { type: String, required: true, trim: true },
    jobType: {
      type: String,
      enum: ['Internship', 'Full-Time', 'Internship + PPO'],
      default: 'Full-Time',
    },
    workMode: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      default: 'On-site',
    },
    openings: { type: Number, default: 1 },
    location: { type: String, required: true, trim: true },

    // ── Compensation ─────────────────────────────────────────────────
    package: { type: String, required: true }, // legacy field, kept for compatibility
    stipend: { type: String, default: '' },    // ₹/month for internship
    ctc: { type: String, default: '' },        // ₹ LPA for full-time
    perks: { type: String, default: '' },

    // ── Skills & Requirements ────────────────────────────────────────
    requiredSkills: { type: [String], default: [] },
    preferredSkills: { type: [String], default: [] },
    programmingLanguages: { type: [String], default: [] },
    tools: { type: [String], default: [] },
    eligibility: {
      cgpa: { type: Number, required: true },
      branch: { type: [String], required: true },
      passingYear: { type: [String], default: [] },
    },

    // ── Job Description ──────────────────────────────────────────────
    description: { type: String, required: true },
    roleOverview: { type: String, default: '' },
    responsibilities: { type: [String], default: [] },
    qualifications: { type: [String], default: [] },
    additionalInfo: { type: String, default: '' },

    // ── Selection Process ────────────────────────────────────────────
    selectionRounds: { type: [roundSchema], default: [] },

    // ── Important Dates ──────────────────────────────────────────────
    applicationStartDate: { type: Date },
    deadline: { type: Date, required: true }, // originally applicationDeadline
    testDates: { type: String, default: '' },
    interviewDates: { type: String, default: '' },

    // ── Application Details ──────────────────────────────────────────
    applicationMode: {
      type: String,
      enum: ['Internal Portal', 'External Link'],
      default: 'Internal Portal',
    },
    applicationLink: { type: String, default: '' },

    // ── TPO Controls ─────────────────────────────────────────────────
    visibility: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Published',
    },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
