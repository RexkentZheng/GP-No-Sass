import Vue from 'vue'
import Router from 'vue-router'
import CommonIndex from '@/views/common-index'
import AdminIndex from '@/views/admin-index'
import AdminAudit from '@/views/admin-audit'
import AdminAuditDetail from '@/views/admin-audit-details'
import AdminCreatStudent from '@/views/admin-creat-student'
import AdminCreatAdmin from '@/views/admin-creat-admin'
import AdminSearchCount from '@/views/admin-search-count'
import AdminSetting from '@/views/admin-setting'
import AdminStudentInfoAdd from '@/views/admin-student-info-add'
import AdminStudentInfoSearch from '@/views/admin-student-info-search'
import AdminStudentInfoExport from '@/views/admin-student-info-export'
import AdminCompanyInfoCheck from '@/views/admin-company-info-check'
import AdminCompanyInfoSearch from '@/views/admin-company-info-search'
import AdminCompanyInfoChart from '@/views/admin-company-info-chart'
import CommonJobList from '@/views/common-job-list'
import CommonJobDetails from '@/views/common-job-details'
import CommonCompanyDetails from '@/views/common-company-details'
import CommonStudentDetails from '@/views/common-student-details'
import CommonStudentChangedetails from '@/views/common-student-Changedetails'
import CommonStudentResume from '@/views/common-student-resume'
import CompanyIndex from '@/views/company-index'
import CompanyJobList from '@/views/company-job-list'
import CompanyJobChangeDetails from '@/views/company-job-changedetails'
import CompanyReceive from '@/views/company-receive'
import CompanyRegedit from '@/views/company-regedit'
import CompanyWaitting from '@/views/company-waitting'
import CompanyRefused from '@/views/company-refused'
import CompanySetting from '@/views/company-setting'
import StudentIndex from '@/views/student-index'
import StudentResume from '@/views/student-resume'
import StudentSend from '@/views/student-send'
import StudentSetting from '@/views/student-setting'


Vue.use(Router)

export default new Router({
//	mode: 'history',
	routes: [{
			path: '/',
			name: 'CommonIndex',
			component: CommonIndex
		},
		{
			path: '/admin',
			name: 'AdminIndex',
			component: AdminIndex
		},
		{
			path: '/admin/audit',
			name: 'AdminAudit',
			component: AdminAudit
		},
		{
			path: '/admin/studentInfo/',
			name: 'AdminStudentInfoAdd',
			component: AdminStudentInfoAdd
		},
		{
			path: '/admin/studentInfo/search',
			name: 'AdminStudentInfoSearch',
			component: AdminStudentInfoSearch
		},
		{
			path: '/admin/studentInfo/export',
			name: 'AdminStudentInfoExport',
			component: AdminStudentInfoExport
		},
		{
			path: '/admin/companyInfo/',
			name: 'AdminCompanyInfoCheck',
			component: AdminCompanyInfoCheck
		},
		{
			path: '/admin/companyInfo/search',
			name: 'AdminCompanyInfoSearch',
			component: AdminCompanyInfoSearch
		},
		{
			path: '/admin/companyInfo/chart',
			name: 'AdminCompanyInfoChart',
			component: AdminCompanyInfoChart
		},
		{
			path: '/admin/audit/details',
			name: 'AdminAuditDetail',
			component: AdminAuditDetail
		},
		{
			path: '/admin/creat/student',
			name: 'AdminCreatStudent',
			component: AdminCreatStudent
		},
		{
			path: '/admin/creat/admin',
			name: 'AdminCreatAdmin',
			component: AdminCreatAdmin
		},
		{
			path: '/admin/search/count',
			name: 'AdminSearchCount',
			component: AdminSearchCount
		},
		{
			path: '/admin/search/job',
			name: 'AdminSearchJob',
			component: CommonIndex
		},
		{
			path: '/admin/setting',
			name: 'AdminSetting',
			component: AdminSetting
		},
		{
			path: '/common/job/list',
			name: 'CommonJobList',
			component: CommonJobList
		},
		{
			path: '/common/job/details',
			name: 'CommonJobDetails',
			component: CommonJobDetails
		},
		{
			path: '/common/company/details',
			name: 'CommonCompanyDetails',
			component: CommonCompanyDetails
		},
		{
			path: '/common/student/details',
			name: 'CommonStudentDetails',
			component: CommonStudentDetails
		},
		{
			path: '/common/student/changeDetails',
			name: 'CommonStudentChangedetails',
			component: CommonStudentChangedetails
		},
		{
			path: '/common/student/resume',
			name: 'CommonStudentResume',
			component: CommonStudentResume
		},
		{
			path: '/company/introduce',
			name: 'CompanyIndex',
			component: CompanyIndex
		},
		{
			path: '/company/job/list',
			name: 'CompanyJobList',
			component: CompanyJobList
		},
		{
			path: '/company/job/changeDetails',
			name: 'CompanyJobChangeDetails',
			component: CompanyJobChangeDetails
		},
		{
			path: '/company/receive',
			name: 'CompanyReceive',
			component: CompanyReceive
		},
		{
			path: '/regedit',
			name: 'CompanyRegedit',
			component: CompanyRegedit
		},
		{
			path: '/company/waitting',
			name: 'CompanyWaitting',
			component: CompanyWaitting
		},
		{
			path: '/company/refused',
			name: 'CompanyRefused',
			component: CompanyRefused
		},
		{
			path: '/company/setting',
			name: 'CompanySetting',
			component: CompanySetting
		},
		{
			path: '/student/personalInfo',
			name: 'StudentIndex',
			component: StudentIndex
		},
		{
			path: '/student/resume',
			name: 'StudentResume',
			component: StudentResume
		},
		{
			path: '/student/send',
			name: 'StudentSend',
			component: StudentSend
		},
		{
			path: '/student/setting',
			name: 'StudentSetting',
			component: StudentSetting
		},
	]
})