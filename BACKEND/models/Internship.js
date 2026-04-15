import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    applyLink: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      enum: ['Fresher', 'Experienced'],
      default: 'Fresher',
    },
    stipend: {
      type: String,
      enum: ['Paid', 'Free'],
      default: 'Free',
    },
    other: {
      type: String,
      default: '',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'postedByModel',
    },
    postedByModel: {
      type: String,
      required: true,
      enum: ['Student', 'Admin'],
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;
