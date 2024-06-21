<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div v-if="showFlag">
      <el-form :inline="true" :model="searchForm" class="form-content">
        <el-row :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">
                <el-form-item :label="contents.inputTitle == 1 ? '身体状况' : ''">
                  <el-input v-if="contents.inputIcon == 1 && contents.inputIconPosition == 1" prefix-icon="el-icon-search" v-model="searchForm.shentizhuangkuang" placeholder="身体状况" clearable></el-input>
                  <el-input v-if="contents.inputIcon == 1 && contents.inputIconPosition == 2" suffix-icon="el-icon-search" v-model="searchForm.shentizhuangkuang" placeholder="身体状况" clearable></el-input>
                  <el-input v-if="contents.inputIcon == 0" v-model="searchForm.shentizhuangkuang" placeholder="身体状况" clearable></el-input>
                </el-form-item>
          <el-form-item>
            <el-button v-if="contents.searchBtnIcon == 1 && contents.searchBtnIconPosition == 1" icon="el-icon-search" type="success" @click="search()">{{ contents.searchBtnFont == 1?'查询':'' }}</el-button>
            <el-button v-if="contents.searchBtnIcon == 1 && contents.searchBtnIconPosition == 2" type="success" @click="search()">{{ contents.searchBtnFont == 1?'查询':'' }}<i class="el-icon-search el-icon--right"/></el-button>
            <el-button v-if="contents.searchBtnIcon == 0" type="success" @click="search()">{{ contents.searchBtnFont == 1?'查询':'' }}</el-button>
          </el-form-item>
        </el-row>
        <el-row class="ad" :style="{justifyContent:contents.btnAdAllBoxPosition=='1'?'flex-start':contents.btnAdAllBoxPosition=='2'?'center':'flex-end'}">
          <el-form-item>
            <el-button
              v-if="isAuth('shujucaiji','新增') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 1"
              type="success"
              icon="el-icon-plus"
              @click="addOrUpdateHandler()"
            >{{ contents.btnAdAllFont == 1?'新增':'' }}</el-button>
            <el-button
              v-if="isAuth('shujucaiji','新增') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 2"
              type="success"
              @click="addOrUpdateHandler()"
            >{{ contents.btnAdAllFont == 1?'新增':'' }}<i class="el-icon-plus el-icon--right" /></el-button>
            <el-button
              v-if="isAuth('shujucaiji','新增') && contents.btnAdAllIcon == 0"
              type="success"
              @click="addOrUpdateHandler()"
            >{{ contents.btnAdAllFont == 1?'新增':'' }}</el-button>
            <el-button
              v-if="isAuth('shujucaiji','删除') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 1 && contents.tableSelection"
              :disabled="dataListSelections.length <= 0"
              type="danger"
              icon="el-icon-delete"
              @click="deleteHandler()"
            >{{ contents.btnAdAllFont == 1?'删除':'' }}</el-button>
            <el-button
              v-if="isAuth('shujucaiji','删除') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 2 && contents.tableSelection"
              :disabled="dataListSelections.length <= 0"
              type="danger"
              @click="deleteHandler()"
            >{{ contents.btnAdAllFont == 1?'删除':'' }}<i class="el-icon-delete el-icon--right" /></el-button>
            <el-button
              v-if="isAuth('shujucaiji','删除') && contents.btnAdAllIcon == 0 && contents.tableSelection"
              :disabled="dataListSelections.length <= 0"
              type="danger"
              @click="deleteHandler()"
            >{{ contents.btnAdAllFont == 1?'删除':'' }}</el-button>

	    <download-excel v-if="isAuth('shujucaiji','导出')" class = "export-excel-wrapper" :data = "dataList" :fields = "json_fields" name = "数据采集.xls">
		      <!-- 导出excel -->
            	<el-button
              	v-if="contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 1"
              	type="primary"
              	icon="el-icon-download"
            	>{{ contents.btnAdAllFont == 1?'导出':'' }}</el-button>
            	<el-button
              	v-if="contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 2"
              	type="primary"
            	>{{ contents.btnAdAllFont == 1?'导出':'' }}<i class="el-icon-download el-icon--right" /></el-button>
            	<el-button
              	v-if="contents.btnAdAllIcon == 0"
              	type="primary"
            	>{{ contents.btnAdAllFont == 1?'导出':'' }}</el-button>
       	    </download-excel>
            <el-button
              v-if="isAuth('shujucaiji','打印') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 1"
              type="success"
              icon="el-icon-printer"
              @click="printJson"
            >{{ contents.btnAdAllFont == 1?'打印':'' }}</el-button>
            <el-button
              v-if="isAuth('shujucaiji','打印') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 2"
              type="success"
              @click="printJson"
            >{{ contents.btnAdAllFont == 1?'打印':'' }}<i class="el-icon-printer el-icon--right" /></el-button>
            <el-button
              v-if="isAuth('shujucaiji','打印') && contents.btnAdAllIcon == 0"
              type="success"
              @click="printJson"
            >{{ contents.btnAdAllFont == 1?'打印':'' }}</el-button>

            <el-button
              v-if="isAuth('shujucaiji','报表') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 1"
              type="warning"
              icon="el-icon-s-data"
              @click="chartDialog()"
            >{{ contents.btnAdAllFont == 1?'统计报表':'' }}</el-button>
            <el-button
              v-if="isAuth('shujucaiji','报表') && contents.btnAdAllIcon == 1 && contents.btnAdAllIconPosition == 2"
              type="warning"
              @click="chartDialog()"
            >{{ contents.btnAdAllFont == 1?'统计报表':'' }}<i class="el-icon-s-data el-icon--right" /></el-button>
            <el-button
              v-if="isAuth('shujucaiji','报表') && contents.btnAdAllIcon == 0"
              type="warning"
              @click="chartDialog()"
            >{{ contents.btnAdAllFont == 1?'统计报表':'' }}</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="table-content">
        <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
            :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle"
            :border="contents.tableBorder"
            :fit="contents.tableFit"
            :stripe="contents.tableStripe"
            :row-style="rowStyle"
            :cell-style="cellStyle"
            :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
            v-if="isAuth('shujucaiji','查看')"
            :data="dataList"
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandler">
            <el-table-column  v-if="contents.tableSelection"
                type="selection"
                header-align="center"
                align="center"
                width="50">
            </el-table-column>
            <el-table-column label="索引" v-if="contents.tableIndex" type="index" width="50" />
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                    prop="jinqizhuzhi"
                    header-align="center"
		    label="近期住址">
		     <template slot-scope="scope">
                       {{scope.row.jinqizhuzhi}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                    prop="jiatingzhuzhi"
                    header-align="center"
		    label="家庭住址">
		     <template slot-scope="scope">
                       {{scope.row.jiatingzhuzhi}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                    prop="tiwen"
                    header-align="center"
		    label="体温">
		     <template slot-scope="scope">
                       {{scope.row.tiwen}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                    prop="shentizhuangkuang"
                    header-align="center"
		    label="身体状况">
		     <template slot-scope="scope">
                       {{scope.row.shentizhuangkuang}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                    prop="dengjishijian"
                    header-align="center"
		    label="登记时间">
		     <template slot-scope="scope">
                       {{scope.row.dengjishijian}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                    prop="gonghao"
                    header-align="center"
		    label="工号">
		     <template slot-scope="scope">
                       {{scope.row.gonghao}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                    prop="jiaoshixingming"
                    header-align="center"
		    label="教师姓名">
		     <template slot-scope="scope">
                       {{scope.row.jiaoshixingming}}
                     </template>
                </el-table-column>
                <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                    prop="xingbie"
                    header-align="center"
		    label="性别">
		     <template slot-scope="scope">
                       {{scope.row.xingbie}}
                     </template>
                </el-table-column>
            <el-table-column width="300" :align="contents.tableAlign"
                header-align="center"
                label="操作">
                <template slot-scope="scope">
                <el-button v-if="isAuth('shujucaiji','查看') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">{{ contents.tableBtnFont == 1?'详情':'' }}</el-button>
                <el-button v-if="isAuth('shujucaiji','查看') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">{{ contents.tableBtnFont == 1?'详情':'' }}<i class="el-icon-tickets el-icon--right" /></el-button>
                <el-button v-if="isAuth('shujucaiji','查看') && contents.tableBtnIcon == 0" type="success" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">{{ contents.tableBtnFont == 1?'详情':'' }}</el-button>
                <el-button v-if="isAuth('shujucaiji','修改') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'修改':'' }}</el-button>
                <el-button v-if="isAuth('shujucaiji','修改') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'修改':'' }}<i class="el-icon-edit el-icon--right" /></el-button>
                <el-button v-if="isAuth('shujucaiji','修改') && contents.tableBtnIcon == 0" type="primary" size="mini" @click="addOrUpdateHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'修改':'' }}</el-button>




                <el-button v-if="isAuth('shujucaiji','删除') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 1" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'删除':'' }}</el-button>
                <el-button v-if="isAuth('shujucaiji','删除') && contents.tableBtnIcon == 1 && contents.tableBtnIconPosition == 2" type="danger" size="mini" @click="deleteHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'删除':'' }}<i class="el-icon-delete el-icon--right" /></el-button>
                <el-button v-if="isAuth('shujucaiji','删除') && contents.tableBtnIcon == 0" type="danger" size="mini" @click="deleteHandler(scope.row.id)">{{ contents.tableBtnFont == 1?'删除':'' }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          clsss="pages"
          :layout="layouts"
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="Number(contents.pageEachNum)"
          :total="totalPage"
          :small="contents.pageStyle"
          class="pagination-content"
          :background="contents.pageBtnBG"
          :style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
    <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>



    <el-dialog
      title="统计报表"
      :visible.sync="chartVisiable"
      width="800">
        <div id="shentizhuangkuangChart" style="width:100%;height:600px;"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chartDialog">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      searchForm: {
        key: ""
      },
      form:{},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      addOrUpdateFlag:false,
      contents:{"searchBtnFontColor":"rgba(0, 0, 0, 1)","pagePosition":"1","inputFontSize":"14px","inputBorderRadius":"4px","tableBtnDelFontColor":"rgba(0, 0, 0, 1)","tableBtnIconPosition":"1","searchBtnHeight":"40px","inputIconColor":"#C0C4CC","searchBtnBorderRadius":"4px","tableStripe":true,"btnAdAllWarnFontColor":"rgba(0, 0, 0, 1)","tableBtnDelBgColor":"rgba(255, 255, 204, 1)","searchBtnIcon":"1","tableSize":"medium","searchBtnBorderStyle":"solid","tableSelection":true,"searchBtnBorderWidth":"1px","tableContentFontSize":"14px","searchBtnBgColor":"rgba(36, 194, 205, 1)","inputTitleSize":"14px","btnAdAllBorderColor":"#DCDFE6","pageJumper":true,"btnAdAllIconPosition":"1","searchBoxPosition":"1","tableBtnDetailFontColor":"rgba(0, 0, 0, 1)","tableBtnHeight":"40px","pagePager":true,"searchBtnBorderColor":"#DCDFE6","tableHeaderFontColor":"#909399","inputTitle":"1","tableBtnBorderRadius":"4px","btnAdAllFont":"0","btnAdAllDelFontColor":"rgba(0, 0, 0, 1)","tableBtnIcon":"1","btnAdAllHeight":"40px","btnAdAllWarnBgColor":"rgba(102, 102, 153, 1)","btnAdAllBorderWidth":"1px","tableStripeFontColor":"#606266","tableBtnBorderStyle":"solid","inputHeight":"40px","btnAdAllBorderRadius":"4px","btnAdAllDelBgColor":"rgba(255, 255, 204, 1)","pagePrevNext":true,"btnAdAllAddBgColor":"rgba(36, 194, 205, 1)","searchBtnFont":"0","tableIndex":true,"btnAdAllIcon":"1","tableSortable":true,"pageSizes":true,"tableFit":true,"pageBtnBG":false,"searchBtnFontSize":"14px","tableBtnEditBgColor":"rgba(102, 102, 153, 1)","inputBorderWidth":"1px","inputFontPosition":"1","inputFontColor":"#333","pageEachNum":10,"tableHeaderBgColor":"#fff","inputTitleColor":"#333","btnAdAllBoxPosition":"1","tableBtnDetailBgColor":"rgba(36, 194, 205, 1)","inputIcon":"1","searchBtnIconPosition":"2","btnAdAllFontSize":"10px","inputBorderStyle":"solid","inputBgColor":"#fff","pageStyle":false,"pageTotal":true,"btnAdAllAddFontColor":"rgba(0, 0, 0, 1)","tableBtnFont":"1","tableContentFontColor":"#606266","inputBorderColor":"#DCDFE6","tableShowHeader":true,"tableBtnFontSize":"10px","tableBtnBorderColor":"#DCDFE6","inputIconPosition":"2","tableBorder":true,"btnAdAllBorderStyle":"solid","tableBtnBorderWidth":"0px","tableStripeBgColor":"#F5F7FA","tableBtnEditFontColor":"rgba(0, 0, 0, 1)","tableAlign":"center"},
      layouts: '',

//导出excel
      json_fields: {
      "近期住址": "jinqizhuzhi",    //常规字段
      "家庭住址": "jiatingzhuzhi",    //常规字段
      "外出地点": "waichudidian",    //常规字段
      "体温": "tiwen",    //常规字段
      "身体状况": "shentizhuangkuang",    //常规字段
      "不良情况": "buliangqingkuang",    //常规字段
      "备注": "beizhu",    //常规字段
      "登记时间": "dengjishijian",    //常规字段
      "工号": "gonghao",    //常规字段
      "教师姓名": "jiaoshixingming",    //常规字段
      "性别": "xingbie",    //常规字段
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]

    };
  },
  created() {
    this.init();
    this.getDataList();
    this.contentStyleChange()
  },
  mounted() {

  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
  },
  methods: {
    contentStyleChange() {
      this.contentSearchStyleChange()
      this.contentBtnAdAllStyleChange()
      this.contentSearchBtnStyleChange()
      this.contentTableBtnStyleChange()
      this.contentPageStyleChange()
    },
    contentSearchStyleChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.form-content .slt .el-input__inner').forEach(el=>{
          let textAlign = 'left'
          if(this.contents.inputFontPosition == 2) textAlign = 'center'
          if(this.contents.inputFontPosition == 3) textAlign = 'right'
          el.style.textAlign = textAlign
          el.style.height = this.contents.inputHeight
          el.style.lineHeight = this.contents.inputHeight
          el.style.color = this.contents.inputFontColor
          el.style.fontSize = this.contents.inputFontSize
          el.style.borderWidth = this.contents.inputBorderWidth
          el.style.borderStyle = this.contents.inputBorderStyle
          el.style.borderColor = this.contents.inputBorderColor
          el.style.borderRadius = this.contents.inputBorderRadius
          el.style.backgroundColor = this.contents.inputBgColor
        })
        if(this.contents.inputTitle) {
          document.querySelectorAll('.form-content .slt .el-form-item__label').forEach(el=>{
            el.style.color = this.contents.inputTitleColor
            el.style.fontSize = this.contents.inputTitleSize
            el.style.lineHeight = this.contents.inputHeight
          })
        }
        setTimeout(()=>{
          document.querySelectorAll('.form-content .slt .el-input__prefix').forEach(el=>{
            el.style.color = this.contents.inputIconColor
            el.style.lineHeight = this.contents.inputHeight
          })
          document.querySelectorAll('.form-content .slt .el-input__suffix').forEach(el=>{
            el.style.color = this.contents.inputIconColor
            el.style.lineHeight = this.contents.inputHeight
          })
          document.querySelectorAll('.form-content .slt .el-input__icon').forEach(el=>{
            el.style.lineHeight = this.contents.inputHeight
          })
        },10)

      })
    },
    // 搜索按钮
    contentSearchBtnStyleChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.form-content .slt .el-button--success').forEach(el=>{
          el.style.height = this.contents.searchBtnHeight
          el.style.color = this.contents.searchBtnFontColor
          el.style.fontSize = this.contents.searchBtnFontSize
          el.style.borderWidth = this.contents.searchBtnBorderWidth
          el.style.borderStyle = this.contents.searchBtnBorderStyle
          el.style.borderColor = this.contents.searchBtnBorderColor
          el.style.borderRadius = this.contents.searchBtnBorderRadius
          el.style.backgroundColor = this.contents.searchBtnBgColor
        })
      })
    },
    // 新增、批量删除
    contentBtnAdAllStyleChange() {
      this.$nextTick(()=>{
        document.querySelectorAll('.form-content .ad .el-button--success').forEach(el=>{
          el.style.height = this.contents.btnAdAllHeight
          el.style.color = this.contents.btnAdAllAddFontColor
          el.style.fontSize = this.contents.btnAdAllFontSize
          el.style.borderWidth = this.contents.btnAdAllBorderWidth
          el.style.borderStyle = this.contents.btnAdAllBorderStyle
          el.style.borderColor = this.contents.btnAdAllBorderColor
          el.style.borderRadius = this.contents.btnAdAllBorderRadius
          el.style.backgroundColor = this.contents.btnAdAllAddBgColor
        })
        document.querySelectorAll('.form-content .ad .el-button--danger').forEach(el=>{
          el.style.height = this.contents.btnAdAllHeight
          el.style.color = this.contents.btnAdAllDelFontColor
          el.style.fontSize = this.contents.btnAdAllFontSize
          el.style.borderWidth = this.contents.btnAdAllBorderWidth
          el.style.borderStyle = this.contents.btnAdAllBorderStyle
          el.style.borderColor = this.contents.btnAdAllBorderColor
          el.style.borderRadius = this.contents.btnAdAllBorderRadius
          el.style.backgroundColor = this.contents.btnAdAllDelBgColor
        })
        document.querySelectorAll('.form-content .ad .el-button--warning').forEach(el=>{
          el.style.height = this.contents.btnAdAllHeight
          el.style.color = this.contents.btnAdAllWarnFontColor
          el.style.fontSize = this.contents.btnAdAllFontSize
          el.style.borderWidth = this.contents.btnAdAllBorderWidth
          el.style.borderStyle = this.contents.btnAdAllBorderStyle
          el.style.borderColor = this.contents.btnAdAllBorderColor
          el.style.borderRadius = this.contents.btnAdAllBorderRadius
          el.style.backgroundColor = this.contents.btnAdAllWarnBgColor
        })
      })
    },
    // 表格
    rowStyle({ row, rowIndex}) {
      if (rowIndex % 2 == 1) {
        if(this.contents.tableStripe) {
          return {color:this.contents.tableStripeFontColor}
        }
      } else {
        return ''
      }
    },
    cellStyle({ row, rowIndex}){
      if (rowIndex % 2 == 1) {
        if(this.contents.tableStripe) {
          return {backgroundColor:this.contents.tableStripeBgColor}
        }
      } else {
        return ''
      }
    },
    headerRowStyle({ row, rowIndex}){
      return {color: this.contents.tableHeaderFontColor}
    },
    headerCellStyle({ row, rowIndex}){
      return {backgroundColor: this.contents.tableHeaderBgColor}
    },
    // 表格按钮
    contentTableBtnStyleChange(){
      // this.$nextTick(()=>{
      //   setTimeout(()=>{
      //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--success').forEach(el=>{
      //       el.style.height = this.contents.tableBtnHeight
      //       el.style.color = this.contents.tableBtnDetailFontColor
      //       el.style.fontSize = this.contents.tableBtnFontSize
      //       el.style.borderWidth = this.contents.tableBtnBorderWidth
      //       el.style.borderStyle = this.contents.tableBtnBorderStyle
      //       el.style.borderColor = this.contents.tableBtnBorderColor
      //       el.style.borderRadius = this.contents.tableBtnBorderRadius
      //       el.style.backgroundColor = this.contents.tableBtnDetailBgColor
      //     })
      //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--primary').forEach(el=>{
      //       el.style.height = this.contents.tableBtnHeight
      //       el.style.color = this.contents.tableBtnEditFontColor
      //       el.style.fontSize = this.contents.tableBtnFontSize
      //       el.style.borderWidth = this.contents.tableBtnBorderWidth
      //       el.style.borderStyle = this.contents.tableBtnBorderStyle
      //       el.style.borderColor = this.contents.tableBtnBorderColor
      //       el.style.borderRadius = this.contents.tableBtnBorderRadius
      //       el.style.backgroundColor = this.contents.tableBtnEditBgColor
      //     })
      //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--danger').forEach(el=>{
      //       el.style.height = this.contents.tableBtnHeight
      //       el.style.color = this.contents.tableBtnDelFontColor
      //       el.style.fontSize = this.contents.tableBtnFontSize
      //       el.style.borderWidth = this.contents.tableBtnBorderWidth
      //       el.style.borderStyle = this.contents.tableBtnBorderStyle
      //       el.style.borderColor = this.contents.tableBtnBorderColor
      //       el.style.borderRadius = this.contents.tableBtnBorderRadius
      //       el.style.backgroundColor = this.contents.tableBtnDelBgColor
      //     })

      //   }, 50)
      // })
    },
    // 分页
    contentPageStyleChange(){
      let arr = []

      if(this.contents.pageTotal) arr.push('total')
      if(this.contents.pageSizes) arr.push('sizes')
      if(this.contents.pagePrevNext){
        arr.push('prev')
        if(this.contents.pagePager) arr.push('pager')
        arr.push('next')
      }
      if(this.contents.pageJumper) arr.push('jumper')
      this.layouts = arr.join()
      this.contents.pageEachNum = 10
    },

    chartDialog() {
      this.chartVisiable = !this.chartVisiable;
      this.$nextTick(()=>{
        var shentizhuangkuangChart = this.$echarts.init(document.getElementById("shentizhuangkuangChart"),'macarons');
        this.$http({
            url: "group/shujucaiji/shentizhuangkuang",
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
            let res = data.data;
            let xAxis = [];
            let yAxis = [];
            let pArray = []
            for(let i=0;i<res.length;i++){
                xAxis.push(res[i].shentizhuangkuang);
                yAxis.push(res[i].total);
                pArray.push({
                value: res[i].total,
                name: res[i].shentizhuangkuang
                })
                var option = {};
                option = {
                        title: {
                            text: '数据采集',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: pArray,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                };
                // 使用刚指定的配置项和数据显示图表。
                shentizhuangkuangChart.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    shentizhuangkuangChart.resize();
                };
            }
            }
        });
        // xcolumn ycolumn  
      })
    },
    init () {
          this.shentizhuangkuangOptions = "良好,不适".split(',')
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
      }
          if(this.searchForm.shentizhuangkuang!='' && this.searchForm.shentizhuangkuang!=undefined){
            params['shentizhuangkuang'] = '%' + this.searchForm.shentizhuangkuang + '%'
          }
      this.$http({
        url: "shujucaiji/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    // 查看评论
    // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "shujucaiji/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
    async printJson() {
      //通过getdata调用后台接口获取数据封装到res
      this.list = this.dataList;
      let data = []
      for (let i=0; i < this.list.length; i++) {
          data.push({
          jinqizhuzhi: this.list[i].jinqizhuzhi,
          jiatingzhuzhi: this.list[i].jiatingzhuzhi,
          tiwen: this.list[i].tiwen,
          shentizhuangkuang: this.list[i].shentizhuangkuang,
          dengjishijian: this.list[i].dengjishijian,
          gonghao: this.list[i].gonghao,
          jiaoshixingming: this.list[i].jiaoshixingming,
          xingbie: this.list[i].xingbie,
        })
      }
      printJS({
        printable: data,
        properties: [
	  {
		field: 'jinqizhuzhi',
		displayName: '近期住址',
		columnSize: 1
	  },
	  {
		field: 'jiatingzhuzhi',
		displayName: '家庭住址',
		columnSize: 1
	  },
	  {
		field: 'tiwen',
		displayName: '体温',
		columnSize: 1
	  },
	  {
		field: 'shentizhuangkuang',
		displayName: '身体状况',
		columnSize: 1
	  },
	  {
		field: 'dengjishijian',
		displayName: '登记时间',
		columnSize: 1
	  },
	  {
		field: 'gonghao',
		displayName: '工号',
		columnSize: 1
	  },
	  {
		field: 'jiaoshixingming',
		displayName: '教师姓名',
		columnSize: 1
	  },
	  {
		field: 'xingbie',
		displayName: '性别',
		columnSize: 1
	  },
        ],
        type: 'json',
        header: '数据采集',
        // 样式设置
        gridStyle: 'border: 2px solid #3971A5;',
        gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;'
      })
    },
  }

};
</script>
<style lang="scss" scoped>
//导出excel
  .export-excel-wrapper{
    display: inline-block;
  }
  .slt {
    margin: 0 !important;
    display: flex;
  }

  .ad {
    margin: 0 !important;
    display: flex;
  }

  .pages {
    & /deep/ el-pagination__sizes{
      & /deep/ el-input__inner {
        height: 22px;
        line-height: 22px;
      }
    }
  }
  

  .el-button+.el-button {
    margin:0;
  } 

  .tables {
	& /deep/ .el-button--success {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 10px;
		border-width: 0px;
		border-style: solid;
		border-color: #DCDFE6;
		border-radius: 4px;
		background-color: rgba(36, 194, 205, 1);
	}
	
	& /deep/ .el-button--primary {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 10px;
		border-width: 0px;
		border-style: solid;
		border-color: #DCDFE6;
		border-radius: 4px;
		background-color: rgba(102, 102, 153, 1);
	}
	
	& /deep/ .el-button--danger {
		height: 40px;
		color: rgba(0, 0, 0, 1);
		font-size: 10px;
		border-width: 0px;
		border-style: solid;
		border-color: #DCDFE6;
		border-radius: 4px;
		background-color: rgba(255, 255, 204, 1);
	}

    & /deep/ .el-button {
      margin: 4px;
    }
  }

</style>
