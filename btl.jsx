var resourceUI = "window { properties:{ resizeable:false, maximizeButton: false }, \
  text: 'Bài cuối kỳ (Phan Văn Bình - B18DCPT031)',\
  inputPanel: Panel { orientation:'column', alignChildren:['left', 'top'],\
    text: 'Nhập thông tin', \
    inputProfile: Group { \
      staticText: StaticText { text:'Nhập tên, mã sinh viên:' }, \
      editText: EditText { text:'Phan Văn Bình - B18DCPT031', characters:20 } \
    }, \
    inputComp: Group { \
      staticText: StaticText { text:'Nhập tên comp:' }, \
      editText: EditText { text:'main', characters:20 } \
    }, \
	}, \
  buttonPane: Panel { orientation:'column', alignChildren:['left', 'top'],\
    text: 'Chức năng', \
    buttons: Group { \
      alignment: ['left', 'top'] \
      btnCreateIntro: Button { text:'Tạo Intro Animation'}, \
      btnCreateAnimation: Button { text:'Tạo Animation'}, \
    }, \
    buttonsCommon: Group { \
      alignment: ['left', 'top'] \
      btnCreateProj: Button { text:'Tạo Project' }, \
      btnSaveProj: Button { text:'Lưu Project'}, \
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

function resolvePath(relative) {
  var file = new File($.fileName)
  var baseFolder = new Folder(file.parent.absoluteURI)
  if (relative) 
    return baseFolder.absoluteURI + "/" + relative
  return baseFolder.absoluteURI
}

function createProject() {
  app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
  app.newProject()
  createComps()
  importFootage()
  createdProject = true
  createdIntro = false
  createdAnimation = false
}

function saveFileWithDialog() {
  if (!createdProject)
    createProject()
  app.project.saveWithDialog()
}

function createComps() {
  var nameMainComp = window.inputPanel.inputComp.editText.text
  mainComp = createNewComp(nameMainComp)
  introComp = createNewComp("intro")
}

function importFootage() {
  bgFootage = app.project.importFile(new ImportOptions(bgFile))
  busFootage = app.project.importFile(new ImportOptions(busFile))
  cloudFootage = app.project.importFile(new ImportOptions(cloudFile))
  schoolFootage = app.project.importFile(new ImportOptions(schoolFile))
}

function renderProject(comp) {
  app.project.renderQueue.items.add(comp);
  app.endUndoGroup();
  app.endSuppressDialogs(false);
  app.project.renderQueue.queueInAME(true);
}

function createNewComp(name, color) {
  var comp = app.project.items.addComp(name, 1280, 720, 1, 20, 30)
  if (!color)
    color = [0, 0, 0]
  comp.bgColor = color
  return comp
}

function rgb(r, g ,b) {
  return [r / 255, g / 255, b / 255]
}

function addIntroTextLayer() {
  var text = window.inputPanel.inputProfile.editText.text
  var introTextLayer = createTextLayer(introComp, text, [widthBorderIntroShape / 2, - (heightBorderIntroShape - heightBgIntroShape - leading) / 2])
  createRectBgIntroGroup(introComp.layers.addShape(), rgb(255, 255, 255))
  introTextLayer.trackMatteType = TrackMatteType.ALPHA
}

function addSubIntroTextLayer() {
  var text = "Khung cảnh trường học"
  var subIntroTextLayer = createTextLayer(introComp, text, [widthBorderIntroShape / 2, - (heightBgSubIntroShape - heightBorderIntroShape - leading) / 2])
  createRectBgSubIntroGroup(introComp.layers.addShape(), rgb(255, 255, 255))
  subIntroTextLayer.trackMatteType = TrackMatteType.ALPHA
}


function createRectBgIntroGroup(layer, fill) {
  var group = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group")
  group.property("ADBE Vector Transform Group").opacity.setValue(80)

  group.property("ADBE Vector Transform Group").position.setValueAtTime(keyframes[1], [0, (heightBgIntroShape - heightBorderIntroShape) / 2])
  group.property("ADBE Vector Transform Group").position.setValueAtTime(keyframes[2], [posXBorderIntroShape + widthBorderIntroShape / 2, (heightBgIntroShape - heightBorderIntroShape) / 2])
  group.property("ADBE Vector Transform Group").scale.setValueAtTime(keyframes[1], [0, (heightBorderIntroShape * 2 / 3) / heightBgIntroShape * 100])
  group.property("ADBE Vector Transform Group").scale.setValueAtTime(keyframes[2], [widthRootBgIntroShape / widthBgIntroShape * 100, 100])

  group.property("ADBE Vector Transform Group").property("Anchor Point").setValue([-widthBgIntroShape / 2, 0])
  var mask = group.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect")
  mask.property("ADBE Vector Rect Size").setValue([widthBgIntroShape, heightBgIntroShape])
  group.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(fill)

  return group
}

function createRectBgSubIntroGroup(layer, fill) {
  var group = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group")
  group.property("ADBE Vector Transform Group").opacity.setValue(80)

  group.property("ADBE Vector Transform Group").position.setValueAtTime(keyframes[2], [0, (-heightBgSubIntroShape + heightBorderIntroShape) / 2])
  group.property("ADBE Vector Transform Group").position.setValueAtTime(keyframes[3], [posXBorderIntroShape + widthBorderIntroShape / 2, (-heightBgSubIntroShape + heightBorderIntroShape) / 2])
  group.property("ADBE Vector Transform Group").scale.setValueAtTime(keyframes[2], [0, 100])
  group.property("ADBE Vector Transform Group").scale.setValueAtTime(keyframes[3], [widthRootBgSubIntroShape / widthBgSubIntroShape * 100, 100])

  group.property("ADBE Vector Transform Group").property("Anchor Point").setValue([-widthBgSubIntroShape / 2, 0])
  var mask = group.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect")
  mask.property("ADBE Vector Rect Size").setValue([widthBgSubIntroShape, heightBgSubIntroShape])
  group.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(fill)

  return group
}


function createTextLayer(comp, text, transform) {
  var textLayer = comp.layers.addText(text)
  
  var textLayerPos = textLayer.position.value
  textLayer.position.setValue([textLayerPos[0] + transform[0], textLayerPos[1] + transform[1]])

  var textDocument = textLayer.sourceText.value
  textDocument.resetCharStyle()
  textDocument.font = "Arial"
  textDocument.fontSize  = 28
  textDocument.fillColor = [1, 1, 1]
  textDocument.applyFill = true
  textDocument.justification = ParagraphJustification.CENTER_JUSTIFY
  textDocument.tracking = -43
  // textDocument.horizontalScale = 1.6

  textLayer.sourceText.setValue(textDocument)

  return textLayer
}

function createBorderShape(layer) {
  var rectShapeGroup = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group")

  var rectShape = rectShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect")
  rectShape.property("ADBE Vector Rect Size").setValueAtTime(keyframes[0], [widthBorderIntroShape, 0])
  rectShape.property("ADBE Vector Rect Size").setValueAtTime(keyframes[1], [widthBorderIntroShape, heightBorderIntroShape + 25])
  rectShape.property("ADBE Vector Rect Size").setValueAtTime(keyframes[2], [widthBorderIntroShape, heightBorderIntroShape])
  rectShape.property("ADBE Vector Rect Position").setValueAtTime(keyframes[1], [0, 0])
  rectShape.property("ADBE Vector Rect Position").setValueAtTime(keyframes[2], [posXBorderIntroShape, posYBorderIntroShape])

  rectShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue([1, 1, 1])
}

function createIntro() {
  if (!createdProject)
    createProject()
  if (createdIntro) 
    return
  introComp.openInViewer()
  var introShapeLayer = introComp.layers.addShape()
  createBorderShape(introShapeLayer)
  createRectBgIntroGroup(introShapeLayer, rgb(35, 155, 86))
  addIntroTextLayer()

  var subIntroShapeLayer = introComp.layers.addShape()
  createRectBgSubIntroGroup(subIntroShapeLayer, rgb(86, 101, 115))
  addSubIntroTextLayer()
  createdIntro = true
}

var window = createUI()
var introComp = null
var mainComp = null

var bgFootage = null
var busFootage = null
var schoolFootage = null
var cloudFootage = null

var widthComp = 1280
var heightComp = 720
var keyframes = [0, 0.75, 1.25, 1.5, 2, 4]
var widthBorderIntroShape = 20
var heightBorderIntroShape = 120
var posXBorderIntroShape = -200
var posYBorderIntroShape = 0
var widthBgIntroShape = 30
var heightBgIntroShape = 70
var widthRootBgIntroShape = 430
var heightBgSubIntroShape =  heightBorderIntroShape - heightBgIntroShape
var widthBgSubIntroShape =  30
var widthRootBgSubIntroShape = 400
var leading = 20

var createdProject = false
var createdIntro = false
var createdAnimation = false

var bgFile = new File("assets/bg.png")
var busFile = new File("assets/bus.png")
var cloudFile = new File("assets/cloud.png")
var schoolFile = new File("assets/school.png")

window.buttonPane.buttonsCommon.btnCreateProj.onClick = createProject
window.buttonPane.buttonsCommon.btnRender.onClick = function() {
  if (!createdProject)
    createProject()
  renderProject(mainComp)
}
window.buttonPane.buttonsCommon.btnHelp.onClick = function() {
  var helpText = " \
    Hướng dẫn: \n \
    - Để tạo mới Project: Click `Tạo Project` \
    - Để tạo intro text animation khung cảnh trường học: Nhập tên và Click `Tạo Intro Animation` \
    - Nhập tên comp cho animation comp. Tên mặc định sẽ là main \
    - Để tạo animation khung cảnh trường học: Click `Tạo Animation` \
    - Để lưu Project: Click `Lưu Project` \
    - Để render ra file sản phẩm (yêu cầu đã cài Adobe Media Encoder): Click `Render` \n \
    - Phan Văn Bình - B18DCPT031 - Extension tạo khung cảnh trường học - Bài tập lớn môn lập trình kỹ xảo \
  "
  alert(helpText, "Hướng dẫn sử dụng");
}

window.buttonPane.buttonsCommon.btnSaveProj.onClick = saveFileWithDialog

window.buttonPane.buttons.btnCreateIntro.onClick = createIntro

window.buttonPane.buttons.btnCreateAnimation.onClick = function() {
  if (!createdProject)
    createProject()
  if (!createdIntro)
    createIntro()
  if (createdAnimation)
    return
  mainComp.openInViewer()

  mainComp.layers.add(bgFootage)

  var cloudLayer1 = mainComp.layers.add(cloudFootage)
  cloudLayer1.scale.setValue([20, 20])
  cloudLayer1.position.setValueAtTime(0, [1420, 20])
  cloudLayer1.position.setValueAtTime(10, [-130, 20])
  cloudLayer1.position.setValueAtTime(20, [1420, 20])

  var cloudLayer2 = mainComp.layers.add(cloudFootage)
  cloudLayer2.scale.setValue([20, 20])
  cloudLayer2.position.setValueAtTime(2, [-130, 90])
  cloudLayer2.position.setValueAtTime(11, [1420, 90])
  cloudLayer2.position.setValueAtTime(20, [-130, 90])

  var cloudLayer3 = mainComp.layers.add(cloudFootage)
  cloudLayer3.scale.setValue([20, 20])
  cloudLayer3.position.setValueAtTime(4, [-130, 60])
  cloudLayer3.position.setValueAtTime(13, [1420, 60])
  cloudLayer3.position.setValueAtTime(20, [-130, 60])

  var schoolLayer = mainComp.layers.add(schoolFootage)
  schoolLayer.scale.setValue([20, 20])
  schoolLayer.position.setValue([789, 284])

  var busLayer = mainComp.layers.add(busFootage)
  busLayer.scale.setValue([20, 20])
  busLayer.position.setValueAtTime(keyframes[5], [-350, 450])
  busLayer.position.setValueAtTime(keyframes[5] + 7, [widthComp + 400, 450])
  busLayer.position.setValueAtTime(keyframes[5] + 8, [-350, 450])
  busLayer.position.setValueAtTime(keyframes[5] + 9, [-350, 450])
  busLayer.position.setValueAtTime(keyframes[5] + 16, [widthComp + 400, 450])
  busLayer.position.setInterpolationTypeAtKey(3, KeyframeInterpolationType.HOLD)

  var introLayer = mainComp.layers.add(introComp)
  introLayer.opacity.setValueAtTime(keyframes[4], 100)
  introLayer.opacity.setValueAtTime(keyframes[5] + 1, 0)

  createdAnimation = true
}
