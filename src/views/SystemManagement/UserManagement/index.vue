<template>
  <el-card style="height:100%">
    <div style="width:98%;height:40px;">
      <div  style="width:30%;float:left;text-align:left;padding-top:10px;height:46px">
        <span style="font-size:20px;font-weight: bold;margin-left:10px">User Management</span>
      </div>
      <div style="width:30%;text-align:left;height:48px;margin-left:20px">
        <el-button @click="modifyDetail()">add+</el-button>
      </div>
      <div style="width:80%;float:right;height:48px;text-align:right;margin-right:10px" :form="searchData">
        <el-input style="width:200px" placeholder="fill in name" clearable v-model="searchData.displayName"></el-input>
        <el-button type="primary" :icon="Search" style="margin-top:-2px" @click="handleSearch(searchData.displayName)"></el-button>
      </div>
    </div>
    <el-table :data="tableData.rows" @page-change="handleChangePage" height="450" :header-cell-style="{'text-align':'center'}">
      <el-table-column label="Name" prop="displayName" align="center"></el-table-column>
      <el-table-column label="Account" prop="uid" align="center"></el-table-column>
      <el-table-column label="Department" prop="department" align="center"></el-table-column>
      <el-table-column label="Mailbox" prop="email" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="RoleNames" prop="roleIds" align="center" width="240">
        <template v-slot="scope">
                  <span v-for="(id,index) in scope.row.roleIds">
                    <span v-if="index===0">{{roleData.roleName[id]}}</span>
                    <span v-else> , {{roleData.roleName[id]}}</span>
                  </span>
        </template>
      </el-table-column>
      <el-table-column width="280" align="center">
        <template #default="scope">
          <el-button plain size="small" type="text" @click="viewDetail(scope)" icon="view">View</el-button>
          <el-button plain size="small"  type="text" icon="edit" @click="modifyDetail(scope)">Modify</el-button>
          <el-button size="small" type="text" plain icon="delete" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationBox">
      <el-pagination background
           v-model:currentPage="obj.currentPage"
           v-model:page-size="obj.pageSize"
           layout="total,prev, pager, next,"
           :total="tableData.total || 0"
           @size-change="handleChangePage"
           @current-change="handleChangePage"
      />
    </div>
    <el-dialog
      v-model="isShow"
      title="View User"
      :width="600"
      @close="isShow = false"
    >
      <el-form :form="formData.form" align="top" label-width="100px" style="margin-right:50px">
        <el-form-item label="Name:">
          <el-input :value="formData.form.displayName" disabled></el-input>
        </el-form-item>
        <el-form-item label="Account:">
          <el-input :value="formData.form.uid" disabled></el-input>
        </el-form-item>
        <el-form-item label="Department:">
          <el-input :value="formData.form.department" disabled></el-input>
        </el-form-item>
        <el-form-item label="Mailbox:">
          <el-input :value="formData.form.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="Roles:">
          <span v-for="(id,index) in formData.form.roleIds">
          <span v-if="index===0">{{roleData.roleName[id]}}</span>
          <span v-else> , {{roleData.roleName[id]}}</span>
        </span>
        </el-form-item>
          <div style="text-align:right;width:100%">
            <el-button  @click="isShow = false">Cancel</el-button>
          </div>
      </el-form>
    </el-dialog>
    <el-dialog v-model="isShows"
      title="User" :width="600"
      @close="isShows = false"
    >
      <el-form ref="form" :form="formData.form" :model="formData.form" :rules="formRules">
        <el-row style="margin-top:-10px">
          <el-col :span="24">
            <el-form-item label="Name" label-width="100px">
              <el-input v-model="formData.form.displayName" style="height:50px" placeholder="Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Account"  prop="uid" label-width="100px">
              <el-input v-model="formData.form.uid" style="height:50px" placeholder="Account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Department" label-width="100px">
              <el-input v-model="formData.form.department" style="height:50px" placeholder="Department"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Mailbox" label-width="100px">
              <el-input v-model="formData.form.email" style="height:50px" placeholder="Mailbox"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.form.id">
            <el-form-item label="Role" label-width="100px">
              <el-select style="width:100%" size="large" multiple v-model="formData.form.roleIds">
                <el-option v-for="role in roleData.roles" :key="role.id" :value="role.id" :label="role.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style="text-align:right;width:100%">
            <el-button  @click="isShows = false">Cancel</el-button>
            <el-button type="primary" @click="save(formData.form)">Submit</el-button>
          </div>
        </el-row>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import {getUsers,getRoles,addUser,updateUser} from "@/api/user"
import { reactive, ref, onMounted } from "vue";
import {Delete, View, EditPen, Hide, Search} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
let obj = reactive({
  currentPage: 1,
  pageSize: 10,
});
let searchData = reactive({
  search:{
    displayName:"",
  }
});
const formRules={
  uid:[
    { required:true,message:'请输入合法的用户名',trigger:"blur"},
  ]
};
let formData = reactive({
  form:{
    displayName:"",
    uid:"",
    department:"",
    email:"",
    roleIds:[],
    ids:[],
    status:"Enabled",
  }
});

let isShow = ref(false);
let isShows = ref(false);

const handleSearch = (name:any) => {
  getTbaleData(name);
};

const handleChangePage = (e: any) => {
  obj = { ...obj, ...e };
  getTbaleData(null);
};

const columns = [
  {
    name: "displayName",
    label: "Name",
  },
  {
    name: "uid",
    label: "Account",
  },
  {
    name: "department",
    label: "Department",
  },
  {
    name: "email",
    label: "Mailbox",
    overflowHide:true,
  },
];
const viewDetail = (item:any) => {
  formData.form = JSON.parse(JSON.stringify(item.row));
  isShow.value = true;
};

const modifyDetail = (item:any) => {
  if(item){
    formData.form = JSON.parse(JSON.stringify(item.row));
  }else{
    formData.form = {
        displayName:"",
        uid:"",
        department:"",
        email:"",
        roleIds:[],
        ids:[],
        status:"Enabled",
      }
  }
  console.log( formData.form);
  isShows.value = true;
};

const handleDelete = (item:any) =>{
  let data = JSON.parse(JSON.stringify(item.row))
  data.deleted = true;
  updateUser(data)
      .then((res:any) => {
        if(res.status=="200"){
          ElMessage({
            message: "success",
            type: "success",
          });
        }else{
          ElMessage({
            message: res.msg,
            type: "error",
          });
        }
        getTbaleData(null);
      });
}

// const cancelOderDetail = () => {
//   isShow.value = false;
//   isShows.value = false;
// };
const form = ref()
const save = (item:any)=>{
  form.value.validate((valid:any)=>{
    if(valid){
      if(item.id){
        updateUser(item)
            .then((res:any) => {
              if(res.status=="200"){
                ElMessage({
                  message: "success",
                  type: "success",
                });
              }else{
                ElMessage({
                  message: res.msg,
                  type: "error",
                });
              }
              isShows.value = false;
              getTbaleData(null);
            });
      }else{
        addUser(item)
            .then((res:any) => {
              if(res.status=="200"){
                ElMessage({
                  message: "success",
                  type: "success",
                });
              }else{
                ElMessage({
                  message: res.msg,
                  type: "error",
                });
              }
              isShows.value = false;
              getTbaleData(null);
            });
      }
    }
  })

};
let tableData = reactive({
  rows: [
  ],
  total:0
});

let roleData = reactive({
  roles: [
  ],
  roleName:{type:String}
});

const getTbaleData = (name:any) => {
  if(name){
    obj.currentPage = 1;
  }
  getUsers({
        ...obj,
        displayName:name,
        pageNo: obj.currentPage || 1,
        pageSize: obj.pageSize || 10,
      })
      .then((res:any) => {
        tableData.rows = res.data.records as any;
        tableData.total = res.data.total
      });
};
const getAllRoles = ()=>{
  getRoles({
        pageNo: obj.currentPage || 1,
        pageSize: obj.pageSize || 100,
      })
      .then((res:any) => {
        roleData.roles = res.data.records as any;
        res.data.records.forEach((e:any)=>{
          roleData.roleName[e.id] = e.name || null
        })
      });
}
onMounted(() => {
  getTbaleData(null);
  getAllRoles();
});
</script>

<style scoped></style>
