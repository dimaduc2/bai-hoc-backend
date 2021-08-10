// đây là Express - Web Server cho website pokedex
const express = require('express');		    //phải mượn Express
const baiHocRoutes = express.Router();	    //tạo Router để nhận tất cả câu hỏi

const app = express();
app.use(express.json())

const cors = require('cors');
app.use(cors());

app.use('/baiHoc', baiHocRoutes);		        //bảo Router chỉ nhận câu hỏi bắt đầu ‘/hanhDong

let starWarsModel = require('./star-wars.model');

const mongoose = require('mongoose');     //phải mượn Mongoose

const PORT = 5500;


mongoose.connect('mongodb+srv://dima:dimaduc@cluster0.ybo8t.mongodb.net/pokedex-db?retryWrites=true&w=majority', { useNewUrlParser: true })
        .catch(error => console.log('không kết nối được với mongoDB: ' + error));
        // nếu không kết nối được thì thông báo lỗi
const connection = mongoose.connection; //  <=> giữa server và DB

// sau đó, mở kết nối để 2 bên nói chuyện
// hiện ra, thông báo là nói chuyện đc rồi
connection.once('open', function() {
  console.log("Đã nói chuyện với MongoDB");    
})

// server bắt đầu nghe và đợi câu hỏi ở phòng PORT 5500
app.listen(PORT, function() {		          //chạy Web Server ở địa chỉ phòng này
  console.log("đã bắt đầu server của bai hoc đang đợi câu hỏi và ở phòng Port: " + PORT);
});


// Chỉ hiện trên mạng: http://localhost:5500/baiHoc/inNhieuLan?ten=ABCDEFG&soLan=5
baiHocRoutes.route('/inNhieuLan/').get(function(req, res) {
  let ten = req.query.ten;
  let soLan = req.query.soLan;
  // res.send('Có ' + soLan+ ' lần tên ' + ten)
  var text = "";
  var i;
  for(i = 0; i < soLan; i++){
    text += ten+'<br/>';
  }
  res.send(text);
  console.log(text);
})



baiHocRoutes.route('/').get(function(req, res) {
  res.send('câu trả lời / của router');
  console.log('câu trả lời / của router')
})

app.get('/', (req, res) => {
  res.send('câu trả lời / của app')
  console.log('câu trả lời / của app');
})

var ten = ''
baiHocRoutes.route('/chao').get(function(req, res) {
  ten=req.query.ten
  if(ten===''){
    res.json('Quên viết tên');
    console.log('Quên viết tên');
  }
  else{
    res.json('Xin chào '+ten+', đây là Server bài học');
    console.log('Xin chào '+ten+', đây là Server bài học');
  }
})

baiHocRoutes.route('/aiDo').get(function(req, res) {
  ten=req.query.ten
  if(ten===''){
    res.json('Ko biết tên bạn');
    console.log('Ko biết tên bạn');
  }
  else{
    res.json('Tên bạn là '+ten);
    console.log('Tên bạn là '+ten);
  }
})

var taoDatabase =             {day:'Thứ hai',   taoRa: 'Tạo Database.',               lamGi: 'Tạo DB Pokemon, ở MongoDB, ở máy xa, Atlas.', diem: 20, lamXongCHua:true}
var taoServerMoi =            {day:'Thứ năm',   taoRa: 'Tạo Server mới.',             lamGi: 'Tạo Sever, ở máy của mình.',                  diem: 80, lamXongCHua:true}
var themThongTinVaoServer =   {day:'Thứ sáu',   taoRa: 'Thêm thông tin vào Server.',  lamGi: 'Tạo thông tin.',                              diem: 40, lamXongCHua:false}
var react =                   {day:'Thứ hai',   taoRa: 'Tạo React.',                  lamGi: 'Tạo trag web để USE bấm.',                    diem: 10, lamXongCHua:false}
var baiTap = [taoDatabase, taoServerMoi, themThongTinVaoServer, react];
var ABCDEF = [{name:'Anakin', gender: 'Male'}, {name:'Padme', gender: 'Female'}, {name:'Luke', gender: 'Male'}, {name:'Leia', gender: 'Female'}, {name:'Vader', gender: 'Male'}, ];
// var ABCDEF = ['Anakin', 'Padme', 'Luke', 'Leia', 'Vader'];

// baiHocRoutes.route('/baiTap').get(function(req, res) {
//   var soArray=req.query.soArray-1
//   if(soArray<0 || soArray>baiTap.length-1){
//     res.json('Không có bài tập số '+(soArray+1))
//   }
//   else{
//     console.log(baiTap[soArray].day);
//     console.log(baiTap[soArray].taoRa);
//     console.log(baiTap[soArray].lamGi);
//     console.log(baiTap[soArray].diem);
//     console.log(baiTap[soArray].lamXongCHua);
//     console.log({'ketQuaSoArray': baiTap[soArray]})
//     res.json({'ketQuaSoArray': baiTap[soArray]})
//   }
// })

baiHocRoutes.route('/tatCaBaiTap').get(function(req, res) {
  console.log('Tất cả bài tập: '+'<br/><br/>'+baiTap)
  res.json({'tatCaSoArray': baiTap})
})

baiHocRoutes.route('/diemTrungBinh').get(function(req, res) {
  var tổngDiem = 0;
  for(i=0; i<baiTap.length; i++){
    tổngDiem += baiTap[i].diem
    console.log('tinhDiem: ' + tổngDiem)
  }
  
  res.json({'tinhDiem': tổngDiem/baiTap.length})
})

baiHocRoutes.route('/timDiemCao').get(function(req, res) {
  // var diemArray = []  
  // for(i=0; i<baiTap.length; i++){
  //   diemArray.push(baiTap[i].diem)
  // }
  // var maxInNumbers = Math.max.apply(Math, diemArray); 
  // res.json({'soDiemCaoNhat': maxInNumbers})

  var diemCaoNhat = 0
  console.log(diemCaoNhat)
  for(i=0; i<baiTap.length; i++){
    if(baiTap[i].diem > diemCaoNhat){
      diemCaoNhat=baiTap[i].diem
    }
    console.log(diemCaoNhat)
  }
  res.json({'soDiemCaoNhat': diemCaoNhat})
})

baiHocRoutes.route('/timDiemThap').get(function(req, res) {
  // var diemArray = []  
  // for(i=0; i<baiTap.length; i++){
  //   diemArray.push(baiTap[i].diem)
  // }
  // var minInNumbers = Math.min.apply(Math, diemArray); 
  // res.json({'soDiemThapNhat': minInNumbers})

  var diemNhoNhat = baiTap[0].diem
  console.log(diemNhoNhat)
  for(i=0; i<baiTap.length; i++){
    if(baiTap[i].diem < diemNhoNhat){
      diemNhoNhat=baiTap[i].diem
    }
    console.log(diemNhoNhat)
  }
  res.json({'soDiemThapNhat': diemNhoNhat})
})



baiHocRoutes.route('/baiTap/').get(function(req, res) {
  let ngay = req.query.ngay;
  let cauTraLoi = {'ketQuaDaTimBaiTap': [], 'kqNgay':ngay};
  console.log('Đã tìm bài vào ' +ngay)
  for(i=0; i<baiTap.length; i++){
    if(ngay==baiTap[i].day){
      console.log('Đã tìm bài vào ' +ngay+ ' là: '+baiTap[i])
      cauTraLoi.ketQuaDaTimBaiTap.push(baiTap[i])
    }
    else {
      console.log('Không tìm thấy bài nào trong ngày '+'Không tìm thấy bài nào')
      // cauTraLoi.ketQuaDaTimBaiTap.push('Không có bài nào')
    }
  }
  res.json(cauTraLoi)
})



baiHocRoutes.route('/baiTap/:idMuonSua').put(function(req, res) {
  console.log('đã sửa')
  res.json('đã sửa')
})
baiHocRoutes.route('/baiTap/:idMuonXoa').delete(function(req, res) {
  console.log('đã xóa')
  res.json('đã xóa')
})


baiHocRoutes.route('/baiTap/').post(function(req, res) {
  console.log('ngayMoi=' +req.body.ngay+'&tenMoi='+req.body.ten+'&lamGiMoi='+req.body.lamGi+'&diemMoi='+req.body.diem+'&TrueFalse='+req.body.LXC)

  let ngayMoi = req.body.ngay;
  console.log('đã thêm ngày mới là: '+ngayMoi)

  let tenMoi = req.body.ten;
  console.log('đã thêm tên mới là: '+tenMoi)

  let lamGiMoi = req.body.lamGi;
  console.log('đã thêm làm gì mới là: '+lamGiMoi)

  let diemMoi = req.body.diem;
  console.log('đã thêm điểm mới là: '+diemMoi)

  let TrueFalse = req.body.LXC;
  if(TrueFalse === 'Chưa làm xong bài'){
    TrueFalse=false
    console.log('đã thêm True Fale là: '+TrueFalse)
  }
  else if (TrueFalse==='Làm xong bài'){
    TrueFalse=true
    console.log('đã thêm True Fale là: '+TrueFalse)
  }


  // res.json({'ketQuaChuNgayMoi':ngayMoi, 'ketQuaChuTenMoi':tenMoi, 'ketQuaChuLamGiMoiMoi':lamGiMoi})

  var taoChuMoi = {day:ngayMoi, taoRa:tenMoi, lamGi:lamGiMoi, diem:Number(diemMoi), lamXongCHua:TrueFalse}
  baiTap.push(taoChuMoi)
  console.log({baiTap})
  res.json({'ketQuaChuMoi':baiTap[baiTap.length-1], 'ketQuaBaoNhieuBai':baiTap.length})
  
})







baiHocRoutes.route('/cong/').get(function(req, res) {
  let so1 = req.query.so1;
  let so2 = req.query.so2;
  res.json({'ketQua': Number(so1) +' + '+ Number(so2) +' = '+ (Number(so1) + Number(so2))})
  // res.send('đã nhận câu hỏi cộng 2 số: '+so1+' và '+so2+' ra '+( Number(so1) + Number(so2) ));
  console.log('đã nhận câu hỏi cộng 2 số: '+so1+' và '+so2+' ra '+( Number(so1) + Number(so2) ));
})
baiHocRoutes.route('/tru/').get(function(req, res) {
  let so1 = req.query.so1;
  let so2 = req.query.so2;
  res.json({'ketQua': Number(so1) +' - '+ Number(so2) +' = '+ (Number(so1) - Number(so2))})
  // res.send('đã nhận câu hỏi trừ 2 số: '+so1+' và '+so2+' ra '+( Number(so1) - Number(so2) ));
  console.log('đã nhận câu hỏi trừ 2 số: '+so1+' và '+so2+' ra '+( Number(so1) - Number(so2) ));
})
baiHocRoutes.route('/nhan/').get(function(req, res) {
  let so1 = req.query.so1;
  let so2 = req.query.so2;
  res.json({'ketQua': Number(so1) +' * '+ Number(so2) +' = '+ (Number(so1) * Number(so2))})
  // res.send('đã nhận câu hỏi nhân 2 số: '+so1+' và '+so2+' ra '+( Number(so1) * Number(so2) ));
  console.log('đã nhận câu hỏi nhân 2 số: '+so1+' và '+so2+' ra '+( Number(so1) * Number(so2) ));
})
baiHocRoutes.route('/chia/').get(function(req, res) {
  let so1 = req.query.so1;
  let so2 = req.query.so2;
  res.json({'ketQua': Number(so1) +' / '+ Number(so2) +' = '+ (Number(so1) / Number(so2))})
  // res.send('đã nhận câu hỏi chia 2 số: '+so1+' và '+so2+' ra '+( Number(so1) / Number(so2) ));
  console.log('đã nhận câu hỏi chia 2 số: '+so1+' và '+so2+' ra '+( Number(so1) / Number(so2) ));
})





// baiHocRoutes.route('/baiTap/themChuMoi/').get(function(req, res) {
//   let ngayMoi = req.query.ngayMoi;
//   console.log('đã thêm ngày mới là: '+ngayMoi)

//   let tenMoi = req.query.tenMoi;
//   console.log('đã thêm tên mới là: '+tenMoi)

//   let lamGiMoi = req.query.lamGiMoi;
//   console.log('đã thêm làm gì mới là: '+lamGiMoi)

//   let diemMoi = req.query.diemMoi;
//   console.log('đã thêm điểm mới là: '+diemMoi)

//   let TrueFalse = req.query.TrueFalse;
//   if(TrueFalse === 'Chưa làm xong bài'){
//     TrueFalse=false
//     console.log('đã thêm True Fale là: '+TrueFalse)
//   }
//   else if (TrueFalse==='Làm xong bài'){
//     TrueFalse=true
//     console.log('đã thêm True Fale là: '+TrueFalse)
//   }


//   // res.json({'ketQuaChuNgayMoi':ngayMoi, 'ketQuaChuTenMoi':tenMoi, 'ketQuaChuLamGiMoiMoi':lamGiMoi})

//   var taoChuMoi = {day:ngayMoi, taoRa:tenMoi, lamGi:lamGiMoi, diem:diemMoi, lamXongCHua:TrueFalse}
//   baiTap.push(taoChuMoi)
//   console.log({baiTap})
//   res.json({'ketQuaChuMoi':baiTap[baiTap.length-1 ], 'ketQuaBaoNhieuBai':baiTap.length})
  
// })





// baiHocRoutes.route('/baiTap/themTen/').get(function(req, res) {
//   let tenMoi = req.query.tenMoi;
//   console.log('đã thêm tên mới là: '+tenMoi)
//   // res.json({'ketQuaChuMoi':'Đã thêm chữ mới là: '+tenMoi})
//   baiTap.push(tenMoi)
//   console.log(baiTap)
//   // res.json({'ketQuaChuMoi':'Đã thêm chữ mới là: '+baiTap})
// })



baiHocRoutes.route('/starWars/').get(function(req, res) {
  let name = req.query.name;
  let gender = req.query.gender;
  let species = req.query.species;
  let lightsaber = req.query.lightsaber;
  
  console.log('Đã tìm danh sách Star Wars')
  console.log(name+' '+gender+' '+species+' '+lightsaber)
  
})

baiHocRoutes.route('/starWars2/').get(function(req, res) {
  let nameStarWars = req.query.nameStarWars
  console.log(nameStarWars)
  // res.json(nameStarWars)
  starWarsModel.find({}, function(err, timNguoi){
    if (err) {
      console.log(err);
      res.json('Không kết nối với MongoDB')
    }
    else {
      console.log('đã tìm thấy ' + timNguoi.length + ' người')
      res.json(timNguoi)
    }
  }).sort({[nameStarWars]:1, name:1})
})



baiHocRoutes.route('/starWars3/').get(function(req, res) {
  let nameStarWars = req.query.nameStarWars;
  

  text ='name: '+ABCDEF[0].name+', Gender: '+ABCDEF[0].gender+';  '+
        'name: '+ABCDEF[1].name+', Gender: '+ABCDEF[1].gender+'; '+
        'name: '+ABCDEF[2].name+', Gender: '+ABCDEF[2].gender+'; '+ 
        'name: '+ABCDEF[3].name+', Gender: '+ABCDEF[3].gender+'; '+
        'name: '+ABCDEF[4].name+', Gender: '+ABCDEF[4].gender
        res.json(text)
        var text = '';

  // for (var i = 0; i < ABCDEF.length; i++) {
    // text1 += ABCDEF[0].name+' '+ABCDEF[1].name+' '+ABCDEF[2].name+' '+ABCDEF[3].name+' '+ABCDEF[4].name
    // text2 += ABCDEF[0].gender+' '+ABCDEF[1].gender+' '+ABCDEF[2].gender+' '+ABCDEF[3].gender+' '+ABCDEF[4].gender
    // text += ABCDEF[0]+' '+ABCDEF[1]+' '+ABCDEF[2]+' '+ABCDEF[3]+' '+ABCDEF[4]
  //   text += ABCDEF[i].name
  //   res.json(text)
  // }


})


// baiHocRoutes.route('/diemTrungBinh').get(function(req, res) {
//   var tổngDiem = 0;
//   for(i=0; i<baiTap.length; i++){
//     tổngDiem += baiTap[i].diem
//     console.log('tinhDiem: ' + tổngDiem)
//   }
  



baiHocRoutes.route('/starWars/:idMuonXoa').delete(function(req, res) {
  let id = req.params.idMuonXoa;
  console.log('Đã xóa '+id)
  res.json('Đã xóa')
})

baiHocRoutes.route('/starWars/').post(function(req, res) {
  console.log('Đã thêm '+req.body)
  res.json('Đã thêm')
})

baiHocRoutes.route('/starWars/:idMuonSua').put(function(req, res) {
  let id = req.params.idMuonSua
  console.log('Đã sửa '+id)
  res.json('Đã sửa')
})


