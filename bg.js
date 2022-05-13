const installUrl = "https://web.zmb.ee/#welcome";
const uninstallUrl = "https://web.zmb.ee/#uninstall";


class ExtBackground {

  initialize() {
    chrome.runtime.onInstalled.addListener(
      (details) => this.onInstalled(details));

    if (uninstallUrl) {
      chrome.runtime.setUninstallURL(uninstallUrl);
    }
  }



  onInstalled(details) {
    if (details.reason == "install") {
      chrome.tabs.create({
        url: `${installUrl}`,
      });
    }
  }
}



new ExtBackground()
  .initialize();

//

