var resourceUI = "dialog { properties:{ resizeable:true }, \
  text: 'Bài giữa kỳ (Phan Văn Bình - B18DCPT031)',\
  mainPanel: Panel { orientation:'column', alignChildren:['left', 'top'],\
    text: 'Options', \
    inputProfile: Group { \
      staticText: StaticText { text:'Enter your name, student id:' }, \
      editText: EditText { text:'Phan Văn Bình - B18DCPT031', characters:35 } \
    }, \
    inputComp: Group { \
      staticText: StaticText { text:'Enter properties for your composition' }, \
      editText: EditText { text:'Name of composition', characters:35 }, \
    }, \
    buttons: Group { \
      alignment: ['center', 'top'] \
      btnCreateProj: Button { text:'Create Project' }, \
      btnSaveProj: Button { text:'Save Project'}, \
      btnCreateComp: Button { text:'Create a new composition'}, \
    }, \
	}, \
}"

function createUI() {
  var window = new Window(resourceUI)
  window.center()
  window.show()
}

function saveFileWithDialog() {
  app.project.saveWithDialog()
}

function createProject() {
  app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
  app.newProject()
}

createUI()
