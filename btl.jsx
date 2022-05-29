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

var window = createUI()

window.buttonPane.buttons.btnCreateProj.onClick = createProject
window.buttonPane.buttons.btnHelp.onClick = function() {
  alert("Hướng dẫn", "Hướng dẫn sử dụng");
}
