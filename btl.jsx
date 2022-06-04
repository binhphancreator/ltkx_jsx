var resourceUI = "window { properties:{ resizeable:false, maximizeButton: false }, \
  text: 'Bài cuối kỳ (Phan Văn Bình - B18DCPT031)',\
  inputPanel: Panel { orientation:'column', alignChildren:['left', 'top'],\
    text: 'Nhập thông tin', \
    inputProfile: Group { \
      staticText: StaticText { text:'Nhập tên, mã sinh viên:' }, \
      editText: EditText { text:'Phan Văn Bình - B18DCPT031', characters:40 } \
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
}

function createComps() {
  mainComp = createNewComp("main")
  introComp = createNewComp("intro")
}

function importFootage() {
  bgFootage = app.project.importFile(new ImportOptions(new File(resolvePath("assets/bg.png"))))
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


function createRectBgIntroGroup(layer, fill) {
  var group = layer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group")
  group.property("ADBE Vector Transform Group").opacity.setValue(80)

  group.property("ADBE Vector Transform Group").position.setValueAtTime(keyframes[1], [0, (heightBgIntroShape - heightBorderIntroShape) / 2])
  group.property("ADBE Vector Transform Group").position.setValueAtTime(keyframes[2], [posXBorderIntroShape + widthBorderIntroShape / 2, (heightBgIntroShape - heightBorderIntroShape) / 2])
  group.property("ADBE Vector Transform Group").scale.setValueAtTime(keyframes[1], [0, (heightBorderIntroShape * 2 / 3) / heightBgIntroShape * 100])
  group.property("ADBE Vector Transform Group").scale.setValueAtTime(keyframes[2], [widthRootBgIntroShape / widthBgIntroShape * 100, 100])

  group.property("ADBE Vector Transform Group").property("Anchor Point").setValue([-widthBgIntroShape / 2, 0])
  var maskRectIntroText = group.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect")
  maskRectIntroText.property("ADBE Vector Rect Size").setValue([widthBgIntroShape, heightBgIntroShape])
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
  introComp.openInViewer()
  var introShapeLayer = introComp.layers.addShape()
  createBorderShape(introShapeLayer)
  createRectBgIntroGroup(introShapeLayer, rgb(35, 113, 163))
  addIntroTextLayer()
  createdIntro = true
}

var window = createUI()
var introComp = null
var mainComp = null

var bgFootage = null

var widthComp = 1280
var heightComp = 720
var keyframes = [0, 0.75, 1.25]
var widthBorderIntroShape = 26
var heightBorderIntroShape = 120
var posXBorderIntroShape = -200
var posYBorderIntroShape = 0
var widthBgIntroShape = 30
var heightBgIntroShape = 60
var widthRootBgIntroShape = 430
var leading = 20

var createdIntro = false


window.buttonPane.buttonsCommon.btnCreateProj.onClick = createProject
window.buttonPane.buttonsCommon.btnRender.onClick = function() {
  renderProject(mainComp)
}
window.buttonPane.buttonsCommon.btnHelp.onClick = function() {
  alert("Hướng dẫn", "Hướng dẫn sử dụng");
}

window.buttonPane.buttons.btnCreateIntro.onClick = createIntro

window.buttonPane.buttons.btnCreateAnimation.onClick = function() {
  if (!createdIntro)
    createIntro()
  mainComp.openInViewer()
  mainComp.layers.add(bgFootage)
  mainComp.layers.add(introComp)
}
