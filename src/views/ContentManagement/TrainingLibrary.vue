<template>
  <el-card style="height:90%">
    <div style="width:98%;height:40px;">
      <div  style="width:30%;float:left;text-align:left;padding-top:10px;height:46px">
        <span style="font-size:20px;font-weight: bold;margin-left:10px">TrainingLibrary List</span>
      </div>
      <div style="width:30%;text-align:left;height:48px;margin-left:20px">
        <el-button @click="modifyDetail(null)">add+</el-button>
      </div>
      <div style="width:33%;float:right;height:48px;text-align:right;margin-right:10px" :form="searchData.search">
        <el-input style="width:200px" placeholder="fill in name" clearable v-model="searchData.search.title"></el-input>
        <el-button type="primary" icon="Search" style="margin-top:-2px" @click="handleSearch(searchData.search.title)"></el-button>
      </div>
    </div>
    <el-table :data="tableData.rows"  @page-change="handleChangePage">
      <el-table-column label="Video name" prop="name" align="center"></el-table-column>
      <el-table-column label="State" prop="state" align="center"></el-table-column>
      <el-table-column label="Display Switch" prop="Display Switch" align="center">
        <template #default="item">
          <el-switch key="switch" id="switch"
                     v-model="item.row.displaySwitch"
                     :active-value="1"
                     :inactive-value="0"
                     @click.stop="changeSwitch(item ,$event)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="item">
          <el-button plain  size="small" type="text" @click="viewDetail(item)" icon="View">View</el-button>
          <el-button plain  size="small" type="text" icon="Edit" @click="modifyDetail(item)">Modify</el-button>
          <el-button size="small" type="text" plain icon="Delete" @click="handleDelete(item)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="isShow"
        title="View TrainingLibrary"
        :width="600"
    >
      <el-form :form="formData.form" align="top" style="margin-top:5px" label-width="100px">
        <el-col :span="24">
          <el-form-item label="Video Name">
            <el-input :value="formData.form.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Video">
            <video v-for="hr in formData.form.filelist" autoplay controls loop muted
                   :key="hr" :src="hr.url" height="150"></video>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Cover">
            <el-image v-for="hr in formData.form.photolist" :src="hr.url" style="height:120px;width:150px"
                      :key="hr.url"  :preview-src-list="[hr.url]" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-dialog>
    <el-dialog
        v-model="isShows"
        title="TrainingLibrary"
        width="40%" top="20px">
      <el-form :form="formData.form" align="top" size="small" label-width="100px" style="margin:-10px 50px 0 0">
        <el-row>
          <el-col :span="24">
            <el-form-item label="title">
              <el-input v-model="formData.form.name" style="height:40px" placeholder="title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.form.filelist.length">
            <el-form-item label="Video">
              <video v-for="hr in formData.form.filelist" autoplay controls loop muted
                     :key="hr" :src="hr.url" height="150"></video>
              <a @click="handleRemove" href="javascript:void(0)"> remove</a>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-else>
            <el-form-item label="Upload File">
              <el-upload :file-list="formData.form.filelist"
                         action="#" :limit="1" :show-file-list="true"
                         accept=".mp4" ref="videos"
                         :http-request="uploads"
                         :on-remove="handleRemove">
                <img src="@/assets/img.png"/>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Cover">
              <el-upload
                  list-type="picture-card" ref="covers"
                  :file-list="formData.form.photolist"
                  action="#" :limit="1" multiple
                  accept="image/png,image/jpg,image/jpeg"
                  :on-preview="onPreview"
                  :http-request="uploadcover"
                  :on-remove="handleRemoveCover">
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
    <el-dialog v-model="preview" title="perview"
               width="40%" top="20px">
        <el-row>
          <img width="600" height="500" ref="previewImg" :src="picurl"/>
        </el-row>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import {getTrainingLibrary,addTL,updateTL,upload} from "@/api/news"
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
    displaySwitch:0,
    fileUris:"",
    filelist:[],
    photolist:[]
  }
});

let isShow = ref(false);
let isShows = ref(false);
let preview = ref(false);
let picurl = ref("");
const onPreview = (file:any,fileList:any)=>{
  picurl.value = file.url;
  preview.value=true;
};
let video = reactive({
    file:{file:{name:'',url:''}},
    type:''
});
let image = reactive({
  file:{file:{name:'',url:''}},
  type:''
});
let videos = ref();
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
  let size = file.file.size/1024/1024;
  if(size>10){
    videos.value.clearFiles();
    ElMessage({
      message: "can not more than 10M",
      type: "warning",
    });
  }else{
    video.file = file;
    video.type = 'add'
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
    image.file = file;
    image.type = 'add'
  }
};
const handleRemove = (file: any,fileList: any)=>{
  formData.form.filelist = [];
  video.file = file;
  video.type = 'del'
};
const handleRemoveCover = (file: any,fileList: any)=>{
  formData.form.photolist = [];
  image.file = file;
  image.type = 'del'
};
const handleChangePage = (e: any) => {
  obj = { ...obj, ...e };
  getTbaleData(null);
};
const viewDetail = (item:any) => {
  formData.form = JSON.parse(JSON.stringify(item.row));
  formData.form.filelist = [];
  formData.form.photolist = [];
  if(formData.form.fileUris){
    let arr = formData.form.fileUris?.split(",");
    arr.forEach((e:any)=>{
      let name = e?.substr(e.lastIndexOf("/")+1);
      let oct = {name:name,url:e};
      if(e.endsWith("mp4")){
        formData.form.filelist.push(oct);
      }else{
        formData.form.photolist.push(oct);
      }
    })
  }
  isShow.value = true;
};

const modifyDetail = (item:any) => {
  if(item){
    formData.form = JSON.parse(JSON.stringify(item.row));
    formData.form.filelist = [];
    formData.form.photolist = [];
    if(formData.form.fileUris){
      let arr = formData.form.fileUris?.split(",");
      arr.forEach((e:any)=>{
        let name = e?.substr(e.lastIndexOf("/")+1);
        let oct:any = {name:name,url:e};
        if(name.endsWith("mp4")){
            formData.form.filelist=[oct];
            filelist.value=[oct]
        }else{
            formData.form.photolist=[oct];
            photolist.value=[oct];
        }
      })
    }
  }else{
    formData.form={
        title:"",
        dateTime:"",
        displaySwitch:0,
        fileUris:"",
        filelist:[],
        photolist:[]
      };
  }
  isShows.value = true;
};

const handleDelete = (item:any) =>{
  if(item.row.state){
    ElMessage({
      message: "cannot delete "+item.row.state,
      type: "warning",
    });
    return;
  }
  let data = JSON.parse(JSON.stringify(item.row))
  data.deleted = true;
  updateTL(data)
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
};
const changeSwitch = (item:any,bool:any)=>{
  let row = JSON.parse(JSON.stringify(item.row))
  updateTL(row)
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
};
let filelist = ref([]);
let photolist = ref([]);

const save = (item:any)=>{
  console.log("image=",image ,photolist.value,"video=",video,filelist.value)
  if(image.type && video.type){
    if(image.type=='add'){
      upload(image.file.file.name)
          .then((res:any)=>{
                let name = res.urlImage?.substr(res.urlImage.lastIndexOf("/")+1);
                let oct = {name:name,url:res.urlImage};
                photolist.value=[oct];
                axiosInstance.put(res.preUrl,image.file.file,{
                  headers:{
                    'Content-Type':'multipart/form-data',
                    withCredentials: true,
                    "Access-Control-Allow-Origin":'*'
                  }
                }).then(res2=>{

                }).catch(c=>{})
              }
          );
    }else if(image.type=='del'){
      photolist.value=[];
    }
    if(video.type=="add"){
      upload(video.file.file.name)
          .then((res:any)=>{
                let name = res.urlImage?.substr(res.urlImage.lastIndexOf("/")+1);
                let oct = {name:name,url:res.urlImage};
                filelist.value=[oct];
                axiosInstance.put(res.preUrl,video.file.file,{
                  headers:{
                    'Content-Type':'multipart/form-data',
                    withCredentials: true,
                    "Access-Control-Allow-Origin":'*'
                  }
                }).then(res2=>{
                  saveTL(item);
                })
              }
          );
    }else if(video.type=='del'){
      filelist.value =[];
      saveTL(item);
    }
  }else if(image.type){
    if(image.type=='add'){
      upload(image.file.file.name)
          .then((res:any)=>{
                let name = res.urlImage?.substr(res.urlImage.lastIndexOf("/")+1);
                let oct = {name:name,url:res.urlImage};
                photolist.value=[oct]
                axiosInstance.put(res.preUrl,image.file.file,{
                  headers:{
                    'Content-Type':'multipart/form-data',
                    withCredentials: true,
                    "Access-Control-Allow-Origin":'*'
                  }
                }).then(res2=>{
                  saveTL(item);
                }).catch(c=>{})
              }
          );
    }else if(image.type=='del'){
      photolist.value=[];
      saveTL(item);
    }
  }else if(video.type){
    if(video.type=='add'){
      upload(video.file.file.name)
          .then((res:any)=>{
                let name = res.urlImage?.substr(res.urlImage.lastIndexOf("/")+1);
                let oct = {name:name,url:res.urlImage};
                filelist.value=[oct];
                axiosInstance.put(res.preUrl,video.file.file,{
                  headers:{
                    'Content-Type':'multipart/form-data',
                    withCredentials: true,
                    "Access-Control-Allow-Origin":'*'
                  }
                }).then(res2=>{
                  saveTL(item);
                })
              }
          );
    }else if(video.type=='del'){
      filelist.value=[];
    }
    }else{
    saveTL(item);
  }
};
const saveTL=(item:any)=>{
  console.log("image=",image.type ,photolist.value,"video=",video.type,filelist.value)
  item.type=1;
  let arr = photolist.value?.concat(filelist.value);
  item.fileUris = "";
  arr.forEach((e:any)=>{
    if(item.fileUris){
      item.fileUris+=","+e.url;
    }else{
      item.fileUris=e.url;
    }
  })
  if(item.id){
    updateTL(item)
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
          image.file = {file:{name:'',url:''}};
          image.type = '';
          video.file = {file:{name:'',url:''}};
          video.type = '';
          getTbaleData(null);
        });
  }else{
    item.displaySwitch = 0;
    addTL(item)
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
          image.file = {file:{name:'',url:''}};
          image.type = '';
          video.file = {file:{name:'',url:''}};
          video.type = '';
          getTbaleData(null);
        });
  }
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
  getTrainingLibrary({
        ...obj,
        title:name,
        type:1,
        pageNo: obj.currentPage || 1,
        pageSize: obj.pageSize || 10,
      })
      .then((res:any) => {
        tableData.rows = res.data.records as any;
        tableData.total = res.data.total
      });
};

onMounted(() => {
  getTbaleData(null);
});
</script>

<style scoped></style>
