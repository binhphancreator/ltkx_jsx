var resourceUI = "window { properties:{ resizeable:false, maximizeButton: false }, \
  text: 'Bài cuối kỳ (Phan Văn Bình - B18DCPT031)',\
  inputPanel: Panel { orientation:'column', alignChildren:['left', 'top'],\
    text: 'Nhập thông tin', \
    inputProfile: Group { \
      staticText: StaticText { text:'Nhập tên, mã sinh viên:' }, \
      editText: EditText { text:'Phan Văn Bình - B18DCPT031', characters:40 } \
    }, \
    inputChannel: Group { \
      staticText: StaticText { text:'Nhập tên kênh youtube:' }, \
      editText: EditText { text:'PhanVanBinh', characters:40 } \
    }, \
    inputLogo: Group { \
      staticText: StaticText { text:'Chưa chọn logo (sẽ lấy mặc định nếu bạn không chọn)' }, \
      btnChooseLogo: Button { text:'Chọn logo'}, \
    }, \
	}, \
  buttonPane: Panel { orientation:'column', alignChildren:['left', 'top'],\
    text: 'Chức năng', \
    buttons: Group { \
      alignment: ['center', 'top'] \
      btnCreateProj: Button { text:'Tạo Project' }, \
      btnSaveProj: Button { text:'Lưu Project'}, \
      btnCreateComp: Button { text:'Tạo Comp'}, \
      btnCreateIntro: Button { text:'Tạo Animation'}, \
      btnRender: Button { text:'Render'}, \
      btnHelp: Button { text:'Hướng dẫn'}, \
    }, \
	}, \
}"

function createUI() {
  var window = new Window(resourceUI)
  window.center()
  window.show()
  return window
}

function saveFileWithDialog() {
  app.project.saveWithDialog()
}

function createProject() {
  app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
  app.newProject()
}

function rendeProject() {
  app.project.renderQueue.items.add(comp);
  app.endUndoGroup();
  app.endSuppressDialogs(false);
  app.project.renderQueue.queueInAME(true);
}

function createNewComp(name, color) {
  var comp = app.project.items.addComp(name, 1280, 720, 16/9, 20, 25)
  if (!color)
    color = [0, 0, 0]
  comp.bgColor = color
  return comp
}

function rgb(r, g ,b) {
  return [r / 255, g / 255, b / 255]
}

var window = createUI()
var introComp = null
var widthComp = 1280
var heightComp = 720

window.buttonPane.buttons.btnCreateProj.onClick = createProject
window.buttonPane.buttons.btnHelp.onClick = function() {
  alert("Hướng dẫn", "Hướng dẫn sử dụng");
}

window.buttonPane.buttons.btnCreateIntro.onClick = function() {
  introComp = createNewComp("intro")
  introComp.openInViewer()
  var introShapeLayer = introComp.layers.addShape()
  
  var rectShapeGroup = introShapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group")

  var rectShape = rectShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect")
  rectShape.property("ADBE Vector Rect Size").setValueAtTime(0, [30, 0])
  rectShape.property("ADBE Vector Rect Size").setValueAtTime(0.75, [30, 125])
  rectShape.property("ADBE Vector Rect Size").setValueAtTime(1.25, [30, 100])
  rectShape.property("ADBE Vector Rect Position").setValueAtTime(0.75, [0, 0])
  rectShape.property("ADBE Vector Rect Position").setValueAtTime(1.25, [-400, 0])

  rectShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue([1, 1, 1])

  var bgIntroRectGroup = introShapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group")
  bgIntroRectGroup.property("ADBE Vector Transform Group").opacity.setValue(80)
  bgIntroRectGroup.property("ADBE Vector Transform Group").position.setValueAtTime(0.75, [0, -25])
  bgIntroRectGroup.property("ADBE Vector Transform Group").position.setValueAtTime(1.25, [-385, -25])
  bgIntroRectGroup.property("ADBE Vector Transform Group").property("Anchor Point").setValue([-25, 0])
  bgIntroRectGroup.property("ADBE Vector Transform Group").scale.setValueAtTime(0.75, [0, 120])
  bgIntroRectGroup.property("ADBE Vector Transform Group").scale.setValueAtTime(1.25, [1200, 100])

  var bgIntroRect = bgIntroRectGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect")
  bgIntroRect.property("ADBE Vector Rect Size").setValue([50, 50])

  bgIntroRectGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(rgb(35, 113, 163))
}
