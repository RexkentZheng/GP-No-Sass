<template>
	<div>
		<admin-header></admin-header>
		<div class="container admin-companyInfo-chart">
			<div class="contain-body">
				<div class="company-info-title clearfix">
					<ul class="clearfix">
						<li>
							<router-link  to='/admin/companyInfo'>审核列表</router-link>
						</li>
						<li>
							<router-link to='/admin/companyInfo/search'>企业查找</router-link>
						</li>
						<li>
							<router-link class="active" to='/admin/companyInfo/chart'>信息概况</router-link>
						</li>
					</ul>
				</div>
        <div class="chart-title clearfix">
					<ul>
						<li v-bind:class="{'active':activeName=='职位地域'}" ref="location"  @click="getJobLocation">
							职位地域
						</li>
						<li v-bind:class="{'active':activeName=='职位类别'}" ref="type"  @click="getJobType">
							职位类别
						</li>
					</ul>
				</div>
				<div class='chart-list'>
					<admin-job-type-chart v-if='jobTypeFlag' :jobTypeInfo = 'jobTypeInfo'></admin-job-type-chart>
					<admin-job-location-chart v-if='jobLocationFlag' :jobLocationInfo = 'jobLocationInfo'></admin-job-location-chart>
				</div>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import AdminHeader from './../components/AdminHeader'
	import CommonFooter from './../components/CommonFooter'
	import AdminJobTypeChart from './../components/AdminJobTypeChart'
	import AdminJobLocationChart from './../components/AdminJobLocationChart'
	import './../assets/css/bootstrap.min.css'
	import './../assets/css/common.css'
	import './../assets/css/style.css'
	import axios from 'axios'
	
	export default{
		data(){
			return{
        activeName:'职位地域',
        jobList:[],
				jobTypeInfo:[],
				jobLocationInfo:[],
				jobTypeFlag:false,
				jobLocationFlag:false
			}
		},
		mounted(){
      this.getAlljobs();
		},
		components:{
			AdminHeader,
			CommonFooter,
			AdminJobTypeChart,
			AdminJobLocationChart
		},
		methods:{
      getAlljobs() {
				this.jobTypeInfo = [];
				axios.get('/job/list').then((response) => {
					let res = response.data;
					if(res.status == 0) {
						this.jobList = res.result;
						this.getJobLocation();
					} else {
						this.jobList = [];
					}
				})
			},
      getJobType(){
        let jobTypeInfo = [];
        this.jobList.forEach((op)=>{
          if(jobTypeInfo.length > 0){
            let isInside = false;
            for(var og of jobTypeInfo){
              if(og.name === op.jobTypeFirst){
                isInside = true;
              }
            }
            if(!isInside){
              jobTypeInfo.push({name:op.jobTypeFirst,children:[]});
            }
          }else{
            jobTypeInfo.push({name:op.jobTypeFirst,children:[]});
          }
        })
        for(var og of jobTypeInfo){
          this.jobList.forEach((op)=>{
            if(op.jobTypeFirst === og.name){
              if(og.children.length > 0){
                let isInside = false;
                og.children.forEach((oc)=>{
                  if(oc.name === op.jobTypeSecond){
                    isInside = true;
                  }
                })
                if(!isInside){
                  og.children.push({name:op.jobTypeSecond,children:[]})
                }
              }else{
                og.children.push({name:op.jobTypeSecond,children:[]})
              }              
            }
          })
        }
				for(var og of jobTypeInfo){
					for(var oa of og.children){
						this.jobList.forEach((op)=>{
							if(op.jobTypeSecond === oa.name){
								if(oa.children.length > 0){
									let isInside = false;
									oa.children.forEach((ob)=>{
										if(ob.name === op.jobTypeThird){
											isInside = true;
										}
									})
									if(!isInside){
										oa.children.push({name:op.jobTypeThird,children:[{name:op.jobName}]})
									}
								}else{
									oa.children.push({name:op.jobTypeThird,children:[{name:op.jobName}]})
								}
							}
						})
					}
				}
				this.jobTypeInfo = jobTypeInfo;
				this.jobLoactionFlag = false;
				this.jobTypeFlag = true;
        this.activeName = this.$refs.type.innerText; 
      },
			getJobLocation(){
				this.jobLocationInfo = [];
				let jobLocationInfo = [];
				this.jobList.forEach((op)=>{
					if(jobLocationInfo.length > 0){
						let isInside = false;
						for(var og of jobLocationInfo){
							if(op.jobLoaction.jobProvince === og.name){
								og.value++;
								isInside = true;
							}
						};
						if(!isInside){
							jobLocationInfo.push({name:op.jobLoaction.jobProvince,value:1})
						}
					}else{
						jobLocationInfo.push({name:op.jobLoaction.jobProvince,value:1})
					}
				})
				this.jobLocationInfo = jobLocationInfo;
				this.jobLocationFlag = true;
				this.jobTypeFlag = false;
        this.activeName = this.$refs.location.innerText; 
			}
		}
	}
</script>
