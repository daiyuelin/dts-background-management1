<template>
  <el-card style="height:90%">
    <div style="width:98%;height:40px;">
      <div  style="width:30%;float:left;text-align:left;padding-top:10px;height:46px">
        <span style="font-size:20px;font-weight: bold;margin-left:10px">News List</span>
      </div>
      <div style="width:30%;text-align:left;height:48px;margin-left:20px">
        <el-button @click="modifyDetail()">add+</el-button>
      </div>
      <div style="width:33%;float:right;height:48px;text-align:right;margin-right:10px" :form="searchData.search">
        <el-input style="width:200px" placeholder="fill in name" clearable v-model="searchData.search.title"></el-input>
        <el-button type="primary" icon="Search" style="margin-top:-2px" @click="handleSearch(searchData.search.title)"></el-button>
      </div>
    </div>
    <el-table :data="tableData.rows" @page-change="handleChangePage">
      <el-table-column label="Title" prop="title" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="Date" prop="dateTime" align="center"></el-table-column>
      <el-table-column label="State" prop="state" align="center"></el-table-column>
      <el-table-column label="Content" prop="content" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="Operation" align="center" width="300">
        <template #default="item">
          <el-button plain  size="small" type="text" @click="viewDetail(item)" icon="View">View</el-button>
          <el-button plain  size="small" type="text" icon="Edit" @click="modifyDetail(item)">Modify</el-button>
          <el-button size="small" type="text" plain icon="Delete" @click="handleDelete(item)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="isShow"
        title="View News"
        width="45%"
    >
      <el-form :form="formData.form" align="top" style="margin-right:50px" label-width="100px">
        <el-form-item label="Title">
          <el-input disabled :value="formData.form.title"></el-input>
        </el-form-item>
        <el-form-item label="Content">
          <el-input type="textarea" disabled :value="formData.form.content"></el-input>
        </el-form-item>
        <el-form-item label="image">
          <img v-for="hr in formData.form.filelist" :src="hr.url" :key="hr.id" height="120" width="150" />
        </el-form-item>
        <el-form-item label="Date">
          <el-input type="textarea" disabled :value="formData.form.dateTime"></el-input>
        </el-form-item>
        <el-form-item label="Cover">
          <img v-for="hr in formData.form.photolist" :src="hr.url" :key="hr.id" height="120" width="150" />
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
        v-model="isShows"
        title="News"
        width="45%"
    >
      <el-form :form="formData.form" align="top" label-width="120px">
        <el-row style="margin-top:-10px">
          <el-col :span="24">
            <el-form-item label="Title">
              <el-input v-model="formData.form.title" style="height:50px" placeholder="title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Content">
              <el-input v-model="formData.form.content" type="textarea" rows="5" placeholder="content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Upload Image">
              <el-upload list-type="picture-card" ref="pictures"
                         :file-list="formData.form.filelist"
                         action="#" :limit="10" multiple
                         accept="image/png,image/jpg,image/jpeg"
                         :http-request="uploads"
                         :on-remove="handleRemove">
                <el-icon>
                  <Plus/>
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Date">
              <el-date-picker v-model="formData.form.dateTime" type="datetime"
                              format="YYYY-MM-DD HH:mm:ss"
                              align="center"
                              value-format="YYYY-MM-DD HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Cover">
              <el-upload ref="covers"
                  list-type="picture-card"
                  :file-list="formData.form.photolist"
                  action="#" :limit="1"
                  accept="image/png,image/jpg,image/jpeg"
                  :http-request="uploadcover"
                  :on-remove="handleRemove">
                <el-icon>
                  <Plus/>
                </el-icon>
              </el-upload>
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
import { reactive, ref, onMounted } from "vue";
import {getNews,addNews,updateNews,upload} from "@/api/news"
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
let formData = reactive({
  form:{
    title:"",
    dateTime:"",
    content:"",
    stores:[],
    filelist:[],
    photolist:[],
  }
});

let isShow = ref(false);
let isShows = ref(false);
let picture = ref();
let image = ref();
let pictures = ref();
let covers = ref();

const handleSearch = (name:any) => {
  getTbaleData(name);
};
import axios from 'axios'
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "X-Token" : sessionStorage.getItem("token")||"6e925a40144cfccd6fdd2b644fe79ff4c50838dfc82676e5f9b1c6c9e169a77e455fa431b108602cf1e43394cc794fdfe3e8082320fd88384529f597884757111336e9e84b17cfc4105ee16a429fdf1cc0cad04df085420a8a7b99607f9f318b205f3f18931896f4ed751e1b56b857cab22192a792353f79ac3f020cf597f97e90fddd953c7abda69a633b43862d29cc1e6ccf8310f9560a8a7ab10d8a5f183ca96fee7437fd57065025d6f5513d99703e45d7f31604cead03722bb0e486973cac5a58ca6a24a356774451b6cfdeeb75df87e76419351e37fa64376bae87bbe49fb72fd62c5fa33720fd84baca5bb1ad3c9244f8f28eb7eb481cb902b3f3b8f087c1f9f389a6b0ad8d9d1bd899173c8d0a7c225da156989867b9970f76551aa5138d120479ec4a1e84817dd62617f824 ",
    Accept: "*/*",
  },
  withCredentials: false,
  timeout: 30000,
  validateStatus() {
    return true;
  },
  transformResponse: [
    (data) => {
      if (typeof data === "string" && data.startsWith("{")) {
        data = JSON.parse(data);
      }
      return data;
    },
  ],
});
const uploads = (file:any, fileList:any) =>{
  let size = file.file.size/1024;
  if(size>1024){
    pictures.value.clearFiles();
    ElMessage({
      message: "can not more than 1M",
      type: "warning",
    });
  }else{
    picture.value = file;
  }
};

const uploadcover = (file:any, fileList:any) =>{
  let size = file.file.size/1024;
  if(size>1024){
    covers.value.clearFiles();
    ElMessage({
      message: "can not more than 1M",
      type: "warning",
    });
  }else{
    image.value = file;
  }
};

const handleChangePage = (e: any) => {
  obj = { ...obj, ...e };
  getTbaleData();
};
const viewDetail = (item) => {
  formData.form = JSON.parse(JSON.stringify(item.row));
  formData.form.filelist = [];
  formData.form.photolist = [];
  formData.form.stores?.forEach(e=>{
    let name = e.url?.substr(e.url.lastIndexOf("/")+1);
    if(e.type==0){
      formData.form.photolist.push({name:name,url:e.url})
    }else{
      formData.form.filelist.push({name:name,url:e.url})
    }
  })
  isShow.value = true;
};

const modifyDetail = (item:any) => {
  if(item){
    formData.form = JSON.parse(JSON.stringify(item.row));
    formData.form.filelist = [];
    formData.form.photolist = [];
    formData.form.stores?.forEach(e=>{
      let name = e.url?.substr(e.url.lastIndexOf("/")+1);
      if(e.type==0){
        formData.form.photolist.push({name:name,url:e.url})
      }else{
        formData.form.filelist.push({name:name,url:e.url})
      }
    })
  }else{
    formData.form={
        title:"",
        dateTime:"",
        content:"",
        stores:[],
        filelist:[],
        photolist:[]
      };
  }
  isShows.value = true;
};

const handleDelete = (item) =>{
  if(item.row.state){
    ElMessage({
      message: "cannot delete "+item.row.state,
      type: "warning",
    });
    return;
  }
  let data = JSON.parse(JSON.stringify(item.row))
  data.deleted = true;
  updateNews(data)
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
        getTbaleData();
      });
}

const cancelOderDetail = () => {
  isShow.value = false;
  isShows.value = false;
};

const save = (item)=>{
  if(image.value && picture.value){
    upload(image.value.file.name)
        .then((res)=>{
              formData.form.photolist.push({type:0,url:res.urlImage,index:formData.form.photolist.length})
              console.log("url=",formData.form.stores);
              axiosInstance.put(res.preUrl,image.value.file,{
                headers:{
                  'Content-Type':'multipart/form-data',
                  withCredentials: true,
                  "Access-Control-Allow-Origin":'*'
                }
              }).then(res2=>{

              }).catch(c=>{})
            }
        );
    upload(picture.value.file.name)
        .then((res)=>{
              formData.form.filelist.push({type:1,url:res.urlImage,index:formData.form.filelist.length});
              axiosInstance.put(res.preUrl,picture.value.file,{
                headers:{
                  'Content-Type':'multipart/form-data',
                  withCredentials: true,
                  "Access-Control-Allow-Origin":'*'
                }
              }).then(res2=>{
                saveNews(item);
              }).catch(c=>{})
            }
        );
  }else if(image.value){
    upload(image.value.file.name)
        .then((res)=>{
              formData.form.photolist.push({type:0,url:res.urlImage,index:formData.form.photolist.length})
              console.log("url=",formData.form.stores);
              axiosInstance.put(res.preUrl,image.value.file,{
                headers:{
                  'Content-Type':'multipart/form-data',
                  withCredentials: true,
                  "Access-Control-Allow-Origin":'*'
                }
              }).then(res2=>{
                saveNews(item);
              }).catch(c=>{})
            }
        );
  }else if(picture.value){
    upload(picture.value.file.name)
        .then((res)=>{
              formData.form.filelist.push({type:1,url:res.urlImage,index:formData.form.filelist.length});
              axiosInstance.put(res.preUrl,picture.value.file,{
                headers:{
                  'Content-Type':'multipart/form-data',
                  withCredentials: true,
                  "Access-Control-Allow-Origin":'*'
                }
              }).then(res2=>{
                saveNews(item);
              }).catch(c=>{})
            }
        );
  }else{
    saveNews(item);
  }
};
let saveNews = (item)=>{
  item.type=0;
  item.stores = formData.form.photolist?.concat(formData.form.filelist);
  if(item.id){
    updateNews(item)
        .then((res) => {
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
          getTbaleData();
        });
  }else{
    addNews(item)
        .then((res) => {
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
          getTbaleData();
        });
  }
};
let tableData = reactive({
  rows: [
  ],
  total:0
});

const getTbaleData = (name:any) => {
  if(name){
    obj.currentPage = 1;
  }
  getNews({
        ...obj,
        title:name,
        type:0,
        pageNo: obj.currentPage || 1,
        pageSize: obj.pageSize || 10,
      })
      .then((res:any) => {
        tableData.rows = res.data.records as any;
        tableData.total = res.data.total
      });
};

onMounted(() => {
  getTbaleData();
});
</script>

<style scoped></style>
