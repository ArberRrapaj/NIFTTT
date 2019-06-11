class UIUtils{

  // hide content and show spinner
  static showSpinner(content, spinner){
    content.className="slide_out"
    spinner.className="slide_in lds-ellipsis"
  }

  // hide spinner and show content
  static hideSpinner(content, spinner){
    spinner.className="slide_out"
    content.className="slide_in hor_center no_scroll"
  }

  // hide element
  static hideOnly(element){
    element.className="slide_out"
  }

  // show element
  static showOnly(element){
    element.className="slide_in hor_center no_scroll"
  }
}

module.exports = UIUtils
