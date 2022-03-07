var project = app.project;
var filetypes = ['png', 'jpg', 'jpeg'];
while(true) {
  var files = File.openDialog('Choose two images', 'Png:*.png;Jpg:*.jpg;Jpeg:*.jpeg', true);
  if (!files || (files && files.length < 2)) {
    alert('Please select two or more image files', 'Error');
    continue;
  }
  break;
}

for (var i=0; i< files.length; i++ ) {
  project.importFile(new ImportOptions(files[i]));
}

project.saveWithDialog();
