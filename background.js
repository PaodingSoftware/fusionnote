paoding.addEventListener({
    "is_user_scope": false,
    "is_once_callback": false,
    "event_id": "Startup",
    "handler": function () {
        paoding.newWebWindow({
            "url": chrome.runtime.getURL("index.html"),
            "title": "联合书签",
            "width": 500,
            "height": 600,
            "show_title": true,
            "center_in_window": true,
            "can_resize": true,
            "can_minimize": true,
            "can_maximize": true,
            "dockable_window": true,
            "reusable_window": true
        });

        // Enable Python
        paoding.launchPythonInterpreter({});
    }
});

function parseFileIdentifier(url) {
    if (url == "about:blank" || !url) {
        return "about:blank";
    }
    let path = new URL(url).pathname;
    return path.substring(path.lastIndexOf('/') + 1);
}

paoding.addEventListener({
    "is_user_scope": true,
    "is_once_callback": false,
    "event_id": "PDF_VIEWER_MOST_VISIBLE_PAGE_CHANGED",
    "handler": function (e) {
        if (chrome.storage) {
            chrome.storage.local.set({
                "location": {
                    "id": parseFileIdentifier(e.originalUrl) + ":" + e.pageIndex,
                    "originalUrl": e.originalUrl,
                    "pageIndex": e.pageIndex
                }
            });
        }
    }
});

paoding.addEventListener({
    "is_user_scope": true,
    "is_once_callback": false,
    "event_id": "PDF_VIEWER_TEXT_SELECTION_CHANGED",
    "handler": function (selectedText) {
        paoding.dispatchEvent({
            "event_id": "TranslateTextChanged",
            "event_args": [
                selectedText
            ]
        })
    }
});

// Only allow sending messages from within a ServiceWorker.
paoding.addEventListener({
    "is_user_scope": true,
    "is_once_callback": false,
    "event_id": "SendToPythonInterpreter",
    "handler": function (data) {
        paoding.sendToPythonInterpreter(data);
    }
});
