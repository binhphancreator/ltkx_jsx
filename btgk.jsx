var resourceUI = "window { properties:{ resizeable:false, maximizeButton: false }, \
  text: 'Bài giữa kỳ (Phan Văn Bình - B18DCPT031)',\
  mainPanel: Panel { orientation:'column', alignChildren:['left', 'top'],\
    text: 'Options', \
    inputProfile: Group { \
      staticText: StaticText { text:'Enter your name, student id:' }, \
      editText: EditText { text:'Phan Văn Bình - B18DCPT031', characters:40 } \
    }, \
    enterCompStaticText: StaticText { text:'Enter properties for your composition' }, \
    inputComp: Group { \
      nameStaticText: StaticText { text:'Name' }, \
      nameCompEditText: EditText {characters:10, }, \
      widthCompStaticText: StaticText { text:'Width' }, \
      widthCompEditText: EditText { characters:3, text:'1920' }, \
      heightCompStaticText: StaticText { text:'Height' }, \
      heightCompEditText: EditText { characters:3, text:'1080' }, \
      pixelAspectCompStaticText: StaticText { text:'Pixel Aspect' }, \
      pixelAspectCompEditText: EditText { characters:3, text:'1.3' }, \
      durationCompStaticText: StaticText { text:'Duration' }, \
      durationCompEditText: StaticText { text: '20' }, \
      frameRateCompStaticText: StaticText { text:'Frame Rate' }, \
      frameRateCompEditText: EditText { characters:3, text:'60' }, \
    }, \
    buttons: Group { \
      alignment: ['center', 'top'] \
      btnCreateProj: Button { text:'Create Project' }, \
      btnSaveProj: Button { text:'Save Project'}, \
      btnCreateComp: Button { text:'Create a new composition'}, \
      btnCreateIntro: Button { text:'Create an intro'}, \
      btnCreateLayerShape: Button { text:'Create layer shape'}, \
      btnCreateAnimation: Button { text:'Create shape animation'}, \
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

function createNewComp(name, width, height, pixelAspect, duration, frameRate, color) {
  var comp = app.project.items.addComp(name, width, height, pixelAspect, duration, frameRate)
  if (!color)
    color = [0, 0, 0]
  comp.bgColor = color
  return comp
}

var window = createUI()
var latestComp = null
var latestShapelayer = null

window.mainPanel.buttons.btnCreateProj.onClick = createProject
window.mainPanel.buttons.btnSaveProj.onClick = saveFileWithDialog
window.mainPanel.buttons.btnCreateComp.onClick = function() {
  var name = window.mainPanel.inputComp.nameCompEditText.text
  var width = parseInt(window.mainPanel.inputComp.widthCompEditText.text)
  var height = parseInt(window.mainPanel.inputComp.heightCompEditText.text)
  var pixelAspect = parseFloat(window.mainPanel.inputComp.pixelAspectCompEditText.text)
  var duration = 20
  var frameRate = parseInt(window.mainPanel.inputComp.frameRateCompEditText.text)
  var color = [28/255, 40/255, 51/255]
  latestComp = createNewComp(name, width, height, pixelAspect, duration, frameRate, color)
  latestComp.openInViewer()
}
window.mainPanel.buttons.btnCreateIntro.onClick = function() {
  var text = window.mainPanel.inputProfile.editText.text
  if (!latestComp)
    alert('Bạn cần tạo composition trước khi thực hiện các bước tiếp theo!', 'Error')
  var introTextLayer = latestComp.layers.addText(text)
  introTextLayer.opacity.setValueAtTime(0, 0)
  introTextLayer.opacity.setValueAtTime(2, 100)
  introTextLayer.opacity.setValueAtTime(10, 0)
  introTextLayer.opacity.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD)
  introTextLayer.property("Source Text").fontSize  = 72
  introTextLayer.property("Source Text").justification = ParagraphJustification.CENTER_JUSTIFY;
}
window.mainPanel.buttons.btnCreateLayerShape.onClick = function() {
  if (!latestComp)
    alert('Bạn cần tạo composition trước khi thực hiện các bước tiếp theo!', 'Error')
  latestShapelayer = latestComp.layers.addShape()
  latestShapelayer.name = "main layer shape"
}

window.mainPanel.buttons.btnCreateAnimation.onClick = function() {
  if (!latestShapelayer)
    alert('Bạn cần tạo layer shape trước khi thực hiện tạo animation!', 'Error')
  var circle = latestShapelayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Shape - Ellipse")
  circle.property("ADBE Vector Ellipse Size").setValue([100, 100])
  circle.property("ADBE Vector Ellipse Position").setValueAtTime(0, [-600, 100])
  circle.property("ADBE Vector Ellipse Position").setValueAtTime(20, [600, 100])
  latestShapelayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue([236/255, 240/255, 241/255])
  var shapeStroke = latestShapelayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Stroke")
  shapeStroke.property("ADBE Vector Stroke Color").setValue([1, 1, 1])
  shapeStroke.property("ADBE Vector Stroke Width").setValue(5)
}
