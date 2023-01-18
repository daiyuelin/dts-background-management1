<template>
  <el-card style="height:100%">
    <div style="width:98%;height:40px;">
      <div  style="width:30%;float:left;text-align:left;padding-top:10px;height:46px">
        <span style="font-size:20px;font-weight: bold;margin-left:10px">Role List</span>
      </div>
      <div style="width:30%;text-align:left;height:48px;margin-left:20px">
        <el-button @click="modifyDetail()">add+</el-button>
      </div>
      <div style="width:33%;float:right;height:48px;text-align:right;margin-right:10px" :form="searchData.search">
        <el-input style="width:200px" placeholder="fill in RoleName" clearable v-model="searchData.search.name"></el-input>
        <el-button type="primary" :icon="Search" style="margin-top:-2px" @click="handleSearch(searchData.search.name)"></el-button>
      </div>
    </div>
    <el-table :data="tableData.rows" @page-change="handleChangePage" height="450" :header-cell-style="{'text-align':'center'}">
      <el-table-column label="RoleName" prop="name" align="center"></el-table-column>
      <el-table-column label="CreationTime" prop="createTime" align="center"></el-table-column>
      <el-table-column label="Describe" prop="description" align="center"></el-table-column>
      <el-table-column label="Operation" align="center" width="400">
        <template #default="item">
          <el-button plain
                     size="small"
                     type="text"
                     @click="viewDetail(item)"
                     icon="view"
          >View</el-button>
          <el-button plain
                     size="small"
                     type="text"
                     icon="edit"
                     @click="modifyDetail(item)"
          >Modify</el-button>
          <el-button size="small" type="text" plain icon="Delete" @click="handleDelete(item)">Delete</el-button>
          <el-button size="small" type="text" plain icon="Setting" @click="handleConfig(item)">Config</el-button>
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
        title="View Role"
        :width="600"
    >
      <el-form :form="formData.form" label-width="100px" style="margin-right:50px">
        <el-row style="margin-top:-10px;margin-left:50px">
          <el-col :span="24">
            <el-form-item label="RoleName">
              <el-input v-model="formData.form.name" :disabled="true"  style="height:50px;width:480px" placeholder="roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Describe">
              <el-input type="area" :disabled="true"  style="height:100px;width:480px" v-model="formData.form.description" placeholder="describe"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style="text-align:right;width:100%">
            <el-button  @click="isShow = false">Cancel</el-button>
          </div>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
        v-model="isShows"
        title="Role"
        :width="600"
    >
      <el-form :form="formData.form" align="top" label-width="100px" style="margin-right:50px">
        <el-row style="margin-top:-10px;margin-left:50px">
          <el-col :span="24">
            <el-form-item label="RoleName">
              <el-input v-model="formData.form.name" style="height:50px;width:480px" placeholder="roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Describe">
              <el-input type="area" style="height:100px;width:480px" v-model="formData.form.description" placeholder="describe"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style="text-align:right;width:100%">
            <el-button  @click="isShows = false">Cancel</el-button>
            <el-button type="primary" @click="saveRole(formData.form)">Submit</el-button>
          </div>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
        v-model="configShow"
        title="Configure Permissions"
        :width="700"
    >
      <el-form :form="formData.form" label-width="100px" style="margin:0 10px">
        <el-row style="margin-top:-10px">
          <el-col :span="24">
            <el-form-item label="RoleName:">
              <span style="font-weight:bold">{{formData.form.name}}</span>
            </el-form-item>
          </el-col>
<!--          <el-col :span="24" style="margin-top:-10px"> -->
<!--            <span >permissions</span>-->
<!--          </el-col>-->
        </el-row>
        <el-card style="width:100%;margin-top:10px">
          <el-row>
            <el-col :span="24" v-for="perm in permissionList.rows">
              <div style="width:100%;font-weight: bold">{{perm.name}}</div>
                <div style="float:left;margin-top:10px;width:135px;padding-bottom:10px;border-bottom:1px dotted grey;margin-bottom:10px " v-for="p in perm.actions">
                  <div style="float:left;margin-left:30px;margin-top:10px">{{ p.name }}</div>
                  <el-switch style="float:left;margin-left:10px;"
                    v-model="p.status"
                    :active-value="1"
                    :inactive-value="0"
                >
                </el-switch></div>
            </el-col>
          </el-row>
          <el-row>
            <div style="text-align:right;width:100%">
              <el-button  @click="configShow = false">Cancel</el-button>
              <el-button type="primary" @click="savePermission(permissionList.rows,formData.form)">Submit</el-button>
            </div>
          </el-row>
        </el-card>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import {getRoles,addRole,updateRole,getAllPermission} from "@/api/user"
import {Delete, View, EditPen, Hide, Search,Setting} from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
let obj = reactive({
  currentPage: 1,
  pageSize: 10,
});
let searchData = reactive({
  search:{
    name:"",
  }
});
let formData = reactive({
  form:{
    name:"",
    description:"",
    status:"Enabled",
    permissions:[]
  }
});

let isShow = ref(false);
let isShows = ref(false);
let configShow = ref(false);

const handleSearch = (name:any) => {
  getTbaleData(name);
};

const handleChangePage = (e: any) => {
  obj = { ...obj, ...e };
  getTbaleData(null);
};

const viewDetail = (item:any) => {
  formData.form = JSON.parse(JSON.stringify(item.row));
  isShow.value = true;
};
const handleConfig = (item:any) => {
  formData.form = JSON.parse(JSON.stringify(item.row));
  permissionList.rows = JSON.parse(JSON.stringify(permissionList.standard));
  if(!formData.form.permissions){
    formData.form.permissions = permissionList.standard;
  }else{
    permissionList.rows.forEach((e:any)=>{
      formData.form.permissions.forEach((f:any)=>{
        if(e.code==f.code){
          e.actions.forEach((i:any)=>{
            f.actions.forEach((j:any)=>{
              if(i.code==j.code){
                i.status =1;
              }
            })
          })
        }
      })
    })
    formData.form.permissions = permissionList.rows;
  }
  configShow.value = true;
};

const modifyDetail = (item:any) => {
  if(item){
    formData.form = JSON.parse(JSON.stringify(item.row));
  }else{
    formData.form={
        name:"",
        description:"",
        status:"Enabled",
        permissions:[]
      };
  }
  isShows.value = true;
};

const handleDelete = (item:any) =>{
  console.log(item,"item=")
  let data = JSON.parse(JSON.stringify(item.row))
  data.deleted = true;
  updateRole(data)
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

const cancelOderDetail = () => {
  isShow.value = false;
  isShows.value = false;
  configShow.value = false;
};

const saveRole = (item:any)=>{
  item.permissions = null;
  if(item.id){
    updateRole(item)
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
    addRole(item)
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
};

const savePermission = (item:any,form:any)=>{
  let jsn:any=JSON.parse(JSON.stringify(item))
  console.log(item)
  for(let p=jsn.length-1;p>=0;p--){
    let cr = jsn[p];
    for(let a=cr.actions.length-1;a>=0;a--){
      if(cr.actions[a].status==0){
        cr.actions.splice(a,1);
      }else{
        delete cr.actions[a].id;
        delete cr.actions[a].createTime;
        delete cr.actions[a].createUser;
        delete cr.actions[a].updateTime;
        delete cr.actions[a].updateUser;
      }
    }
    if(cr.actions.length==0){
      jsn.splice(p,1);
    }else{
      delete cr.id;
      delete cr.createTime;
      delete cr.createUser;
      delete cr.updateTime;
      delete cr.updateUser;
    }
  }
  form.permissions = jsn;
  delete form.createTime;
  delete form.updateTime;
  updateRole(form)
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
        configShow.value = false;
        getTbaleData(null);
      });
}
let tableData = reactive({
  rows: [
  ],
  total:0
});

const getTbaleData = (name:any) => {
  if(name){
    obj.currentPage = 1;
  }
  getRoles({
        ...obj,
        name:name,
        pageNo: obj.currentPage || 1,
        pageSize: obj.pageSize || 10,
      })
      .then((res:any) => {
        let rows:any=[];
        res.data.records?.forEach((e:any)=>{
          e.createTime = e.createTime?.substring(0,10);
          rows.push(e);
        })
        tableData.rows = rows;
        tableData.total = res.data.total
      });
};
let permissionList = reactive({
  standard: [
  ],
  rows: [
  ],
});
const getPermissions = () => {
  getAllPermission()
      .then((res:any) => {
        res.data?.forEach((e:any)=>{
          delete e.id;
          delete e.createTime;
          delete e.createUser;
          delete e.updateTime;
          delete e.updateUser;
          e.actions.forEach((a:any)=>{
            delete a.id;
            delete a.createTime;
            delete a.createUser;
            delete a.updateTime;
            delete a.updateUser;
            a.status = 0;
            a.permissionCode = e.name;
          })
        })
        permissionList.standard = res.data;
        permissionList.rows = res.data;
      });

};
onMounted(() => {
  getTbaleData(null);
  getPermissions();
});
</script>

<style scoped></style>
