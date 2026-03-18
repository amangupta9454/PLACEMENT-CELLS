import asyncHandler from '../utils/asyncHandler.js';
import Student from '../models/Student.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// @desc    Get dashboard analytics
// @route   GET /api/analytics
// @access  Private (TPO)
export const getAnalytics = asyncHandler(async (req, res) => {
  const totalStudents = await Student.countDocuments({ role: 'student' });
  const verifiedStudents = await Student.countDocuments({ role: 'student', isVerified: true });
  
  const totalJobs = await Job.countDocuments();
  
  const totalApplications = await Application.countDocuments();
  const selectedApplications = await Application.countDocuments({ status: 'Selected' });

  // Placement Rate Calculation
  const placementRate = verifiedStudents === 0 ? 0 : ((selectedApplications / verifiedStudents) * 100).toFixed(2);

  // Highest package logic (assuming package is stored as string like "12 LPA", we'd need more complex parsing)
  // For simplicity, we just aggregate the total jobs to see
  const jobs = await Job.find({}).select('package');
  
  let highestPackage = 0;
  jobs.forEach((job) => {
    // Basic extraction of numbers. E.g "12 LPA" -> 12
    const num = parseFloat(job.package.replace(/[^\d.]/g, ''));
    if (!isNaN(num) && num > highestPackage) {
      highestPackage = num;
    }
  });

  // NEW: Aggregate applications by status
  const applicationStats = await Application.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  
  // NEW: Aggregate students by branch
  const branchStats = await Student.aggregate([
    { $match: { role: 'student' } },
    { $group: { _id: "$branch", count: { $sum: 1 } } }
  ]);

  // NEW: Aggregate job applications (top 5 companies by applications)
  const topJobs = await Application.aggregate([
    { $group: { _id: "$job", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $lookup: { from: 'jobs', localField: '_id', foreignField: '_id', as: 'jobDetails' } },
    { $unwind: "$jobDetails" },
    { $project: { companyName: "$jobDetails.companyName", role: "$jobDetails.role", count: 1 } }
  ]);

  res.json({
    totalStudents,
    verifiedStudents,
    totalJobs,
    totalApplications,
    studentsPlaced: selectedApplications,
    placementRate: `${placementRate}%`,
    highestPackage: highestPackage > 0 ? `${highestPackage} LPA` : 'N/A',
    // New Advanced Stats
    applicationStats: applicationStats.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, { Applied: 0, Shortlisted: 0, Selected: 0, Rejected: 0, Withdrawn: 0 }),
    branchStats: branchStats.map(b => ({ name: b._id || 'Unspecified', students: b.count })),
    topCompanies: topJobs.map(j => ({ name: j.companyName, applications: j.count }))
  });
});

// @desc    Get Student Dashboard Analytics
// @route   GET /api/analytics/student
// @access  Private (Student)
export const getStudentAnalytics = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  // Monthly applications trend for the student
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const monthlyTrend = await Application.aggregate([
    { $match: { student: studentId, createdAt: { $gte: sixMonthsAgo } } },
    { $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 }
    }},
    { $sort: { "_id": 1 } }
  ]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Map back to proper months array filling gaps
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const trendData = [];
  
  for(let i=5; i>=0; i--) {
      let m = currentMonth - i;
      if(m <= 0) m += 12;
      const found = monthlyTrend.find(x => x._id === m);
      trendData.push({
          name: monthNames[m-1],
          applications: found ? found.count : 0
      });
  }

  // Application status distribution
  const statusDist = await Application.aggregate([
    { $match: { student: studentId } },
    { $group: { _id: "$status", value: { $sum: 1 } } }
  ]);

  const colors = {
      'Applied': '#3b82f6', // blue-500
      'Shortlisted': '#a855f7', // purple-500
      'Selected': '#10b981', // emerald-500
      'Rejected': '#ef4444', // red-500
      'Withdrawn': '#6B7280' // gray-500
  };

  const formattedStatusDist = statusDist.map(item => ({
      name: item._id,
      value: item.value,
      fill: colors[item._id] || '#6B7280'
  }));

  res.json({
    success: true,
    monthlyTrend: trendData,
    statusDistribution: formattedStatusDist
  });
});
